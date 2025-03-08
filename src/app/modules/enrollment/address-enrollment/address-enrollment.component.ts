import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { APPPOINTEMENT } from '../../../app-constants';
import { UtilService, UserService, AlertService } from '../../../services/index';
import { Location } from '@angular/common';

@Component({
  selector: 'app-address-enrollment',
  templateUrl: './address-enrollment.component.html',
  styleUrls: ['./address-enrollment.component.scss']
})
export class AddressEnrollmentComponent implements OnInit {
  validationMessages: any = APPPOINTEMENT
  submitted = false;
  addressForm: FormGroup;
  editPhoneNumber: boolean = false;
  loader: boolean = true;
  userData: any = {};
  enrolmentId: any;
  mobileNumber: any;
  id: number;
  private sub: any;
  villages: Array<Object> = [];
  districts: any = [];
  subDistricts: any = [];
  states: any = [];
  villageName: any;
  subDistrictName: any;
  bodyHeight: any = document.body.clientHeight;
  relations: any;
  calculatedAge: any;
  hofType: any
  constructor(private formBuilder: FormBuilder,
    private _utilService: UtilService,
    private _route: Router,
    private _location: Location,
    private _userService: UserService,
    private _alertService: AlertService,
    private _activatedRouter: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this._activatedRouter.params.subscribe(params => {
      this.id = params['typeOfEnrolment'];
    });
    this.enrolmentId = JSON.parse(localStorage.getItem('userId'))
    this.mobileNumber = JSON.parse(localStorage.getItem('loggedInMobile'))
    this.addressForm = this.formBuilder.group({
      careOfType: [''],
      careOfName: [null],
      houseNo: [''],
      addressLine1: [''],
      addressLine2: [''],
      landmark: [''],
      village: ['', Validators.required],
      district: ['', Validators.required],
      postOffice: ['', Validators.required],
      mobileNo: [''],
      email: ['', Validators.email],
      state: ['', Validators.required],
      pincode: ['', [Validators.required, Validators.maxLength(6), Validators.minLength(6)]],
      relationType: this.id == 1 ? ['', Validators.required] : '',
      relativeName: this.id == 1 ? ['', Validators.required] : '',
      aadhaarNumber: this.id == 1 ? ['', [Validators.required, Validators.maxLength(12), Validators.minLength(12)]] : '',
      eidNumber: [''],
      eidNumberDate:  [''],
      typeOfId: 'aadhaarNumber'
    });
    this.addressForm.get('aadhaarNumber').valueChanges.subscribe(aadhaarNumber => {
      if (aadhaarNumber && aadhaarNumber.length === 12) {
        if (this._utilService.validateAadhaar(aadhaarNumber) === false) {
          alert("Enter Valid AADHAAR Number");
          this.addressForm.patchValue({
            aadhaarNumber: ''
          })
        }
      }
    });
    if (this.enrolmentId) {
      this.getEnrolment();
    } else {
      this.loader = false
    }

    this.loadVillages();
    this.setAddressCategoryValidators();
    let tabs = {
      "addressTab": false,
      "photoTab": true,
      "reviewTab": true
    }
    localStorage.setItem('tabs', JSON.stringify(tabs));
    this.addressForm.get('aadhaarNumber').valueChanges.subscribe(aadhaarNumber => {
      if (aadhaarNumber.length === 12) {
        if (this._utilService.validateAadhaar(aadhaarNumber) === false) {
          alert("Enter Valid AADHAAR Number");
          this.addressForm.patchValue({
            aadhaarNumber: ''
          })
        }
      }
    });
  }

