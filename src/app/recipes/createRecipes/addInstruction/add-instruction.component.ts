import { Component, ElementRef, Input, ViewChild } from "@angular/core";
import { Color } from "@nativescript/core";

@Component({
    selector: "AddInstruction",
    moduleId: module.id,
    template: `
    <StackLayout orientation="horizontal">
		<StackLayout width="75%">
			<FloatLabel position="left" placeholder="Instruction Line {{instructions.length}}"></FloatLabel>
		</StackLayout>
		<Button tap="removeThisInstruction($event)" text="Remove" width="20%" position="right"></Button>
	</StackLayout>
    `
})
export class AddInstruction {
    @Input() placeholder: string;
    @Input() secure: boolean;
    @ViewChild("label",{static: false}) label: ElementRef;
    @ViewChild("textField",{static: false}) textField: ElementRef;

    constructor() {
    }

    ngOnInit(): void {
    }

    
}
