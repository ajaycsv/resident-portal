import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { APPPOINTEMENT } from '../../../app-constants';
import { UtilService } from 'src/app/services/helpers/util.service';

@Component({
  selector: 'app-choose-update',
  templateUrl: './choose-update.component.html',
  styleUrls: ['./choose-update.component.scss']
})
export class ChooseUpdateComponent implements OnInit {
  appointment: any = APPPOINTEMENT
  form: FormGroup;
  submitted = false;
  bodyHeight: any = document.body.clientHeight;
  draftedUpdated: any = []
  draftedNameUpdate: any = [];
  draftedGenderUpdate: any = [];
  draftedDobUpdate: any = [];
  draftedMobileUpdate: any = [];
  draftedEmailUpdate: any = [];
  draftedAddressUpdate: any = [];
  draftedBiometricUpdate: any = [];
  disableCheckBox: any = false;
  updateFields = [
    { id: 1, name: 'Name', isSelected: false },
    { id: 2, name: 'Gender', isSelected: false },
    { id: 3, name: 'Date of Birth', isSelected: false },
    { id: 4, name: 'Mobile Number', isSelected: false },
    { id: 5, name: 'E-Mail Id', isSelected: false },
    { id: 6, name: 'Address', isSelected: false },
    { id: 7, name: 'Biometrics (Finger Prints, Iris & Photograph)', isSelected: false}
  ];

  constructor(private formBuilder: FormBuilder, private _route: Router, private _utilService: UtilService) {
    this.draftedUpdated = JSON.parse(localStorage.getItem('DraftedUpdated'))
    this.form = this.formBuilder.group({
      aadhaarName: ['', Validators.required],
      aadhaarNumber: ['', [Validators.required, Validators.minLength(12), Validators.maxLength(12)]],
      age: [null],
      isCheckedAge: [false],
      updateFields: new FormArray([], this.minSelectedCheckboxes(1))
    });
    if (this.draftedUpdated) {
      this.addCheckboxes();
    } else {
      this.updateFields.map((o, i) => {
        const control = new FormControl();
        (this.form.controls.updateFields as FormArray).push(control);
      })
    }
  }

  ngOnInit() {
    this.draftedUpdated = JSON.parse(localStorage.getItem('DraftedUpdated'))
    // this.setUserCategoryValidators()

    this.form.get('isCheckedAge').valueChanges.subscribe(isCheckedAge => {
      if (isCheckedAge) {
        this.form.get('age').setValidators([Validators.required, Validators.max(17)]);
      } else {
        this.form.get('age').setValidators([]);
        this.form.patchValue({
          age: ''
        })
      }
    });

    this.form.get('age').valueChanges.subscribe(age => {
      if (age < 5) {
        this.disableCheckBox = true;
      } else {
        this.disableCheckBox = false;
      }
    });

    this.form.get('isCheckedAge').valueChanges.subscribe(isCheckedAge => {
      if (isCheckedAge && this.form.get('age').value < 5) {
        this.disableCheckBox = true;
      } else {
        this.disableCheckBox = false;
      }
    });

    this.form.get('aadhaarNumber').valueChanges.subscribe(aadhaarNumber => {
      if (aadhaarNumber.length === 12) {
        if (this._utilService.validateAadhaar(aadhaarNumber) === false) {
          alert("Enter Valid AADHAAR Number");
          this.form.patchValue({
            aadhaarNumber: ''
          })
        }
      }
    });
  }

  setUserCategoryValidators() {
    const age = this.form.get('age');
    const dateOfBirth = this.form.get('dateOfBirth');
    this.form.get('typeOfId').valueChanges
      .subscribe(typeOfId => {
        if (typeOfId === 'dob') {
          dateOfBirth.setValidators([Validators.required]);
          age.setValidators(null);
          age.setValue(null)
        }
        if (typeOfId === 'age') {
          dateOfBirth.setValidators(null);
          dateOfBirth.setValue(null)
          age.setValidators([Validators.required, Validators.min(1), Validators.max(150)]);
        }
        age.updateValueAndValidity();
        dateOfBirth.updateValueAndValidity();
      });
  }
  get f() { return this.form.controls; }

