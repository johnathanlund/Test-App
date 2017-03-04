//import component and the oninit method from angular core
import { Component, OnInit } from '@angular/core';
//import the file uploader plugin
import {  FileUploader } from 'ng2-file-upload/ng2-file-upload';
//define the constant url we would be uploading to.
const URL = 'http://localhost:8000/';
//create the component properties
@Component({
    //define the element to be selected from the html structure.
    selector: 'app-root',
    //location of our template rather than writing in-line templates.
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  //declare a property called fileuploader and assign it to an instance of a new fileUploader.
 //pass in the Url to be uploaded to, and pass the itemAlais, which would be the name of the //file input when sending the post request.
 public uploader:FileUploader = new FileUploader({url: URL, itemAlias: 'photo'});
 //This is the default title property created by the angular cli. Its responsible for the app works
 title = 'app works!';

 ngOnInit() {
 //override the onAfterAddingfile property of the uploader so it doesn't authenticate with //credentials.
   this.uploader.onAfterAddingFile = (file)=> { file.withCredentials = false;
     console.log('In .onAfterAddingFile, jsonof file is:  ' + file.file.name);
     console.log('Json of file.file is: ' + JSON.stringify(file.file))
   };
 //overide the onCompleteItem property of the uploader so we are
 //able to deal with the server response.
   this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
         console.log("ImageUpload:uploaded:", item, " Thats the item. ", status, " Thats the status. ", response, " THats the response.", item.file.name );
     };
 }
}
