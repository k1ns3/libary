import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './_guards';

import { ScoutLibraryLoginComponent } from './scout-library-login/scout-library-login.component';

const routes: Routes = [
  { path: 'login', component: ScoutLibraryLoginComponent },
  {
    path: '',
    loadChildren: './scout-library/scout-library.module#ScoutLibraryModule',
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