  private addCheckboxes() {
    this.draftedNameUpdate = this.draftedUpdated.filter(app => app.updateType.toUpperCase() === 'NAME');
    this.draftedDobUpdate = this.draftedUpdated.filter(app => app.updateType.toUpperCase() === 'DOB');
    this.draftedGenderUpdate = this.draftedUpdated.filter(app => app.updateType.toUpperCase() === 'GENDER');
    this.draftedMobileUpdate = this.draftedUpdated.filter(app => app.updateType.toUpperCase() === 'MOBILE');
    this.draftedEmailUpdate = this.draftedUpdated.filter(app => app.updateType.toUpperCase() === 'EMAIL');
    this.draftedAddressUpdate = this.draftedUpdated.filter(app => app.updateType.toUpperCase() === 'ADDRESS');
    this.draftedBiometricUpdate = this.draftedUpdated.filter(app => app.updateType.toUpperCase() === 'BIOMETRIC');
    if (this.draftedUpdated.length !== 0) {
      this.updateFields.map((o, i) => {
        if (o.id == 1) {
          let isNameSelected = this.draftedNameUpdate.length !== 0 ? true : false
          const control = new FormControl(isNameSelected);
          (this.form.controls.updateFields as FormArray).push(control);
        }
        if (o.id == 2) {
          let isGenderSelected = this.draftedGenderUpdate.length !== 0 ? true : false
          const control = new FormControl(isGenderSelected);
          (this.form.controls.updateFields as FormArray).push(control);
        }
        if (o.id == 3) {
          let isDobSelected = this.draftedDobUpdate.length !== 0 ? true : false
          const control = new FormControl(isDobSelected);
          (this.form.controls.updateFields as FormArray).push(control);
        }
        if (o.id == 4) {
          let isMobileSelected = this.draftedMobileUpdate.length !== 0 ? true : false
          const control = new FormControl(isMobileSelected);
          (this.form.controls.updateFields as FormArray).push(control);
        }
        if (o.id == 5) {
          let isEmailSelected = this.draftedEmailUpdate.length !== 0 ? true : false
          const control = new FormControl(isEmailSelected);
          (this.form.controls.updateFields as FormArray).push(control);
        }
        if (o.id == 6) {
          let isAddressSelected = this.draftedAddressUpdate.length !== 0 ? true : false
          const control = new FormControl(isAddressSelected);
          (this.form.controls.updateFields as FormArray).push(control);
        }
        if (o.id == 7) {
          let isBiometricSelected = this.draftedBiometricUpdate.length !== 0 ? true : false
          const control = new FormControl(isBiometricSelected);
          (this.form.controls.updateFields as FormArray).push(control);
        }
      });
    }
  }

  keyPress1(event: any) {
    this._utilService.eventToAcceptOnlyNumbers(event)
  }
  keyPress(event: any) {
    this._utilService.keyPress(event)
  }

  minSelectedCheckboxes(min = 1) {
    const validator: ValidatorFn = (formArray: FormArray) => {
      const totalSelected = formArray.controls
        .map(control => control.value)
        .reduce((prev, next) => next ? prev + next : prev, 0);
      return totalSelected >= min ? null : { required: true };
    };
    return validator;
  }

  submit(f) {
    // let obj = {
    //   aadhaarName: f.aadhaarName.value,
    //   aadhaarNumbe: f.aadhaarNumber.value
    // }
    this.submitted = true;
    if (this.form.invalid) {
      return
    }
    let biometric: any = 0
    let age: any 
    if (f.isCheckedAge.value) {
      if (f.age.value < 5) {
        biometric = 3;
      } else if ((f.age.value == 5 || f.age.value == 6 || f.age.value == 15 || f.age.value == 16)) {
        biometric = 2;
      } else {
        biometric = 1;
      }
    }
    let obj: any = {}
    if (f.aadhaarName.value) {
      obj = {
        aadhaarName: f.aadhaarName.value,
        aadhaarNumber: f.aadhaarNumber.value,
        biometric: biometric,
        isCheckedAge : f.isCheckedAge.value,
        age: f.age.value
      }
    }
    const selectedOrderIds = this.form.value.updateFields
      .map((v, i) => v ? this.updateFields[i].id : null)
      .filter(v => v !== null);
    selectedOrderIds.forEach(element => {
        if (element === 7) {
          obj.biometric = 1
        }
    });
    localStorage.setItem("aadharName", JSON.stringify(obj));
    localStorage.setItem("fields", JSON.stringify(selectedOrderIds));
    localStorage.setItem('backToChoose', 'true');
    this._route.navigate([APPPOINTEMENT.ROUTERLINKS.UPDATE_ENROLMENT]);
    // const selectedOrderIds = this.form.value.updateFields
    //   .map((v, i) => v.isSelected ? this.updateFields[i].id : null)
    //   .filter(v => v !== null);
    // localStorage.setItem("fields", JSON.stringify(selectedOrderIds));
    // this._route.navigate([APPPOINTEMENT.ROUTERLINKS.UPDATE_ENROLMENT]);
  }
}
