import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";

import { RecipesComponent } from "./recipes.component";
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";

const routes: Routes = [
    { path: "", component: RecipesComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes),
        NativeScriptUISideDrawerModule],
    exports: [NativeScriptRouterModule]
})
export class RecipesRoutingModule { }
