import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APPPOINTEMENT } from '../../../app-constants';
import { UserService, AlertService, UtilService } from '../../../services/index';
@Component({
  selector: 'app-update-review',
  templateUrl: './update-review.component.html',
  styleUrls: ['./update-review.component.scss']
})
export class UpdateReviewComponent implements OnInit {
  appointment: any = APPPOINTEMENT
  aadharId: any;
  loader: boolean = false;
  updatedRecord: any = {};
  updatedAadhaarRecord: any;
  updateNameRecord: any = {};
  updateDobRecord: any = {};
  updateAgeRecord: any = {};
  updateGenderRecord: any = {};
  updateAddressRecord: any = {};
  updateMobileRecord: any = {};
  updateEmailRecord: any = {};
  updateBiometric: any = {};
  addressRecord: any = {};
  isChecked: boolean = false;
  draftedUpdated: any = []
  draftedNameUpdate: any = {};
  draftedGenderUpdate: any = {};
  draftedDobUpdate: any = {};
  draftedMobileUpdate: any = {};
  draftedEmailUpdate: any = {};
  draftedAddressUpdate: any = {};
  draftedBiometricUpdate: any = {}
  constructor(private _userService: UserService, private _alertService: AlertService, private _utilService: UtilService, private _router: Router) { }

  ngOnInit() {
    this.updatedAadhaarRecord = JSON.parse(localStorage.getItem('updateAadharRecord'))
    if (this.updatedAadhaarRecord && this.updatedAadhaarRecord.length !== 0) {
      this.updateNameRecord = this.updatedAadhaarRecord.filter(app => app.response.updateType.toUpperCase() === 'NAME');
      this.updateDobRecord = this.updatedAadhaarRecord.filter(app => app.response.updateType.toUpperCase() === 'DOB');
      this.updateGenderRecord = this.updatedAadhaarRecord.filter(app => app.response.updateType.toUpperCase() === 'GENDER');
      this.updateMobileRecord = this.updatedAadhaarRecord.filter(app => app.response.updateType.toUpperCase() === 'MOBILE');
      this.updateEmailRecord = this.updatedAadhaarRecord.filter(app => app.response.updateType.toUpperCase() === 'EMAIL');
      this.updateAddressRecord = this.updatedAadhaarRecord.filter(app => app.response.updateType.toUpperCase() === 'ADDRESS');
      this.updateBiometric = this.updatedAadhaarRecord.filter(app => app.response.updateType.toUpperCase() === 'BIOMETRIC');
      if (this.updateAddressRecord.length !== 0) {
        this.addressRecord = JSON.parse(this.updateAddressRecord[0].response.newValue)
      }
    }
  }
  getUpdateAadharRecord() {
    this.loader = true
    this._userService.getUpdateAadharPreview(this.aadharId).subscribe((res: any) => {
      this.loader = false;
      if (res) {
        this.updatedRecord = res;
      }
    }, err => {
      this.loader = false
      //this._alertService.error(err.statusText)
    })
  }

  updateReviewAadhaarPage() {
    this.loader = true;
    let obj: any = [];
    if (this.updateNameRecord.length && this.updateNameRecord.length !== 0) {
      this.updateNameRecord[0].response.status = 'SUBMIT';
      (this.updateNameRecord[0].response.createdAt) ? delete this.updateNameRecord[0].response.createdAt : '';
      (this.updateNameRecord[0].response.updatedAt) ? delete this.updateNameRecord[0].response.updatedAt : '';
      obj.push(this.updateNameRecord[0].response)
    }
    if (this.updateGenderRecord.length && this.updateGenderRecord.length !== 0) {
      this.updateGenderRecord[0].response.status = 'SUBMIT';
      (this.updateGenderRecord[0].response.createdAt) ? delete this.updateGenderRecord[0].response.createdAt : '';
      (this.updateGenderRecord[0].response.updatedAt) ? delete this.updateGenderRecord[0].response.updatedAt : '';
      obj.push(this.updateGenderRecord[0].response)
    }
    if (this.updateDobRecord.length && this.updateDobRecord.length !== 0) {
      this.updateDobRecord[0].response.status = 'SUBMIT';
      (this.updateDobRecord[0].response.createdAt) ? delete this.updateDobRecord[0].response.createdAt : '';
      (this.updateDobRecord[0].response.updatedAt) ? delete this.updateDobRecord[0].response.updatedAt : '';
      obj.push(this.updateDobRecord[0].response)
    }
    if (this.updateEmailRecord.length && this.updateEmailRecord.length !== 0) {
      this.updateEmailRecord[0].response.status = 'SUBMIT';
      (this.updateEmailRecord[0].response.createdAt) ? delete this.updateEmailRecord[0].response.createdAt : '';
      (this.updateEmailRecord[0].response.updatedAt) ? delete this.updateEmailRecord[0].response.updatedAt : '';
      obj.push(this.updateEmailRecord[0].response)
    }
    if (this.updateMobileRecord.length && this.updateMobileRecord.length !== 0) {
      this.updateMobileRecord[0].response.status = 'SUBMIT';
      (this.updateMobileRecord[0].response.createdAt) ? delete this.updateMobileRecord[0].response.createdAt : '';
      (this.updateMobileRecord[0].response.updatedAt) ? delete this.updateMobileRecord[0].response.updatedAt : '';
      obj.push(this.updateMobileRecord[0].response)
    }
    if (this.updateBiometric.length && this.updateBiometric.length !== 0) {
      this.updateBiometric[0].response.status = 'SUBMIT';
      (this.updateBiometric[0].response.createdAt) ? delete this.updateBiometric[0].response.createdAt : '';
      (this.updateBiometric[0].response.updatedAt) ? delete this.updateBiometric[0].response.updatedAt : '';
      obj.push(this.updateBiometric[0].response)
    }
    if (this.updateAddressRecord.length && this.updateAddressRecord.length !== 0) {
      this.updateAddressRecord[0].response.status = 'SUBMIT';
      (this.updateAddressRecord[0].response.createdAt) ? delete this.updateAddressRecord[0].response.createdAt : '';
      (this.updateAddressRecord[0].response.updatedAt) ? delete this.updateAddressRecord[0].response.updatedAt : '';
      let address = JSON.parse(this.updateAddressRecord[0].response.newValue)
      delete this.updateAddressRecord[0].response["newValue"];
      this.updateAddressRecord[0].response.address = address
      obj.push(this.updateAddressRecord[0].response)
    }
    this._userService.updateReviewAadhaarRecord(obj).subscribe((res: any) => {
      this.loader = false;
      if (res.length && res) {
        localStorage.setItem("appointmentId", JSON.stringify(res[0].response.appointmentId))
        this._router.navigate([APPPOINTEMENT.ROUTERLINKS.SUBMISSION_ENROLMENT, res[0].response.appointmentId]);
        //localStorage.removeItem('updateAadharRecord')
      }
    }, err => {
      this.loader = false
      //this._alertService.error(err.statusText)
    })
  }
  handleEdit() {
    this._router.navigate([APPPOINTEMENT.ROUTERLINKS.UPDATE_ENROLMENT]);
  }
  handleSubmit() {
    this.updateReviewAadhaarPage()
  }

}
