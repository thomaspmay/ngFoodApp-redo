import { Component, ElementRef, Input, ViewChild } from "@angular/core";
import { Color } from "@nativescript/core";

@Component({
    selector: "FloatLabel",
    moduleId: module.id,
    template: `
        <GridLayout rows="50, auto" marginBottom="5">
        <ListPicker [items]="" selectedIndex="0" (selectedIndexChange)="onSelectedIndexChanged($event)"></ListPicker>
        <ListPicker [items]="" selectedIndex="0" (selectedIndexChange)="onSelectedIndexChanged($event)"></ListPicker>
            <FloatLabel placeholder="Name"></FloatLabel>
            <Button text="Delete"></Button>
            <Slider value="5" minValue="1" maxValue="10" (valueChange)="onSliderValueChange($event)"></Slider>
        </GridLayout>
    `
})
export class FloatLabel {
    @Input() placeholder: string;
    @Input() secure: boolean;
    @ViewChild("label",{static: false}) label: ElementRef;
    @ViewChild("textField",{static: false}) textField: ElementRef;

    constructor() {
    }

    ngOnInit(): void {
    }

    
}
