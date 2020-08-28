import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Application} from "@nativescript/core";
import { RouterExtensions } from "nativescript-angular/router";

@Component({
    selector: "Recipes",
    templateUrl: "./recipes.component.html"
})
export class RecipesComponent implements OnInit {

    constructor(private routerExtensions: RouterExtensions) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer><unknown>Application.getRootView();
        sideDrawer.showDrawer();
    }

    switchCreateRecipe(){
        console.log("switchCreateRecipe called");
        this.routerExtensions.navigate(['/createRecipe'],{ animated: false });
    }
}
