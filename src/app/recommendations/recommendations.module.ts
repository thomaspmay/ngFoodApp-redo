import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { RecommendationsRoutingModule } from "./recommendations-routing.module";
import { RecommendationsComponent } from "./recommendations.component";

import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";
import { NativeScriptFormsModule } from "@nativescript/angular";

import { DetailsComponent } from "./details/details.component";
import { ActionButtonModule } from "./action-button/action-button.module";

@NgModule({
    imports: [
        NativeScriptUISideDrawerModule,
        NativeScriptCommonModule,
        RecommendationsRoutingModule,
        NativeScriptFormsModule,
        ActionButtonModule
    ],
    declarations: [
        RecommendationsComponent,
        DetailsComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class RecommendationsModule { }
