import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";

import { CreateRecipeComponent } from "./createRecipe.component";
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";

const routes: Routes = [
    { path: "", component: CreateRecipeComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes),
        NativeScriptUISideDrawerModule],
    exports: [NativeScriptRouterModule]
})
export class CreateRecipeRoutingModule { }