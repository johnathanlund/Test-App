import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FileSelectDirective } from 'ng2-file-upload';

import { AppComponent } from './app.component';
import { ImagePreview } from './directives/image-preview.directive';

@NgModule({
  declarations: [
    AppComponent,
    FileSelectDirective,
    ImagePreview
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
