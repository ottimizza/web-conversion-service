import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';

import { AuthGuard } from '@app/guard/auth.guard';
import { NoAuthGuard } from '@app/guard/no-auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'landpage',
    data: {
      breadcrumb: null
    },
    canActivate: [NoAuthGuard],
    loadChildren: () => import('@modules/land-page/land-page.module').then(m => m.LandPageModule)
  },
  {
    path: 'dashboard',
    data: {
      breadcrumb: 'Dashboard'
    },
    component: ContentLayoutComponent,
    canActivate: [NoAuthGuard], // Should be replaced with actual auth guard
    children: [
      {
        path: '',
        redirectTo: 'upload',
        pathMatch: 'full'
      },
      {
        path: 'upload',
        data: {
          breadcrumb: 'Conversor'
        },
        loadChildren: () => import('@modules/upload/upload.module').then(m => m.UploadModule),
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    loadChildren: () =>
    import('@modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '**',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
