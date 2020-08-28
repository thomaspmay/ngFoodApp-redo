import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "@nativescript/angular";

import { RecipesRoutingModule } from "./recipes-routing.module";
import { RecipesComponent } from "./recipes.component";
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        RecipesRoutingModule,
        NativeScriptUISideDrawerModule
    ],
    declarations: [
        RecipesComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class RecipesModule { }
