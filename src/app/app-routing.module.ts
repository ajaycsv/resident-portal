import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/index';

export const routes: Routes = [
  { path: '', loadChildren: './core/core.module#CoreModule' },
  { path: '', loadChildren: './modules/main.module#MainModule',canActivate: [AuthGuard] }

];


@NgModule({
  imports: [RouterModule.forRoot(routes),
    CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }

