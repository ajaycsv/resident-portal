import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { APPPOINTEMENT } from '../../../app-constants';
import { UserService, AlertService, UtilService } from '../../../services/index';
import * as moment from 'moment';

@Component({
  selector: 'app-update-enrolment',
  templateUrl: './update-enrolment.component.html',
  styleUrls: ['./update-enrolment.component.scss']
})
export class UpdateEnrolmentComponent implements OnInit {
  form1: any = {}
  updateForm: FormGroup;
  submitted = false;
  updatedFields: any = {};
  aadhaarName: any;
  aadhaarNumber: any;
  validationMessages: any = APPPOINTEMENT
  bodyHeight: any = document.body.clientHeight;
  villages: any = [];
  subDistricts: any = [];
  loader: boolean;
  villageName: any;
  maxDate: any = moment().format('YYYY-MM-DD');
  minDate: any = moment('' + (moment().year() - 150) + '-01-01').format('YYYY-MM-DD');
  subDistrictName: any;
  loggedInMobile: any;
  updatedAadhaarRecord: any = [];
  updateNameRecord: any = {};
  updateDobRecord: any = {};
  updateGenderRecord: any = {}
  updateMobileRecord: any = {}
  updateEmailRecord: any = {}
  updateAddressRecord: any = {}
  updateBiometricRecord: any = {}
  addressRecord: any = {}
  draftedUpdated: any = []
  draftedNameUpdate: any = {};
  draftedGenderUpdate: any = {};
  draftedDobUpdate: any = {};
  draftedMobileUpdate: any = {};
  draftedEmailUpdate: any = {};
  draftedAddressUpdate: any = {};
  draftedBiometricUpdate: any = {};
  aadhaarObject: any = {};
  bioFlag=true;
  constructor(private formBuilder: FormBuilder, private router: Router, private _userService: UserService, private _alertService: AlertService, private _utilService: UtilService) { }

