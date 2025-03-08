import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { APPPOINTEMENT } from '../../../app-constants';
import { Location } from '@angular/common';
import { UserService, AlertService, UtilService } from '../../../services/index';

import * as moment from 'moment';

@Component({
  selector: 'app-basic-enrollment',
  templateUrl: './basic-enrollment.component.html',
  styleUrls: ['./basic-enrollment.component.scss'],
  providers: [UserService]

})
export class BasicEnrollmentComponent implements OnInit {
  validationMessages: any = APPPOINTEMENT
  submitted = false;
  registerForm: FormGroup;
  defaultGender: string = 'Female'
  languages = ["English", "Hindi", "Bengali", "Marathi", "Telugu", "Tamil", "Gujarati", "Urdu", "Kannada", "Odia", "Malayalam", "Punjabi", "Sanskrit"];
  defaultLanguage: string = 'English';
  genders = ["Male", "Female", "Transgender"];
  today: any = new Date();
  maxDate: any = moment().format('YYYY-MM-DD');
  minDate: any = moment('' + (moment().year() - 150) + '-01-01').format('YYYY-MM-DD');
  dob: any;
  timeDifference: any;
  age: any;
  userData: any;
  userHofData: any;
  loader: boolean = true;
  enrolmentId: any;
  bodyHeight: any = document.body.clientHeight;

  constructor(private formBuilder: FormBuilder,
    private _utilService: UtilService,
    private _route: Router,
    private _userService: UserService,
    private _alertService: AlertService,
    private _location: Location) {
  }

  ngOnInit() {
    this.enrolmentId = JSON.parse(localStorage.getItem('userId'))
    this.registerForm = this.formBuilder.group({
      fullName: [null, [Validators.required]],
      dateOfBirth: [null, [Validators.required]],
      age: [null],
      gender: [null, [Validators.required]],
      typeOfId: ['dob']
    });
    if (this.enrolmentId) {
      this.getUser()
    } else {
      this.loader = false
    }
    this.setUserCategoryValidators();
    let tabs = {
      "addressTab": true,
      "photoTab": true,
      "reviewTab": true
    }
    localStorage.setItem('tabs', JSON.stringify(tabs));

  }

  setUserCategoryValidators() {
    const age = this.registerForm.get('age');
    const dateOfBirth = this.registerForm.get('dateOfBirth');
    this.registerForm.get('typeOfId').valueChanges
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


  /**API CALLS */
  addUser(obj) {
    this._userService.createEnrolment(obj).subscribe((res: any) => {
      if (res) {
        this.loader = false;
        let tabs = {
          "addressTab": false,
          "photoTab": true,
          "reviewTab": true
        }
        localStorage.setItem('tabs', JSON.stringify(tabs));
        localStorage.setItem('userId', JSON.stringify(res.id));
        localStorage.setItem('appointmentType', JSON.stringify('NEW'));
        if (this.age < 5 || (obj.age < 5 && obj.age > 0)) {
          localStorage.setItem('hofEnrol',JSON.stringify(1))
          this._route.navigate([APPPOINTEMENT.ROUTERLINKS.ADDRESS_ENROLLMENT, 1]);
        } else {
          this._route.navigate([APPPOINTEMENT.ROUTERLINKS.TYPE_OF_ENROLLMENT]);
        }
      }
    }, error => {
      this.loader = false;
      if (error.status === 406) {
        // this._alertService.error(error.error.message)
      }
    })
  }
  updateUser(obj) {
    this._userService.updateEnrolment(obj, this.enrolmentId).subscribe((res: any) => {
      if (res) {
        this.loader = false;
        let tabs = {
          "addressTab": false,
          "photoTab": true,
          "reviewTab": true
        }
        localStorage.setItem('tabs', JSON.stringify(tabs));
        localStorage.setItem('userId', JSON.stringify(res.id));
        if ((obj.age > 0 && obj.age < 5) || this.age < 5) {
          localStorage.setItem('hofEnrol',JSON.stringify(1))
          this._route.navigate([APPPOINTEMENT.ROUTERLINKS.ADDRESS_ENROLLMENT, 1]);
        } else {
          this._route.navigate([APPPOINTEMENT.ROUTERLINKS.TYPE_OF_ENROLLMENT]);
        }
      }

    }
    , error => {
      this.loader = false;
      // this._alertService.error(error.statusText)
    })
  }
  getUser() {
    this._userService.getEnrolment(this.enrolmentId).subscribe((res: any) => {
      this.loader = false;
      if (res) {
        this.userData = res.residentEnrolmentEntity ? res.residentEnrolmentEntity : null;
        this.userHofData = res.headOfFamilyEntity ? res.headOfFamilyEntity : null;
        if (this.userData) {
          this.registerForm.patchValue({
            fullName: this.userData.fullName,
            dateOfBirth: moment(new Date(this.userData.dob)).format('YYYY-MM-DD'),
            gender: this.userData.gender,
            age: this.userData.age,
            typeOfId: this.userData.dob ? 'dob' : 'age'
          });
        }

        this.ageCalculator(this.userData.dob)
      }
    }
    , err => {
      this.loader = false;
      // this._alertService.error(err.statusText)
    });
  }
  ageCalculator(value) {
    this.dob = new Date(value);
    this.timeDifference = Math.abs(this.today.getTime() - this.dob.getTime());
    this.age = Math.floor(this.timeDifference / (1000 * 3600 * 24) / 365);
  }
  get f() { return this.registerForm.controls; }

  goBack() {
    this._route.navigate([APPPOINTEMENT.ROUTERLINKS.DASHBOARD]);
  }

  onSubmit(f) {
    this.submitted = true;
    f.dateOfBirth.value && this.ageCalculator(f.dateOfBirth.value);
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return
    }
    this.loader = true;
    let obj: any = {
      "fullName": f.fullName.value,
      "dob": f.dateOfBirth.value,
      "gender": f.gender.value.toUpperCase(),
      "age": f.age.value,
      "enrolmentType": "NEW",
      "enrolmentStatus": "DRAFT",
      "loggedInMobile": JSON.parse(localStorage.getItem('loggedInMobile')),
    }
    if (this.userData) {
      obj.id = this.enrolmentId;
      obj.careOfType = this.userData.careOfType;
      obj.careOfName = this.userData.careOfName;
      obj.houseNO = this.userData.houseNO;
      obj.adrs1 = this.userData.adrs1;
      obj.adrs2 = this.userData.adrs2;
      obj.landMark = this.userData.landMark;
      obj.vtc = this.userData.vtc;
      obj.district = this.userData.district;
      obj.postOfc = this.userData.postOfc;
      obj.policeOfc = this.userData.policeOfc;
      obj.mobileNo = this.userData.mobileNo;
      obj.email = this.userData.email;
      obj.state = this.userData.state;
      obj.pinCode = this.userData.pinCode;
      obj.hofEnrol = this.userData.hofEnrol;
      obj.pageNo = ((f.age.value > 5 || this.age > 5) && this.userData.hofEnrol === 0) ? 'DOC' : 'HOF'
      if (this.userHofData) {
        obj.hofRel_type = this.userHofData.hofRelType;
        obj.hofRelativeName = this.userHofData.relativeName;
        obj.hofEnrolmentId_rel = this.userHofData.enrolmentIdRel;
        obj.hofAadharId_rel = this.userHofData.aadharIdRel;
      }
      this.updateUser(obj);
    } else {
      this.addUser(obj);
    }
  }

  keyPress(event: any) {
    this._utilService.keyPress(event)
  }

  keyPress1(event: any) {
    this._utilService.eventToAcceptOnlyNumbers(event)
  }
}