  setAddressCategoryValidators() {
    const aadhaarNumber = this.addressForm.get('aadhaarNumber');
    const eidNumber = this.addressForm.get('eidNumber');
    const eidNumberDate = this.addressForm.get('eidNumberDate');
    this.addressForm.get('typeOfId').valueChanges
      .subscribe(typeOfId => {
        if (typeOfId == 'aadhaarNumber') {
          aadhaarNumber.setValidators(Validators.required);
          aadhaarNumber.setValidators([Validators.required, Validators.maxLength(12), Validators.minLength(12)])
          eidNumber.setValue(null)
          eidNumber.setValidators([]);
          eidNumberDate.setValue(null);
          eidNumberDate.setValidators([]);
        }
        if (typeOfId == 'eidNumber') {
          aadhaarNumber.setValidators(null);
          aadhaarNumber.setValue(null);
          eidNumber.setValidators(Validators.required);
          eidNumber.setValidators([Validators.required, Validators.maxLength(14), Validators.minLength(14)])
          eidNumberDate.setValidators(Validators.required);
          eidNumberDate.setValidators([Validators.required, Validators.maxLength(14), Validators.minLength(14)])
        }
        eidNumber.updateValueAndValidity();
        aadhaarNumber.updateValueAndValidity();
        eidNumberDate.updateValueAndValidity();
      });
  }

  loadVillages() {
    let pincodeLoaded = true;
    this.addressForm.get('pincode').valueChanges
      .subscribe(pincode => {
        if (pincode.length === 6 && pincodeLoaded) {
          this.getVillagesByPinCode(pincode, '');
          pincodeLoaded = false;
        } else {
          pincodeLoaded = true;
        }
      });
  }
  /** API CALLS */
  updateEnrolment(obj) {
    this._userService.updateEnrolment(obj, this.enrolmentId).subscribe((res: any) => {
      if (res) {
        this.loader = false
        let tabs = {
          "addressTab": false,
          "photoTab": true,
          "reviewTab": false
        }
        localStorage.setItem('tabs', JSON.stringify(tabs));
        this._route.navigate([APPPOINTEMENT.ROUTERLINKS.REVIEW_ENROLLMENT]);
      }
    }, error => {
      this.loader = false
      // this._alertService.error(error.statusText)
    })
  }

