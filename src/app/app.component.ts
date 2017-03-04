import { Component, NgZone } from '@angular/core';
import { WebService } from './services/WebService.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
public fileEvent=null;
private fileName;
public validTypes = ["application/vnd.openxmlformats-officedocument.wordprocessingml.document","application/msword","application/pdf"];
private errorFileType:boolean = false;
private fileUploadedSuccessFully:boolean = false;
private uploading:boolean = false;
public uploadingMessage = "Gönder";

constructor(public webService:WebService,public zone:NgZone){

}
uploadFile(event){
  if(this.validTypes.indexOf(event.target.files[0].type)!=-1){
      this.fileEvent = event;
      this.fileName = event.target.files[0].name;
      this.errorFileType = false;
  }
  else {
      this.errorFileType = true;
  }
}
  upload(){
  this.uploading = true;
  this.uploadingMessage = "Successful on Upload in app.component.";

  this.webService.makeFileRequest(this.fileEvent.target.files).subscribe((data)=>this.zone.run(()=>{
      this.fileUploadedSuccessFully = true;
      this.uploadingMessage = "Successful on sending Upload to WebService.";
  }));
}
}
