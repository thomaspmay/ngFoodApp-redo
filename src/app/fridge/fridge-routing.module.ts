import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";

import { FridgeComponent } from "./fridge.component";
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";

const routes: Routes = [
    { path: "", component: FridgeComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes),
        NativeScriptUISideDrawerModule],
    exports: [NativeScriptRouterModule]
})
export class FridgeRoutingModule { }
