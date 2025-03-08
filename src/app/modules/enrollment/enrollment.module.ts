import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {CalendarModule} from 'primeng/calendar';

import { DirectiveModule } from '../../directives/directives.module';
import { APPPOINTEMENT } from '../../app-constants';
import { BasicEnrollmentComponent } from '../enrollment/basic-enrollment/basic-enrollment.component';
import { UploadDocumentEnrollmentComponent } from '../upload-doc-enrollment/upload-doc-enrollment.component';
import { AddressEnrollmentComponent } from '../enrollment/address-enrollment/address-enrollment.component';
import { HeadOfFamilyEnrollmentComponent } from './head-of-family-enrollment/head-of-family-enrollment.component';
import { DocumentBasedEnrollmentComponent } from './document-based-enrollment/document-based-enrollment.component';
import { PhotoUploadComponent } from '../enrollment/photo-upload/photo-upload.component';
import { BreadCrumbComponent } from '../enrollment/bread-crumb/bread-crumb.component';
import { AuthGuard, DashboardService } from '../../services/index';
import { SharedModule } from '../shared/shared.module';
import { ReviewEnrollmentComponent } from './review-enrollment/review-enrollment.component';
import { EnrolmentSubmissionComponent } from './enrolment-submission/enrolment-submission.component';
import { ChooseUpdateComponent } from './choose-update/choose-update.component';
import { UpdateEnrolmentComponent } from './update-enrolment/update-enrolment.component';
import { EnrollmentSearchComponent } from './enrollment-search/enrollment-search.component';
import { SlotBookingComponent } from './slot-booking/slot-booking.component';
import { AcknowledgementComponent } from './acknowledgement/acknowledgement.component';
import { ConfirmBookingComponent } from './confirm-booking/confirm-booking.component';
import { UpdateReviewComponent } from './update-review/update-review.component';

const childRoutes = [
    { path: '', redirectTo: APPPOINTEMENT.ROUTERLINKS.BASIC_ENROLLMENT, canActivate: [AuthGuard] },
    { path: APPPOINTEMENT.ROUTERLINKS.BASIC_ENROLLMENT, component: BasicEnrollmentComponent, canActivate: [AuthGuard] },
    { path: APPPOINTEMENT.ROUTERLINKS.DOCUMENT_ENROLLMENT, component: UploadDocumentEnrollmentComponent, pathMatch: 'full', canActivate: [AuthGuard] },
    { path: APPPOINTEMENT.ROUTERLINKS.ADDRESS_ENROLLMENT + ':typeOfEnrolment', component: AddressEnrollmentComponent, pathMatch: 'full', canActivate: [AuthGuard] },
    { path: APPPOINTEMENT.ROUTERLINKS.HEAD_OF_FAMILY_ENROLL, component: HeadOfFamilyEnrollmentComponent, pathMatch: 'full', canActivate: [AuthGuard] },
    { path: APPPOINTEMENT.ROUTERLINKS.DOCUMENT_BASED_ENROLLMENT, component: DocumentBasedEnrollmentComponent, pathMatch: 'full', canActivate: [AuthGuard] },
    { path: APPPOINTEMENT.ROUTERLINKS.PHOTO_UPLOAD, component: PhotoUploadComponent, pathMatch: 'full', canActivate: [AuthGuard] },
    { path: APPPOINTEMENT.ROUTERLINKS.REVIEW_ENROLLMENT, component: ReviewEnrollmentComponent, pathMatch: 'full', canActivate: [AuthGuard] },
    { path: APPPOINTEMENT.ROUTERLINKS.SUBMISSION_ENROLMENT + ':appointmentId', component: EnrolmentSubmissionComponent, pathMatch: 'full', canActivate: [AuthGuard] },
    { path: APPPOINTEMENT.ROUTERLINKS.CHOOSE_UPDATE, component: ChooseUpdateComponent, pathMatch: 'full', canActivate: [AuthGuard] },
    { path: APPPOINTEMENT.ROUTERLINKS.UPDATE_ENROLMENT, component: UpdateEnrolmentComponent, pathMatch: 'full', canActivate: [AuthGuard] },
    { path: APPPOINTEMENT.ROUTERLINKS.SEARCH_ENROLMENT_CENTER, component: EnrollmentSearchComponent, pathMatch: 'full', canActivate: [AuthGuard] },
    { path: APPPOINTEMENT.ROUTERLINKS.SLOT_BOOKING + ':ecId', component: SlotBookingComponent, pathMatch: 'full', canActivate: [AuthGuard] },
    { path: APPPOINTEMENT.ROUTERLINKS.CONFIRM_BOOKING, component: ConfirmBookingComponent, pathMatch: 'full', canActivate: [AuthGuard] },
    { path: APPPOINTEMENT.ROUTERLINKS.ACKNOWLEDGEMENT, component: AcknowledgementComponent, pathMatch: 'full', canActivate: [AuthGuard] },
    { path: APPPOINTEMENT.ROUTERLINKS.UPDATE_REVIEW, component: UpdateReviewComponent, pathMatch: 'full', canActivate: [AuthGuard] }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        DirectiveModule,
        ReactiveFormsModule,
        SharedModule,
        CalendarModule,
        RouterModule.forChild(childRoutes),
    ],

    declarations: [
        BasicEnrollmentComponent,
        AddressEnrollmentComponent,
        HeadOfFamilyEnrollmentComponent,
        DocumentBasedEnrollmentComponent,
        UploadDocumentEnrollmentComponent,
        PhotoUploadComponent,
        BreadCrumbComponent,
        ReviewEnrollmentComponent,
        EnrolmentSubmissionComponent,
        ChooseUpdateComponent,
        UpdateEnrolmentComponent,
        EnrollmentSearchComponent,
        SlotBookingComponent,
        AcknowledgementComponent,
        ConfirmBookingComponent,
        UpdateReviewComponent
    ],
    providers: [AuthGuard, DashboardService],
    exports: [RouterModule]
})

export class EnrollmentModule { }
