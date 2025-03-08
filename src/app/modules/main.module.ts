import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from '../services/index';
import { CoreModule } from '../core/core.module';
import { SharedModule } from '../modules/shared/shared.module';
import { NewEnrollmentComponent } from './new-enrollment/new-enrollment.component';

const childRoutes = [
    {
        path: '', loadChildren: './dashboard/dashboard.module#DashboardModule', canActivate: [AuthGuard]
    },
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(childRoutes),
        CoreModule,
        SharedModule
    ],

    declarations: [NewEnrollmentComponent],
    providers: [AuthGuard],
    exports: [RouterModule]
})

export class MainModule { }
