import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { Location } from '@angular/common';
import { APPPOINTEMENT } from '../../app-constants';
import { UtilService } from '../../services/index';

@Component({
  selector: 'app-document-enrollment',
  templateUrl: './upload-doc-enrollment.component.html',
  styleUrls: ['./upload-doc-enrollment.component.scss']
})
export class UploadDocumentEnrollmentComponent implements OnInit {
  validationMessages: any = APPPOINTEMENT
  submitted = false;
  registerDocumentForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private _utilService: UtilService, private _location: Location, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.registerDocumentForm = this.formBuilder.group({
      file: ['', [Validators.required, this.ageRangeValidator()]]
    });
  }

  get f() { return this.registerDocumentForm.controls; }

  navigateToBack() {
    this._location.back();
  }
  onFileChange(event) {
    this.submitted = true;
    const reader = new FileReader();
    let file = event.target.files[0]
    this.registerDocumentForm.controls['file'].setValue(file ? file.name : '');
    // if (event.target.files && event.target.files.length) {
    //   const [file] = event.target.files;
    //   reader.readAsDataURL(file);
    //   reader.onload = () => {
    //     this.registerDocumentForm.patchValue({
    //       file: reader.result
    //     });

    //     // need to run CD since file load runs outside of zone
    //     this.cd.markForCheck();
    //   };
    // }
  }
  ageRangeValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (!control.value.includes('.pdf')) {
        return { 'fileType': true };
      }
      return null;
    };
  }
  onSubmit(Ngform) {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerDocumentForm.invalid) {
      return;
    }
    // this.goToNext = true;
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerDocumentForm.value))
  }
}
