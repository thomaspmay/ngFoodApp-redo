/// <reference path="../../../node_modules/tns-platform-declarations/ios.d.ts" />
/// <reference path="../../../node_modules/tns-platform-declarations/android.d.ts" />

import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { PlatformLocation } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Recipe } from "../shared/recipe";
import { RouterExtensions } from "nativescript-angular/router";
import { View } from "tns-core-modules/ui/core/view";
import { Page } from "tns-core-modules/ui/page";
import { AnimationCurve } from "tns-core-modules/ui/enums";
import { topmost } from "tns-core-modules/ui/frame";
import { Color } from "tns-core-modules/color";
import { android, ios } from "tns-core-modules/application";
import { device } from "tns-core-modules/platform";
import { AnimationsService } from "../shared/animations-service"; 
import { RecipesService } from "../shared/recipes-service";
import { ActionButtonComponent } from "./action-button/action-button.component";



@Component({
    selector: "Recommendations",
    templateUrl: "./recommendations.component.html"
})
export class RecommendationsComponent implements OnInit {
    private _recipes: Recipe[];
    private _selectedView: View;
    private _adjustedOffset: number = 0;

    @ViewChild("actionButton",{ static: false}) _buttonRef: ActionButtonComponent;
    @ViewChild("search",{ static: false}) _searchRef: ElementRef;
    @ViewChild("list",{ static: false}) _listRef: ElementRef;
    @ViewChild("animatingImage",{ static: false}) _imageRef: ElementRef;
    @ViewChild("animatingImageContainer",{ static: false}) _imageContainerRef: ElementRef;

    constructor(private animationsService: AnimationsService,
        private recipesService: RecipesService,
        private routerExtensions: RouterExtensions,
        private page: Page,
        private location: PlatformLocation) {

        this.page['scrollableContent'] = true;
        this._recipes = this.recipesService.getRecipes();

        if (android) {
            this._updateStatusBarColor("#2B3238");
        }
    }

    ngOnInit(): void {
        this.location.onPopState(() => {
            this._onNavigatedTo();
        });

        if (ios) {
            topmost().ios.controller.navigationBar.barStyle = 1;
        }
    }

    get recipes() {
        return this._recipes;
    }

    public onNavigationItemTap(args: any) {
        this.recipesService.setSelectedId(args.index);
        this._selectedView = args.view;
        this.animationsService.animationOffset = this.measureOffset(args.view, args.object);
        this.routerExtensions.navigate(['/details'], { animated: false });
        setTimeout(() => {
            this._prepareForBackNavigation();
        });
    }

    private measureOffset(view1: View, view2: View) {
        let offset = view1.getLocationRelativeTo(view2).y;
        if (view2.ios && view2.ios.adjustedContentInset) {
            this._adjustedOffset = view2.ios.adjustedContentInset.top;
        }
        return offset - this._adjustedOffset;
    }

    private _prepareForBackNavigation() {
        this._listRef.nativeElement.opacity = 0;
        this._selectedView.opacity = 0;

        this._imageRef.nativeElement.src = this.recipesService.getSelected().image;
        this._imageContainerRef.nativeElement.translateY = this._adjustedOffset;
        this._imageContainerRef.nativeElement.opacity = 1;

        this._buttonRef.makeArrow();
        this._searchRef.nativeElement.opacity = 0;
    }

    private _onNavigatedTo() {
        let offset = this.animationsService.animationOffset + this._adjustedOffset;
        this._imageContainerRef.nativeElement.animate({
            translate: { x: 0, y: offset },
            duration: 200,
            curve: AnimationCurve.easeOut
        }).then(() => {
            this._selectedView.opacity = 1;
            this._imageContainerRef.nativeElement.animate({
                opacity: 0,
                duration: 400,
                curve: AnimationCurve.easeOut
            }).then(() => {
                this._imageContainerRef.nativeElement.translateY = 0;
                })
            }).catch(() => { });

        this._listRef.nativeElement.animate({
            opacity: 1,
            duration: 200
        }).catch(() => { });
        this._searchRef.nativeElement.animate({
            opacity: 1,
            duration: 200
        }).catch(() => { });
    }

    private _updateStatusBarColor(color: string) {
        if (device.sdkVersion >= "21" && android.foregroundActivity) {
            var nativeColor = new Color(color).android;
            var window = android.foregroundActivity.getWindow();
            window.setStatusBarColor(nativeColor);
        }
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
