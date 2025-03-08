import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AlertComponent } from './alert/alert.component';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { SpinnerComponent } from './spinner/spinner/spinner.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
    ],

    declarations: [
        AlertComponent,
        UploadFileComponent,
        SpinnerComponent
    ],
    providers: [],
    exports: [AlertComponent,UploadFileComponent,SpinnerComponent]
})

export class DirectiveModule { }
