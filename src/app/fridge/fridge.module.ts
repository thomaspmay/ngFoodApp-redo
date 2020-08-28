import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';

import { FridgeRoutingModule } from "./fridge-routing.module";
import { FridgeComponent } from "./fridge.component";
import { NativeScriptUISideDrawerModule } from 'nativescript-ui-sidedrawer/angular';

@NgModule({
  imports: [
    NativeScriptCommonModule,
    FridgeRoutingModule,
    NativeScriptUISideDrawerModule
],
declarations: [
    FridgeComponent
],
schemas: [
    NO_ERRORS_SCHEMA
]
})
export class FridgeModule { }