  getEnrolment() {
    // this.hofType = JSON.parse(localStorage.getItem('hofEnrol'))
    this._userService.getEnrolment(this.enrolmentId).subscribe((response: any) => {
      this.loader = false;
      if (response && response.residentEnrolmentEntity) {
        let res = response.residentEnrolmentEntity;
        let hofRes = response.headOfFamilyEntity
        this.userData.fullName = res.fullName
        this.userData.dob = res.dob
        this.userData.age = res.age
        this.userData.gender = res.gender
        this.userData.loggedInMobile = res.loggedInMobile
        if ((this.ageCalculator(res.dob) < 15 && this.ageCalculator(res.dob) >= 5) || (res.age < 15 && res.age >= 5) || ((res.age < 5 && res.age > 0) || this.ageCalculator(res.dob) < 5)) {
          this.relations = ['Father', 'Mother', 'Guardian'];
        } else if (res.age >= 15 || this.ageCalculator(res.dob) >= 15) {
          this.relations = ['Father', 'Mother', 'Guardian','Husband', 'Wife'];
        }
        if ((res.state && res.hofEnrol == 0 && !hofRes && res.pageNo.toUpperCase() === 'DOC' || res.pageNo.toUpperCase() === 'REVIEW')
          || (res.state && res.hofEnrol == 1 && hofRes && hofRes.relativeName && res.pageNo.toUpperCase() === 'HOF' || res.pageNo.toUpperCase() === 'REVIEW')) {
          this.villageName = res.vtc;
          this.subDistrictName = res.postOfc;
          this.getVillagesByPinCode(res.pinCode, res.vtc)
          this.addressForm.patchValue({
            careOfType: res.careOfType,
            careOfName: res.careOfName,
            houseNo: res.houseNO,
            addressLine1: res.adrs1,
            addressLine2: res.adrs2,
            landmark: res.landMark,
            mobileNo: res.mobileNo !== 0 ? res.mobileNo : null,
            email: res.email,
            state: res.state,
            relationType: (hofRes && hofRes.hofRelType) ? hofRes.hofRelType : null,
            relativeName: (hofRes && hofRes.relativeName) ? hofRes.relativeName : null,
            aadhaarNumber: (hofRes && hofRes.aadharIdRel !== 0) ? hofRes.aadharIdRel : '',
            eidNumber:  (hofRes && hofRes.enrolmentIdRel) ? hofRes.enrolmentIdRel.substring(0,14) : '',
            eidNumberDate:  (hofRes && hofRes.enrolmentIdRel) ? hofRes.enrolmentIdRel.substring(14,28) : '',
            typeOfId: (hofRes && hofRes.enrolmentIdRel) ? 'eidNumber' : ((hofRes && hofRes.aadharIdRel !== 0) || this.id == 1) ? 'aadhaarNumber': ''
          });
        }
        if (!res) {
          this.addressForm.patchValue({
            careOfType: '',
            careOfName: '',
            houseNo: '',
            addressLine1: '',
            addressLine2: '',
            landmark: '',
            village: '',
            district: '',
            postOffice: '',
            mobileNo: this.mobileNumber,
            email: '',
            state: '',
            pincode: '',
            relationType: '',
            relativeName: '',
            aadhaarNumber: '',
            eidNumber: '',
            eidNumberDate: ''
          });
        }
      }
    }, err => {
      this.loader = false
      // this._alertService.error(err.statusText)
    });
    if (this.mobileNumber) {
      this.addressForm.patchValue({
        mobileNo: this.mobileNumber,
      });
    }
  }
  ageCalculator(d) {
    let today: any = new Date();
    let dob = new Date(d);
    let timeDifference = Math.abs(today.getTime() - dob.getTime());
    return Math.floor(timeDifference / (1000 * 3600 * 24) / 365);

  }
  getVillagesByPinCode(code, name) {
    this.loader = true;
    this._userService.getVillagesByPinCode(code).subscribe((res: any) => {
      this.loader = false;
      if (res && !res.error) {
        this.villages = [];
        this.villages = res;
        let filterVillage: any
        if (name) {
          filterVillage = this.villages.find((item: any) => item.villageName.toUpperCase() === name.toUpperCase());
        }
        if (filterVillage) {
          this.addressForm.patchValue({ village: filterVillage.villageCode, pincode: code })
          this.villageName = filterVillage.villageName;
          this.getSubDistrictByCode(filterVillage.subDistrictCode)
        } else {
          this.addressForm.patchValue({ village: res[0].villageCode,pincode: code })
          this.villageName = res[0].villageName;
          this.getSubDistrictByCode(res[0].subDistrictCode)
        }
      } else if(res.error) {
        this._alertService.error(res.message);
        this.villages = [];
        this.villageName = '';
        this.addressForm.patchValue({ village: '' });
        this.addressForm.patchValue({ postOffice: '' });
        this.addressForm.patchValue({ district: '' });
        this.addressForm.patchValue({ state: '' });
      }
    }, err => {
      this.loader = false
      this.villages = [];
      this.villageName = '';
      this.addressForm.patchValue({ village: '' });
      this.addressForm.patchValue({ postOffice: '' });
      this.addressForm.patchValue({ district: '' });
      this.addressForm.patchValue({ state: '' });
      this._alertService.error("No data for this pincode")
    })
  }
  stripEndQuotes(s) {
    var t = s.length;
    if (s.charAt(0) == '"') s = s.substring(1, t--);
    if (s.charAt(--t) == '"') s = s.substring(0, t);
    return s;
  }

  getSubDistrictByCode(code) {
    this._userService.getSubDistrictByCode(code).subscribe((res: any) => {
      if (res) {
        this.loader = false
        this.subDistricts = [];
        this.subDistricts = res;
        this.addressForm.patchValue({ postOffice: res[0].subdistrictName })
        this.getDistrictByCode(res[0].districtCode)
      }
    }, err => {
      this.loader = false
      // this._alertService.error(err.statusText)
    })
  }

