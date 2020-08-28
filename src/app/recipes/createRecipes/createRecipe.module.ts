import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "@nativescript/angular";
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";
import { NativeScriptFormsModule } from "@nativescript/angular/forms";

import { CreateRecipeRoutingModule } from "./createRecipe-Routing.module";
import { CreateRecipeComponent } from "./createRecipe.component";
import { FloatLabel } from "./float-label/float-label.component"

@NgModule({
    imports: [
        NativeScriptUISideDrawerModule,
        NativeScriptCommonModule,
        CreateRecipeRoutingModule,
        NativeScriptFormsModule
    ],
    declarations: [
        CreateRecipeComponent,
        FloatLabel
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class CreateRecipeModule { }
