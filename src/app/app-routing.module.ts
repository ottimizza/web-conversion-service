import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { UploadComponent } from './modules/upload/upload.component';


const routes: Routes = [
  {
    path: '', component: AppComponent
  },
  {
    path: 'upload', component: UploadComponent, pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
