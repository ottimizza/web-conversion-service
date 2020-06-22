import { NgModule } from '@angular/core';

import { ConfigurationComponent } from './configuration/configuration.component';
import { ViewComponent } from './view/view.component';
import { UploadComponent } from './upload.component';
import { UploadRoutingModule } from './upload.routing';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FilesTableComponent } from './components/files-table/files-table.component';
import { MatTabsModule, MatButtonModule } from '@angular/material';
import { BreadcrumbModule } from '@shared/components/breadcrumb/breadcrumb.module';

@NgModule({
  declarations: [
    ConfigurationComponent,
    UploadComponent,
    ViewComponent,
    // UserDetailsComponent
    FilesTableComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    // SharedModule,
    UploadRoutingModule,
    MatTabsModule,
    BreadcrumbModule,
    MatButtonModule
  ],
  exports: [],
  providers: [],
  entryComponents: []
})
export class UploadModule { }