  ngOnInit() {
    this.loggedInMobile = JSON.parse(localStorage.getItem('loggedInMobile'))
    this.aadhaarObject = JSON.parse(localStorage.getItem("aadharName"));
    this.updatedAadhaarRecord = JSON.parse(localStorage.getItem('updateAadharRecord'));
    let f: any[] = JSON.parse(localStorage.getItem('fields'))
    if (f) {
      f.forEach((e) => {
        switch (e) {
          case 1: {
            this.updatedFields.name = true;
            break;
          }
          case 2: {
            this.updatedFields.gender = true;
            break;
          }
          case 3: {
            this.updatedFields.dob = true;
            break
          }
          case 4: {
            this.updatedFields.mobile = true;
            break;
          }
          case 5: {
            this.updatedFields.email = true;
            break;
          }
          case 6: {
            this.updatedFields.address = true;
            break
          }
          case 7: {
            this.updatedFields.biometric = true;
            break
          }
          default: {
            break;
          }
        }
      })
    }
    this.updateForm = this.formBuilder.group({
      aadhaarName: (this.aadhaarObject && this.aadhaarObject.aadhaarName) ? this.aadhaarObject.aadhaarName : (this.updatedAadhaarRecord) ? this.updatedAadhaarRecord[0].response.aadhaarId : '',
      aadhaarNumber: (this.aadhaarObject && this.aadhaarObject.aadhaarNumber) ? this.aadhaarObject.aadhaarNumber : (this.updatedAadhaarRecord) ? this.updatedAadhaarRecord[0].response.fullName : '',
      newName: this.updatedFields.name ? [null, Validators.required] : '',
      newDob: this.updatedFields.dob ? ['', Validators.required] : '',
      newGender: this.updatedFields.gender ? ['', Validators.required] : '',
      newNumber: this.updatedFields.mobile ? ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]] : '',
      newEmail: this.updatedFields.email ? ['', [Validators.required, Validators.email]] : '',
      typeOfId: this.updatedFields.dob && ['dob'],
      newAge: this.updatedFields.dob && [null],
      oldAge: this.updatedFields.dob && [null],
      careOf: this.updatedFields.address && 'C/O',
      careOfName: this.updatedFields.address && '',
      houseNo: this.updatedFields.address ? ['', Validators.required] : '',
      streetNo: this.updatedFields.address ? ['', Validators.required] : '',
      landmark: this.updatedFields.address && '',
      pinCode: this.updatedFields.address ? ['', Validators.required] : '',
      area: this.updatedFields.address && '',
      village: this.updatedFields.address ? ['', Validators.required] : '',
      postOffice: this.updatedFields.address ? ['', Validators.required] : '',
      district: this.updatedFields.address ? ['', Validators.required] : '',
      state: this.updatedFields.address ? ['', Validators.required] : '',

    });
    this.setUserCategoryValidators();
    this.loadVillages();
    
    if (this.updatedAadhaarRecord) {
      this.updatedAadhaarRecord.forEach(element => {
        this.updateNameRecord = element.response.filter(app => app.updateType.toUpperCase() === 'NAME');
        this.updateDobRecord = element.response.filter(app => app.updateType.toUpperCase() === 'DOB');
        this.updateGenderRecord = element.response.filter(app => app.updateType.toUpperCase() === 'GENDER');
        this.updateMobileRecord = element.response.filter(app => app.updateType.toUpperCase() === 'MOBILE');
        this.updateEmailRecord = element.response.filter(app => app.updateType.toUpperCase() === 'EMAIL');
        this.updateAddressRecord = element.response.filter(app => app.updateType.toUpperCase() === 'ADDRESS');
        this.updateBiometricRecord = element.response.filter(app => app.updateType.toUpperCase() === 'BIOMETRIC');
      });
      this.UpdateNameRecord1();
      this.updateDobRecord1();
      this.updateGenderRecord1();
      this.updateMobileRecord1();
      this.updateEmailRecord1();
      this.updateAddressRecord1();
      this.updateBiometricRecord1();
    }
    this.draftedUpdated = JSON.parse(localStorage.getItem('DraftedUpdated'))
    if (this.draftedUpdated) {
      this.draftedUpdated1()
    }
    let aadharId = JSON.parse(localStorage.getItem('aadhaarNumber'));
    if (aadharId) {
      //  this.getUpdatedData(aadharId);
    }
  }
  draftedUpdated1() {
    if (this.draftedUpdated.length !== 0) {
      if (this.draftedUpdated) {
        this.draftedNameUpdate = this.draftedUpdated.filter(app => app.updateType.toUpperCase() === 'NAME');
        this.draftedDobUpdate = this.draftedUpdated.filter(app => app.updateType.toUpperCase() === 'DOB');
        this.draftedGenderUpdate = this.draftedUpdated.filter(app => app.updateType.toUpperCase() === 'GENDER');
        this.draftedMobileUpdate = this.draftedUpdated.filter(app => app.updateType.toUpperCase() === 'MOBILE');
        this.draftedEmailUpdate = this.draftedUpdated.filter(app => app.updateType.toUpperCase() === 'EMAIL');
        this.draftedAddressUpdate = this.draftedUpdated.filter(app => app.updateType.toUpperCase() === 'ADDRESS');
        this.draftedBiometricUpdate = this.draftedUpdated.filter(app => app.updateType.toUpperCase() === 'BIOMETRIC');
        if (this.draftedNameUpdate.length !== 0) {
          this.updatedFields.name = true;
          let res = this.draftedNameUpdate[0]
          this.updateForm.patchValue({
            aadhaarNumber: res.aadhaarId,
            aadhaarName: res.fullName,
            newName: res.newValue,
          })
        }
        if (this.draftedDobUpdate.length !== 0) {
          this.updatedFields.dob = true;
          let res = this.draftedDobUpdate[0]
          this.updateForm.patchValue({
            aadhaarNumber: res.aadhaarId,
            aadhaarName: res.fullName,
            newDob: res.newValue,
          })
        }
        if (this.draftedGenderUpdate.length !== 0) {
          this.updatedFields.gender = true;
          let res = this.draftedGenderUpdate[0]
          this.updateForm.patchValue({
            aadhaarNumber: res.aadhaarId,
            aadhaarName: res.fullName,
            newGender: res.newValue,
          })
        }
        if (this.draftedMobileUpdate.length !== 0) {
          this.updatedFields.mobile = true;
          let res = this.draftedMobileUpdate[0]
          this.updateForm.patchValue({
            aadhaarNumber: res.aadhaarId,
            aadhaarName: res.fullName,
            newNumber: res.newValue,
          })
        }
        if (this.draftedEmailUpdate.length !== 0) {
          this.updatedFields.email = true;
          let res = this.draftedEmailUpdate[0]
          this.updateForm.patchValue({
            aadhaarNumber: res.aadhaarId,
            aadhaarName: res.fullName,
            newEmail: res.newValue,
          })
        }
        if (this.draftedAddressUpdate.length !== 0) {
          this.updatedFields.address = true;
          let res = this.draftedAddressUpdate[0]
          this.updateForm.patchValue({
            aadhaarNumber: res.aadhaarId,
            aadhaarName: res.fullName,
            area: res.address.area,
            pinCode: res.address.pinCode,
            houseNo: res.address.houseNo,
            streetNo: res.address.street,
            landmark: res.address.landMark,
          })
          if (res.address.pinCode) {
            this.getVillagesByPinCode(res.address.pinCode, res.address.vtc)
          }
        }
        if (this.draftedBiometricUpdate.length !== 0) {
          this.updatedFields.biometric = true;
          let res = this.draftedBiometricUpdate[0]
          this.updateForm.patchValue({
            aadhaarNumber: res.aadhaarId,
            aadhaarName: res.fullName
          })
        }
      }
    }
  }

  UpdateNameRecord1() {
    if (this.updateNameRecord.length !== 0) {
      this.updatedFields.name = true;
      let res = this.updateNameRecord[0]
      this.updateForm.patchValue({
        aadhaarNumber: res.aadhaarId,
        aadhaarName: res.fullName,
        newName: res.newValue,
      })
    }
  }
  updateDobRecord1() {
    if (this.updateDobRecord.length !== 0) {
      this.updatedFields.dob = true;
      let res = this.updateDobRecord[0]
      this.updateForm.patchValue({
        aadhaarNumber: res.aadhaarId,
        aadhaarName: res.fullName,
        newDob: res.newValue,
      })
    }
  }
  updateGenderRecord1() {
    if (this.updateGenderRecord.length !== 0) {
      this.updatedFields.gender = true;
      let res = this.updateGenderRecord[0]
      this.updateForm.patchValue({
        aadhaarNumber: res.aadhaarId,
        aadhaarName: res.fullName,
        newGender: res.newValue,
      })
    }
  }
  updateMobileRecord1() {
    if (this.updateMobileRecord.length !== 0) {
      this.updatedFields.mobile = true;
      let res = this.updateMobileRecord[0]
      this.updateForm.patchValue({
        aadhaarNumber: res.aadhaarId,
        aadhaarName: res.fullName,
        newNumber: res.newValue,
      })
    }
  }
  updateEmailRecord1() {
    if (this.updateEmailRecord.length !== 0) {
      this.updatedFields.email = true;
      let res = this.updateEmailRecord[0]
      this.updateForm.patchValue({
        aadhaarNumber: res.aadhaarId,
        aadhaarName: res.fullName,
        newEmail: res.newValue,
      })
    }
  }
  updateAddressRecord1() {
    if (this.updateAddressRecord.length !== 0) {
      this.updatedFields.address = true;
      let res = this.updateAddressRecord[0];
      this.addressRecord = (res.address) ? res.address : (res.newValue) ? JSON.parse(res.newValue) : '';
      this.updateForm.patchValue({
        aadhaarNumber: (res.aadhaarId ? res.aadhaarId : ''),
        aadhaarName: (res.fullName) ? res.fullName : '',
        area: (this.addressRecord) ? this.addressRecord.area : '',
        pinCode: (this.addressRecord) ? this.addressRecord.pinCode : '',
        careOfName: (this.addressRecord) ? this.addressRecord.careOfName : '',
        houseNo: (this.addressRecord) ? this.addressRecord.houseNo : '',
        streetNo: (this.addressRecord) ? this.addressRecord.street : '',
        landmark: (this.addressRecord) ? this.addressRecord.landMark : '',

      })
      if (this.addressRecord.pinCode) {
        this.getVillagesByPinCode(this.addressRecord.pinCode, this.addressRecord.vtc)
      }
    }
  }
  updateBiometricRecord1() {
    if (this.updateBiometricRecord.length !== 0) {
      this.updatedFields.biometric = true;
      let res = this.updateBiometricRecord[0]
      this.updateForm.patchValue({
        aadhaarNumber: res.aadhaarId,
        aadhaarName: res.fullName
      })
    }
  }
  loadVillages() {
    this.updateForm.get('pinCode').valueChanges
      .subscribe(pincode => {
        if (pincode && pincode.length === 6) {
          this.getVillagesByPinCode(pincode, '')
        }
      });
  }

  getUpdatedData(aadharId) {
    this.loader = true
    this._userService.getUpdateAadharPreview(aadharId).subscribe((res: any) => {
      this.loader = false;
      if (res) {
        this.updatedAadhaarRecord = res;
        this.updateForm.patchValue({
          aadhaarNumber: res.AadhaarId,
          aadhaarName: res.fullName,
          newDob: res.dob && res.dob,
          newGender: res.gender && res.gender,
          newNumber: res.mobile && res.mobile,
          newEmail: res.email && res.email,
          newName: res.name && res.name,
          pinCode: res.address && res.address.pinCode
        })

      }
    })
  }
  getVillagesByPinCode(code, name) {
    this.loader = true
    this._userService.getVillagesByPinCode(code).subscribe((res: any) => {
      this.loader = false
      if (res && !res.error) {
        this.villages = [];
        this.villages = res;
        let filterVillage: any
        if (name) {
          filterVillage = this.villages.find((item: any) => item.villageName.toUpperCase() === name.toUpperCase());
        }
        if (filterVillage) {
          this.updateForm.patchValue({ village: filterVillage.villageCode })
          this.villageName = filterVillage.villageName;
          this.getSubDistrictByCode(filterVillage.subDistrictCode)
        } else {
          this.updateForm.patchValue({ village: res[0].villageCode })
          this.villageName = res[0].villageName;
          this.getSubDistrictByCode(res[0].subDistrictCode)
        }
      } else if (res.error) {
        this._alertService.error("Something went wrong try again after sometime");
        this.villages = [];
        this.villageName = '';
        this.updateForm.patchValue({ postOffice: '' });
        this.updateForm.patchValue({ district: '' });
        this.updateForm.patchValue({ state: '' });
      }
    }, err => {
      this.loader = false
      //this._alertService.error(err.statusText)
    })
  }
  getSubDistrictByCode(code) {
    this._userService.getSubDistrictByCode(code).subscribe((res: any) => {
      if (res) {
        this.loader = false
        this.subDistricts = res;
        this.updateForm.patchValue({
          postOffice: res[0].subdistrictName
        })
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
        this.updateForm.patchValue({
          district: res[0].districtName,
        })
        this.getStateByCode(res[0].stateCode)
      }
    }, err => {
      this.loader = false
      // this._alertService.error(err.statusText)
    })
  }


  getStateByCode(code) {
    this._userService.getStateByCode(code).subscribe((res: any) => {
      if (res) {
        this.loader = false
        this.updateForm.patchValue({
          state: res.stateName,
        })
      }
    }, err => {
      this.loader = false
      //this._alertService.error( err.statusText)
    })
  }

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
  setUserCategoryValidators() {
    const newAge = this.updateForm.get('newAge');
    const oldAge = this.updateForm.get('oldAge');
    const oldDob = this.updateForm.get('oldDob');
    const newDob = this.updateForm.get('newDob');
    this.updateForm.get('typeOfId').valueChanges
      .subscribe(typeOfId => {
        if (typeOfId === 'dob') {
          newDob.setValidators([Validators.required]);
          oldDob.setValidators([Validators.required])
          newAge.setValidators(null);
          newAge.setValue(null);
          oldAge.setValidators(null);
          oldAge.setValue(null)
        }
        if (typeOfId === 'age') {
          newDob.setValidators(null);
          newDob.setValue(null);
          oldDob.setValidators(null);
          oldDob.setValue(null);
          newAge.setValidators([Validators.required]);
          oldAge.setValidators([Validators.required]);

        }
        oldAge.updateValueAndValidity();
        newAge.updateValueAndValidity();
        newDob.updateValueAndValidity();
        oldDob.updateValueAndValidity();
      });
  }

  handleBackNavigation() {
    if (JSON.parse(localStorage.getItem('backToChoose'))) {
      this.router.navigate([APPPOINTEMENT.ROUTERLINKS.CHOOSE_UPDATE]);
      localStorage.removeItem('backToChoose');
      localStorage.removeItem('updateAadharRecord');
    } else {
      this.router.navigate([APPPOINTEMENT.ROUTERLINKS.DASHBOARD]);
      localStorage.setItem('draftActive', 'true');
    }
  }
  updateAadhar(obj) {
    this.loader = true;
    this._userService.updateAadharRecord(obj).subscribe((res: any) => {
      this.loader = false;
      if (res[0].response) {
        localStorage.setItem('updateAadharRecord', JSON.stringify(res))
        localStorage.removeItem('DraftedUpdated')
        this.router.navigate([APPPOINTEMENT.ROUTERLINKS.UPDATE_REVIEW])
      }
      res.forEach((r: any) => {
        if (!r.response) {
          this._alertService.error(r.errorMessage)
        }
      })
    }, err => {
      this.loader = false;
      this._alertService.error(err.statusText);
    })
  }
  get f() { return this.updateForm.controls; }

  onSubmit(f) {
    this.form1 = f
    this.submitted = true;
    if (this.updateForm.invalid) {
      return;
    }
    let obj = [];
    if (this.updatedFields.name) {
      let name: any = {
        "fullName": f.aadhaarName.value,
        "oldValue": '',
        "newValue": f.newName.value,
        "updateType": "NAME",
        "aadhaarId": f.aadhaarNumber.value,
        "loggedInMobile": this.loggedInMobile,
        "status": "DRAFT",
        "enrolmentType": null
      }
      obj.push(name)
    }
    if (this.updatedFields.dob) {
      let dob: any = {
        "fullName": f.aadhaarName.value,
        "oldValue": '',
        "newValue": f.newDob.value,
        "updateType": "DOB",
        "aadhaarId": f.aadhaarNumber.value,
        "loggedInMobile": this.loggedInMobile,
        "status": "DRAFT",
        "enrolmentType": null
      }
      obj.push(dob)
    }
    if (this.updatedFields.gender) {
      let gender: any = {
        "fullName": f.aadhaarName.value,
        "oldValue": '',
        "newValue": f.newGender.value,
        "updateType": "GENDER",
        "aadhaarId": f.aadhaarNumber.value,
        "loggedInMobile": this.loggedInMobile,
        "status": "DRAFT",
        "enrolmentType": null
      }
      obj.push(gender)
    }
    if (this.updatedFields.mobile) {
      let mobile: any = {
        "fullName": f.aadhaarName.value,
        "oldValue": '',
        "newValue": f.newNumber.value,
        "updateType": "MOBILE",
        "aadhaarId": f.aadhaarNumber.value,
        "loggedInMobile": this.loggedInMobile,
        "status": "DRAFT",
        "enrolmentType": null
      }
      obj.push(mobile)
    }
    if (this.updatedFields.email) {
      let email: any = {
        "fullName": f.aadhaarName.value,
        "oldValue": '',
        "newValue": f.newEmail.value,
        "updateType": "EMAIL",
        "aadhaarId": f.aadhaarNumber.value,
        "loggedInMobile": this.loggedInMobile,
        "status": "DRAFT",
        "enrolmentType": null
      }
      obj.push(email)
    }
    if (this.updatedFields.biometric) {
      let biometric: any = {
        "updateType": "BIOMETRIC",
        "fullName": f.aadhaarName.value,
        "aadhaarId": f.aadhaarNumber.value,
        "loggedInMobile": this.loggedInMobile,
        "status": "DRAFT",
        "enrolmentType": null,
        "newValue": (this.aadhaarObject) ? this.aadhaarObject.biometric : (this.updateBiometricRecord.length > 0) ? this.updateBiometricRecord[0].newValue : '',
        "oldValue": null
      }
      if (this.bioFlag) {
        obj.push(biometric)
        this.bioFlag = false;
      }
    }
    if (this.updatedFields.address) {
      let address: any = {
        "fullName": f.aadhaarName.value,
        "oldValue": "",
        "address": {
          "careOf": f.careOf.value,
          "careOfName": f.careOfName.value,
          "houseNo": f.houseNo.value,
          "street": f.streetNo.value,
          "landMark": f.landmark.value,
          "area": f.area.value,
          "vtc": this.villageName,
          "subdistrict": f.postOffice.value,
          "district": f.district.value,
          "state": f.state.value,
          "pinCode": f.pinCode.value
        },
        "updateType": "ADDRESS",
        "aadhaarId": f.aadhaarNumber.value,
        "loggedInMobile": this.loggedInMobile,
        "status": "DRAFT",
        "enrolmentType": null
      }
      obj.push(address)
    }

    if (this.aadhaarObject && this.aadhaarObject.age && this.aadhaarObject.age < 5) {
      let biometric: any = {
        "updateType": "BIOMETRIC",
        "fullName": f.aadhaarName.value,
        "aadhaarId": f.aadhaarNumber.value,
        "loggedInMobile": this.loggedInMobile,
        "status": "DRAFT",
        "enrolmentType": null,
        "newValue": this.aadhaarObject.biometric,
        "oldValue": null
      }
      if (this.bioFlag) {
        obj.push(biometric)
        this.bioFlag = false;
      }
    }

    if (this.draftedUpdated && this.draftedUpdated.length !== 0) {
      this.updateDraftedAadhaar()
    }
    if (this.updatedAadhaarRecord) {
      this.updateReviewAadhaarPage()
    }
    if (!this.draftedUpdated && !this.updatedAadhaarRecord) {
      this.updateAadhar(obj)
    }
  }
  updateDraftedAadhaar() {
    let obj: any = [];
    if (this.draftedNameUpdate.length !== 0 || this.updatedFields.name) {
      this.draftedNameUpdate[0].newValue = this.form1.newName.value
      this.draftedNameUpdate[0].aadhaarId = this.form1.aadhaarNumber.value
      this.draftedNameUpdate[0].aadhaarName = this.form1.aadhaarName.value
      this.draftedNameUpdate[0].fullName = this.form1.aadhaarName.value
      this.draftedNameUpdate[0].status = 'DRAFT'
      obj.push(this.draftedNameUpdate[0])
    }
    if (this.draftedGenderUpdate.length !== 0 || this.updatedFields.gender) {
      this.draftedGenderUpdate[0].newValue = this.form1.newGender.value
      this.draftedGenderUpdate[0].aadhaarId = this.form1.aadhaarNumber.value
      this.draftedGenderUpdate[0].aadhaarName = this.form1.aadhaarName.value
      this.draftedGenderUpdate[0].fullName = this.form1.aadhaarName.value
      this.draftedGenderUpdate[0].status = 'DRAFT'
      obj.push(this.draftedGenderUpdate[0])
    }
    if (this.draftedDobUpdate.length !== 0 || this.updatedFields.dob) {
      this.draftedDobUpdate[0].newValue = this.form1.newDob.value
      this.draftedDobUpdate[0].aadhaarId = this.form1.aadhaarNumber.value
      this.draftedDobUpdate[0].aadhaarName = this.form1.aadhaarName.value
      this.draftedDobUpdate[0].fullName = this.form1.aadhaarName.value
      this.draftedDobUpdate[0].status = 'DRAFT'
      obj.push(this.draftedDobUpdate[0])
    }
    if (this.draftedMobileUpdate.length !== 0 || this.updatedFields.mobile) {
      if (this.draftedMobileUpdate.length !== 0) {
        this.draftedMobileUpdate[0].newValue = this.form1.newNumber.value
        this.draftedMobileUpdate[0].aadhaarId = this.form1.aadhaarNumber.value
        this.draftedMobileUpdate[0].aadhaarName = this.form1.aadhaarName.value
        this.draftedMobileUpdate[0].fullName = this.form1.aadhaarName.value
        this.draftedMobileUpdate[0].status = 'DRAFT'
        obj.push(this.draftedMobileUpdate[0])
      }
    }
    if (this.draftedEmailUpdate.length !== 0 || this.updatedFields.email) {
      this.draftedEmailUpdate[0].newValue = this.form1.newEmail.value
      this.draftedEmailUpdate[0].aadhaarId = this.form1.aadhaarNumber.value
      this.draftedEmailUpdate[0].aadhaarName = this.form1.aadhaarName.value
      this.draftedEmailUpdate[0].fullName = this.form1.aadhaarName.value
      this.draftedEmailUpdate[0].status = 'DRAFT'
      obj.push(this.draftedEmailUpdate[0])
    }
    if (this.draftedBiometricUpdate.length !== 0 || this.updatedFields.biometric) {
      this.draftedBiometricUpdate[0].aadhaarId = this.form1.aadhaarNumber.value;
      this.draftedBiometricUpdate[0].aadhaarName = this.form1.aadhaarName.value;
      this.draftedBiometricUpdate[0].status = 'DRAFT'
      obj.push(this.draftedBiometricUpdate[0])
    }
    this.modifyAadhaar(obj)
  }
  updateReviewAadhaarPage() {
    this.loader = true;
    let obj: any = [];
    if (this.updateNameRecord.length !== 0 && this.updatedFields.name) {
      this.updateNameRecord[0].newValue = this.form1.newName.value
      this.updateNameRecord[0].aadhaarId = this.form1.aadhaarNumber.value
      this.updateNameRecord[0].aadhaarName = this.form1.aadhaarName.value
      this.updateNameRecord[0].status = 'DRAFT'
      obj.push(this.updateNameRecord[0])
    }
    if (this.updateGenderRecord.length !== 0 && this.updatedFields.gender) {
      this.updateGenderRecord[0].newValue = this.form1.newGender.value
      this.updateGenderRecord[0].aadhaarId = this.form1.aadhaarNumber.value
      this.updateGenderRecord[0].aadhaarName = this.form1.aadhaarName.value
      this.updateGenderRecord[0].status = 'DRAFT'
      obj.push(this.updateGenderRecord[0])
    }
    if (this.updateDobRecord.length !== 0 && this.updatedFields.dob) {
      this.updateDobRecord[0].newValue = this.form1.newDob.value
      this.updateDobRecord[0].aadhaarId = this.form1.aadhaarNumber.value
      this.updateDobRecord[0].aadhaarName = this.form1.aadhaarName.value
      this.updateDobRecord[0].status = 'DRAFT'
      obj.push(this.updateDobRecord[0])
    }
    if (this.updateEmailRecord.length !== 0 && this.updatedFields.email) {
      this.updateEmailRecord[0].newValue = this.form1.newEmail.value
      this.updateEmailRecord[0].aadhaarId = this.form1.aadhaarNumber.value
      this.updateEmailRecord[0].aadhaarName = this.form1.aadhaarName.value
      this.updateEmailRecord[0].status = 'DRAFT'
      obj.push(this.updateEmailRecord[0])
    }
    if (this.updateMobileRecord.length !== 0 && this.updatedFields.mobile) {
      this.updateMobileRecord[0].newValue = this.form1.newNumber.value
      this.updateMobileRecord[0].aadhaarId = this.form1.aadhaarNumber.value
      this.updateMobileRecord[0].aadhaarName = this.form1.aadhaarName.value
      this.updateMobileRecord[0].status = 'DRAFT'
      obj.push(this.updateMobileRecord[0])
    }
    if (this.updateAddressRecord.length !== 0 && this.updatedFields.address) {
      this.updateAddressRecord[0].address = {}
      this.updateAddressRecord[0].status = 'DRAFT'
      this.updateAddressRecord[0].address.careOf = "C/O"
      this.updateAddressRecord[0].address.careOfName =  this.form1.careOfName.value
      this.updateAddressRecord[0].address.area = this.form1.area.value
      this.updateAddressRecord[0].address.houseNo = this.form1.houseNo.value
      this.updateAddressRecord[0].address.street = this.form1.streetNo.value
      this.updateAddressRecord[0].address.landMark = this.form1.landmark.value
      this.updateAddressRecord[0].address.vtc = this.villageName
      this.updateAddressRecord[0].address.subdistrict = this.form1.postOffice.value
      this.updateAddressRecord[0].address.district = this.form1.district.value
      this.updateAddressRecord[0].address.state = this.form1.state.value
      this.updateAddressRecord[0].address.pinCode = this.form1.pinCode.value
      this.updateAddressRecord[0].aadhaarId = this.form1.aadhaarNumber.value
      this.updateAddressRecord[0].aadhaarName = this.form1.aadhaarName.value
      // let address = JSON.parse(this.updateAddressRecord[0].response.newValue)
      delete this.updateAddressRecord[0]["newValue"];
      // this.updateAddressRecord[0].response.address = address
      obj.push(this.updateAddressRecord[0])
    }
    if (this.updateBiometricRecord.length !== 0 || this.updatedFields.biometric) {
      let payload = {
        fullName: '',
        newValue: '',
        updateType: '',
        aadhaarId: '',
        status : '',
        id:'',
        loggedInMobile: ''
      };
      payload.aadhaarId = this.form1.aadhaarNumber.value;
      payload.fullName = this.form1.aadhaarName.value;
      payload.newValue = '1';
      payload.status = this.updateBiometricRecord[0].status;
      payload.updateType = this.updateBiometricRecord[0].updateType;
      payload.id = this.updateBiometricRecord[0].id;
      payload.loggedInMobile = this.updateBiometricRecord[0].loggedInMobile;
      // this.updateBiometricRecord[0].response.aadhaarId = this.form1.aadhaarNumber.value;
      // this.updateBiometricRecord[0].response.aadhaarName = this.form1.aadhaarName.value;
      this.updateBiometricRecord[0].status = 'DRAFT'
      obj.push(payload)
    }
    this.modifyAadhaar(obj)
  }

  modifyAadhaar(obj) {
    this._userService.updateReviewAadhaarRecord(obj).subscribe((res: any) => {
      this.loader = false;
      // if (res) {
      //   this.router.navigate([APPPOINTEMENT.ROUTERLINKS.UPDATE_REVIEW])
      // }
      if (res[0].response) {
        localStorage.setItem('updateAadharRecord', JSON.stringify(res))
        localStorage.removeItem('DraftedUpdated')
        this.router.navigate([APPPOINTEMENT.ROUTERLINKS.UPDATE_REVIEW])
        localStorage.removeItem('backToChoose');
      }
      res.forEach((r: any) => {
        if (!r.response) {
          this._alertService.error(r.errorMessage)
        }
      })
    }, err => {
      this.loader = false;
      //this._alertService.error(err.statusText)
    })
  }
  keyPress1(event: any) {
    this._utilService.eventToAcceptOnlyNumbers(event)
  }
  keyPress(event: any) {
    this._utilService.keyPress(event)
  }

  validateEmail(event) {
    if (!(this._utilService.validateEmail(event.target.value))){
      alert("Enter Valid Email ID");
          this.updateForm.patchValue({
            newEmail: ''
          })
    }
  }
}
