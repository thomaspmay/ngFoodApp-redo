/* <reference path="../../../../node_modules/tns-platform-declarations/ios.d.ts" />
 <reference path="../../../../node_modules/tns-platform-declarations/android.d.ts" /> 

/// <reference path="./node_modules/@nativescript/types/ios.d.ts" />
/// <reference path="./node_modules/@nativescript/types/android.d.ts" />*/

import { Component, OnInit } from "@angular/core";
import * as fs from "@nativescript/core/file-system";
import * as imagepicker from "nativescript-imagepicker";
import { knownFolders, path } from "@nativescript/core/file-system";
import { ImageAsset } from "@nativescript/core/image-asset";
import * as bgHttp from "nativescript-background-http";
import { isIOS } from "@nativescript/core/platform";
import { of, timer, interval, BehaviorSubject, Observable } from 'rxjs';
import { sampleTime, concatMap, scan, map } from 'rxjs/operators';
import { ImageSource } from '@nativescript/core/image-source'

import { confirm } from "tns-core-modules/ui/dialogs";


import { EventData, fromObject } from "tns-core-modules/data/observable";
import { Page } from "tns-core-modules/ui/page";
import { ListPicker } from "tns-core-modules/ui/list-picker/list-picker";

import { View } from "tns-core-modules/ui/core/view";

import { NativeScriptFormsModule } from "nativescript-angular/forms";



// import { NSData } from '../../../node_modules/tns-platform-declarations/ios.d'
// declare type NSData = {};


/* may be able to remove block allow but gives compile errors */

declare var UIImage:any;
declare var PHImageManager:any;
declare var PHImageRequestOptions:any;
declare var PHImageRequestOptionsDeliveryMode: any;
declare var PHImageRequestOptionsVersion: any;
declare var targetSize:any;
declare var CGSize:any;
declare var PHImageManager:any;
declare var contentMode:any;
declare var PHImageContentModeAspectFill:any;
declare var PHImageRequestOptionsResizeMode, PHImageRequestOptionsDeliveryModeHighQualityFormat;
declare var Environment:any;

@Component({
    selector: "createRecipe",
    moduleId: module.id,
    templateUrl: "./createRecipe.component.html",
    styleUrls: ['./createRecipe.component.css']
})
export class CreateRecipeComponent {
    private event = new BehaviorSubject<any>({});
    private url: string;
    private session: any;
    public recipe: any;

    public recipeIngredientLength = 1;
    public unitTypes = ['weight','volume','misc']
    public possibleUnitLists = [
         ["gram","kilogram","ounce","pound"],
         ["cup","teaspoon","tablespoon","pint","liter","milliliter","cm3","mm3","m3","can"],
         ["","unkown","clove","large","medium","small","stick","package","bag", "pinch","slice","quart","piece","box"]
    ]
    public verifiedUnits = ["cup","teaspoon",null,"tablespoon","pound","ounce","clove","large","medium","stick","package",
    "can","kilogram","pinch","slice","small","bag","quart","piece","pint","gram","milliliter","box","gallon","liter"]

   
    public showWelcome = true;
    public currentFileNameBeingUploaded = "";
    public eventLog = this.event.pipe(
        sampleTime(200),
        concatMap(value => of(value)),
        scan((acc, logEntry) => {
            acc.push(logEntry);
            return acc;
        }, []),
        // emit only logs for the this.currentFileNameBeingUploaded
        map(allLogs => allLogs.filter(logEntry => !!logEntry && logEntry.eventTitle && logEntry.eventTitle.indexOf(this.currentFileNameBeingUploaded) > 0)));

    constructor() {
        this.url = "http:www.tmay.dev/55559"
        this.session = bgHttp.session("image-upload");
        this.recipe =  {"id":4,"title":"Delicious Grilled Hamburgers",
        "description":"Delicious Grilled Hamburgers recipes: information powered by Yummly",
        "unproIngredients":["1 pound lean ground beef","1 tablespoon Worcestershire sauce",
        "1 tablespoon liquid smoke flavoring","1 teaspoon garlic powder","1 tablespoon olive oil",
        "seasoned salt to taste"],"ingredients":
        [{"quantity":"1","unit":"pound","ingredient":"lean ground beef","minQty":"1","maxQty":"1","ingredientId":1,"unitTypeId":0,"unitId":3,"importance":5},
        {"quantity":"1","unit":"tablespoon","ingredient":"Worcestershire sauce","minQty":"1","maxQty":"1","ingredientId":2,"unitTypeId":1,"unitId":2,"importance":5},
        {"quantity":"1","unit":"tablespoon","ingredient":"liquid smoke flavoring","minQty":"1","maxQty":"1","ingredientId":3,"unitTypeId":1,"unitId":2,"importance":5},
        {"quantity":"1","unit":"teaspoon","ingredient":"garlic powder","minQty":"1","maxQty":"1","ingredientId":4,"unitTypeId":1,"unitId":1,"importance":2},
        {"quantity":"1","unit":"tablespoon","ingredient":"olive oil","minQty":"1","maxQty":"1","ingredientId":5,"unitTypeId":1,"unitId":2,"importance":5},
        {"quantity":null,"unit":null,"ingredient":"seasoned salt to taste","minQty":null,"maxQty":null,"ingredientId":6,"unitTypeId":2,"unitId":0,"importance":5}],"instructions":null,"tags":{"cuisine":["Barbecue"],"course":["Main Dishes"]},"image":"img00005.jpg"}
    }

