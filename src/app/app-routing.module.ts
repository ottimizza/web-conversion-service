import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { UploadComponent } from './modules/upload/upload.component';
// import { ViewComponent } from './modules/view/view.component';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';


const REDIRECT_ROOT = { path: '', redirectTo: '/dashboard', pathMatch: 'full' }




const routes: Routes = [
  REDIRECT_ROOT,
  {
    path: 'dashboard',
    data: {
      breadcrumb: 'Dashboard'
    },
    component: ContentLayoutComponent,
    // canActivate: [NoAuthGuard], // Should be replaced with actual auth guard
    children: [
      {
        path: '',
        redirectTo: 'upload',
        pathMatch: 'full'
      },
      {
        path: 'upload',
        data: {
          breadcrumb: 'Aplicativos'
        },
        loadChildren: () => import('@modules/upload/upload.module').then(m => m.UploadModule),
        // canActivate: [AuthGuard]
      },
    ]
  },
  {
    path: 'upload', component: UploadComponent, pathMatch: 'full'
  },
  // {
  // path: 'view', component: ViewComponent, pathMatch: 'full'
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
