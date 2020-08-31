import { Component, ElementRef, Input, ViewChild } from "@angular/core";
import { Color } from "@nativescript/core";
import { ListPicker } from "tns-core-modules/ui/list-picker/list-picker";

@Component({
    selector: "AddIngredient",
    moduleId: module.id,
    template: `
    <StackLayout class="ingredient">
        <StackLayout orientation="horizontal" marginBottom="5" height="200px">
            <TextField keyboardType="number" width="12%"></TextField>
            <ListPicker [items]="unitTypes" selectedIndex="0" (selectedIndexChange)="onTypeChanged($event)"></ListPicker>
            <ListPicker [items]="units" selectedIndex="0" (selectedIndexChange)="onUnitChanged($event)"></ListPicker> 
            <TextField placeholder="Name" width="40%"></TextField> 			
        </StackLayout> 
        <StackLayout orientation="horizontal" marginBottom="5" height="100px">
            <label text="Importance:" width="20%"></label>
            <label text="1" width="5%"></label>
            <Slider value="5" minValue="1" maxValue="10" (valueChange)="onSliderValueChange($event)" width="40%"></Slider>
            <label text="10" width="5%"></label>
            <Button tap="addNewIngredient($event)" text="Delete" width="20%" height="100px" position="right"></Button>
        </StackLayout>
    </StackLayout>
    `
})
export class AddIngredient {
    @Input() placeholder: string;
    @Input() secure: boolean;
    @ViewChild("label",{static: false}) label: ElementRef;
    @ViewChild("textField",{static: false}) textField: ElementRef;

    public unitTypes = ['weight','volume']
    public possibleUnitLists = {
        "weight": ["g","Kg","ounces","pounds"],
        "volume": ["cup","l","ml","cm3","mm3","m3"]
    }
    public ingredients = [""]
    public instructions = [""]
    public units = this.possibleUnitLists["weight"];

    constructor() {
    }

    ngOnInit(): void {
    }

    
}
