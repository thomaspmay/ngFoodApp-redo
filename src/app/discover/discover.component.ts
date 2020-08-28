import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Application} from "@nativescript/core";

@Component({
    selector: "Discover",
    templateUrl: "./discover.component.html"
})
export class DiscoverComponent implements OnInit {

    constructor() {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer><unknown>Application.getRootView();
        sideDrawer.showDrawer();
    }
}
