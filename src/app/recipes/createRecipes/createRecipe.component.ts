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

    public recipeIngredientLength = 1;
    public unitTypes = ['weight','volume']
    public possibleUnitLists = {
        "weight": ["g","Kg","ounces","pounds"],
        "volume": ["cup","l","ml","cm3","mm3","m3"]
    }
    public units = this.possibleUnitLists["weight"];

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
    }

    onSelectedIndexChanged(){
        
    }

    public onSelectImageTap() {
        let context = imagepicker.create({
            mode: "single"
        });
        this.startSelection(context);
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