    onTypeChanged(event){
        let selectedIndex = event.object.selectedIndex
        console.log("TypeChange:"+ selectedIndex);
        let parent = event.object;
        if(parent){
            // let unitPicker = <ListPicker>getViewByID(parent,"")
        }
        
    }

    // onSliderValueChange(event){
    //     let value = event.object.value;
    //     for (let i = 0; index < array.length; index++) {
            
            
    //     }
    // }

    onUnitChanged(event){
        console.log("UnitChange:"+event.object.selectedIndex);
    }


    public onSelectImageTap() {                                                                  
        let context = imagepicker.create({
            mode: "single"
        });
        this.startSelection(context);
    }

    public addNewIngredient(){
        console.log("adding new ingredient");
        this.recipe.ingredients.push("");
        console.log(this.recipe.ingredients)
    }

    public removeThisInrgedient(event){
        var id: number = event.object.bindingContext.id - 1;
        let options = {
            title: 'Confirm Delete',
            message: 'Are you sure you want to delete this item?',
            okButtonText: 'Yes',
            cancelButtonText: 'Cancel'
        }    
        confirm(options).then(result => {
            if (result) {
                this.recipe.ingredients.splice(id,1);
            }
        });  
    }
    

    private startSelection(context) {
        context
            .authorize()
            .then(() => {
                return context.present();
            })
            .then((selection) => {
                this.showWelcome = false;
                // this.resetEventLog();

                console.log("Selection done: " + JSON.stringify(selection));
                let imageAsset = selection.length > 0 ? selection[0] : null;

                if (imageAsset) {
                    this.getImageFilePath(imageAsset).then((path) => {
                        console.log(`path: ${path}`);
                        this.uploadImage(path);
                    });
                }
            }).catch(function (e) {
                console.log(e);
            });
    }

    private uploadImage(path: string) {
        let file = fs.File.fromPath(path);
        this.currentFileNameBeingUploaded = file.path.substr(file.path.lastIndexOf("/") + 1);

        const request = this.createNewRequest();
        request.description = `uploading image ${file.path}`;
        request.headers["File-Name"] = this.currentFileNameBeingUploaded;

        // -----> multipart upload
        // const params = [
        //     {
        //         name: "test",
        //         value: "value"
        //     },
        //     {
        //         name: "fileToUpload",
        //         filename: file.path,
        //         mimeType: 'image/jpeg'
        //     }
        // ];

        // let task = this.session.multipartUpload(params, request);
        // <----- multipart upload

        let task = this.session.uploadFile(file.path, request);

        task.on("progress", this.onEvent.bind(this));
        task.on("error", this.onEvent.bind(this));
        task.on("responded", this.onEvent.bind(this));
        task.on("complete", this.onEvent.bind(this));
    }

    private createNewRequest() {
        const request = {
            url: this.url,
            method: "POST",
            headers: {
                "Content-Type": "application/octet-stream"
            },
            description: "uploading file...",
            androidAutoDeleteAfterUpload: false,
            androidNotificationTitle: "NativeScript HTTP background"
        };

        return request;
    }

    private getImageFilePath(imageAsset): Promise<string> {
        return new Promise((resolve) => {
            if (isIOS) { // create file from image asset and return its path

                const tempFolderPath = knownFolders.temp().getFolder("nsimagepicker").path;
                const tempFilePath = path.join(tempFolderPath, `${Date.now()}.jpg`);

                // ----> ImageSource.saveToFile() implementation
                // const imageSource = new ImageSource();
                // imageSource.fromAsset(imageAsset).then(source => {
                //     const saved = source.saveToFile(tempFilePath, 'png');
                //     console.log(`saved: ${saved}`);
                //     resolve(tempFilePath);
                // });
                // <---- ImageSource.saveToFile() implementation

                // ----> Native API implementation
                const options = PHImageRequestOptions.new();

                options.synchronous = true;
                options.version = PHImageRequestOptionsVersion.Current;
                options.deliveryMode = PHImageRequestOptionsDeliveryMode.HighQualityFormat;

                PHImageManager.defaultManager().requestImageDataForAssetOptionsResultHandler(imageAsset.ios, options, (nsData: NSData) => {
                    nsData.writeToFileAtomically(tempFilePath, true);
                    resolve(tempFilePath);
                });
                // <---- Native API implementation
            } else { // return imageAsset.android, since it's the path of the file
                resolve(imageAsset.android);
            }
        });
    }

    private onEvent(e) {
        this.event.next({
            eventTitle: e.eventName + " " + e.object.description,
            eventData: {
                error: e.error ? e.error.toString() : e.error,
                currentBytes: e.currentBytes,
                totalBytes: e.totalBytes,
                body: e.data,
                // raw: JSON.stringify(e) // uncomment for debugging purposes
            }
        });
    }
}
