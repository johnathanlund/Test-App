import { Component, ElementRef, ViewChild, Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

@Injectable()
export class AppComponent {
  title = 'app works!';

  @ViewChild('upload-btn') uploadbtn;
  @ViewChild('inputFile') inputFile:ElementRef;
  @ViewChild('progressBar') progressbar;

  constructor(private http: Http, private e1: ElementRef){}

  /* When button is clicked open input */
upload(){
  console.log("clicked");
  this.inputFile.nativeElement.click();
} // end of upload

/* Process input form */
sendToServer(){
    // Get form input
    let inputFile: HTMLInputElement = this.inputFile.nativeElement;

    let fileCount: number = inputFile.files.length;

    let formData = new FormData();

    console.log("File Count: " + fileCount);

    if( fileCount > 0 ){
      for(let i = 0; i < fileCount; i++){
        console.log("Count: " + i);
        formData.append('uploads[]', inputFile.files.item(i), inputFile.files.item(i).name);
      }
      console.log("Form Data: " + formData);

      // this.http.post('http:/localhost:3000/upload', formData);
      // console.log("file uploaded");

      this.http.post('http://localhost:3000/upload', formData).subscribe( data => { console.log("File Uploaded Successfully!"); }, err => {
        console.log(err);
      });

    }

} // end of send to server

}