  getDistrictByCode(code) {
    this._userService.getDistrictByCode(code).subscribe((res: any) => {
      if (res) {
        this.loader = false
        this.addressForm.patchValue({
          district: res[0].districtName,
        })
        this.getStateByCode(res[0].stateCode)
      }
    }, err => {
      this.loader = false
      //this._alertService.error(err.statusText)
    })
  }


  getStateByCode(code) {
    this._userService.getStateByCode(code).subscribe((res: any) => {
      if (res) {
        this.loader = false
        this.states = res;
        this.addressForm.patchValue({
          state: res.stateName,
        })
      }
    }, err => {
      this.loader = false
      //this._alertService.error(err.statusText)
    })
  }

  //**Change Events */
  changeEventVillage(villageCode) {
    let village: any = this.villages.find((item: any) => item.villageCode === villageCode);
    this.villageName = village.villageName;
    this.loader = true
    this.getSubDistrictByCode(village.subDistrictCode)
  }
  changeEventSubDistrict(id) {
    let subDistrict: any = this.subDistricts.find((item: any) => item.districtCode === id);
    this.subDistrictName = subDistrict.subdistrictName
    this.loader = true
    this.getDistrictByCode(id)
  }
  changeEventDistrict(id) {
    this.getStateByCode(id)
  }
  changeEventState(id) {
    this.getStateByCode(id)
  }
  // ** //
  get f() { return this.addressForm.controls; }

  keyPress(event: any) {
    this._utilService.keyPress(event)
  }
  keyPress1(event: any) {
    this._utilService.eventToAcceptOnlyNumbers(event)
  }
  navigateToBack() {
    this._route.navigate([APPPOINTEMENT.ROUTERLINKS.BASIC_ENROLLMENT]);
  }

  handleEditPhoneNumber(value) {
    this.editPhoneNumber = value;
  }
  onSubmit(f) {
    console.log(f)
    let addressObj: any = {}
    this.submitted = true;
    // stop here if form is invalid
    if (this.addressForm.invalid) {
      return;
    }
    this.loader = true;
    addressObj = {
      "id": this.enrolmentId,
      "fullName": this.userData.fullName,
      "dob": this.userData.dob,
      "gender": this.userData.gender,
      "age": this.userData.age,
      "enrolmentType": "NEW",
      "enrolmentStatus": "DRAFT",
      "loggedInMobile": f.mobileNo.value,
      "mobileNo": f.mobileNo.value,
      "email": f.email.value,
      "adrs1": f.addressLine1.value,
      "adrs2": f.addressLine2.value,
      "vtc": this.villageName,
      "pinCode": f.pincode.value,
      "district": f.district.value,
      "state": f.state.value,
      "careOfType": f.careOfType.value ? f.careOfType.value : 'C/O',
      "careOfName": f.careOfName.value,
      "houseNO": f.houseNo.value,
      "landMark": f.landmark.value,
      "postOfc": f.postOffice.value,
      "policeOfc": f.postOffice.value,
      "pageNo": 'REVIEW'
    }
    if (this.id == 1) {
      addressObj.hofEnrol = 1;
      addressObj.hofRel_type = f.relationType.value
      addressObj.hofRelativeName = f.relativeName.value;
      addressObj.hofEnrolmentId_rel = (f.typeOfId.value == "eidNumber") ? f.eidNumber.value + f.eidNumberDate.value : '';
      addressObj.hofAadharId_rel = (f.typeOfId.value == "aadhaarNumber") ? f.aadhaarNumber.value : ''; 
    }
    if (this.id == 0) {
      addressObj.hofEnrol = 0
    }
    this.updateEnrolment(addressObj)
  }
  handleBackNavigation() {
    this._route.navigate([APPPOINTEMENT.ROUTERLINKS.BASIC_ENROLLMENT]);
  }

  validateEmail(event) {
    if (!(this._utilService.validateEmail(event.target.value))){
      alert("Enter Valid Email ID");
          this.addressForm.patchValue({
            email: ''
          })
    }
  }

}
