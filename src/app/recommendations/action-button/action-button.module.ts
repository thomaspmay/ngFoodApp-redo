import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { ActionButtonComponent } from "./action-button.component";

@NgModule({
	imports: [
		NativeScriptUISideDrawerModule,
		NativeScriptCommonModule,
		NativeScriptFormsModule
	],
	declarations: [ 
		ActionButtonComponent
	],
	exports: [
		ActionButtonComponent
	],
	schemas: [
		NO_ERRORS_SCHEMA
	]
})
export class ActionButtonModule { }