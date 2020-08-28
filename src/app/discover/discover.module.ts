import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "@nativescript/angular";

import { DiscoverRoutingModule } from "./discover-routing.module";
import { DiscoverComponent } from "./discover.component";
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        DiscoverRoutingModule,
        NativeScriptUISideDrawerModule
    ],
    declarations: [ 
        DiscoverComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class DiscoverModule { }
