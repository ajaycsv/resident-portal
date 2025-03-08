import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectiveModule } from '../../directives/directives.module';
import { APPPOINTEMENT } from '../../app-constants';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { TypeOfEnrollmentComponent } from '../type-of-enrollment/type-of-enrollment.component';
import { AuthGuard, DashboardService } from '../../services/index';
import { SharedModule } from '../../modules/shared/shared.module';

const childRoutes = [
    { path: APPPOINTEMENT.ROUTERLINKS.DASHBOARD, component: DashboardComponent, pathMatch: 'full', canActivate: [AuthGuard] },
    { path: APPPOINTEMENT.ROUTERLINKS.TYPE_OF_ENROLLMENT, component: TypeOfEnrollmentComponent, pathMatch: 'full', canActivate: [AuthGuard] },
    { path: '', loadChildren: '../enrollment/enrollment.module#EnrollmentModule', canActivate: [AuthGuard] },
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        DirectiveModule,
        ReactiveFormsModule,
        SharedModule,
        RouterModule.forChild(childRoutes),
    ],

    declarations: [
        DashboardComponent,
        TypeOfEnrollmentComponent,
    ],
    providers: [AuthGuard, DashboardService],
    exports: [RouterModule]
})

export class DashboardModule { }
