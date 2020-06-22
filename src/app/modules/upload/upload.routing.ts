import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UploadComponent } from './upload.component';

// import { ProjectResolver } from './project-resolver.service';
// import { HomeComponent } from './page/home.component';
// import { ProjectDetailsComponent } from './page/project-details/project-details.component';

export const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'users',
  //   pathMatch: 'full'
  // },
  {
    path: '',
    component: UploadComponent
  }
//   {
//     path: 'logout',
//     component: AuthLogoutComponent
//   },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UploadRoutingModule { }
