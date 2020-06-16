import { NgModule } from '@angular/core';

import { ConfigurationComponent } from './configuration/configuration.component';
import { ViewComponent } from './view/view.component';
import { UploadComponent } from './upload.component';
import { UploadRoutingModule } from './upload.routing';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    ConfigurationComponent,
    UploadComponent,
    ViewComponent
    // UserDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    // SharedModule,
    UploadRoutingModule
  ],
  exports: [],
  providers: [],
  entryComponents: []
})
export class UploadModule { }
