import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { APPPOINTEMENT } from '../app-constants';
import { LoginComponent } from './login/login.component';
import { AuthenticationService } from '../services/index';
import { AuthGuard } from '../services/helpers/guards/auth.guard'
import {SharedModule} from '../modules/shared/shared.module';
const coreRoutes: Routes = [
  { path: APPPOINTEMENT.ROUTERLINKS.ROOT, component: LoginComponent },
  { path: APPPOINTEMENT.ROUTERLINKS.LOGIN, component: LoginComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(coreRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule
  ],
  declarations: [LoginComponent],
  providers: [AuthenticationService, AuthGuard],
  exports: [RouterModule]
})
export class CoreModule { }
