import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APPPOINTEMENT } from '../../../app-constants';
import { UserService, AlertService } from '../../../services/index';
import { Location } from '@angular/common'
@Component({
  selector: 'app-review-enrollment',
  templateUrl: './review-enrollment.component.html',
  styleUrls: ['./review-enrollment.component.scss']
})
export class ReviewEnrollmentComponent implements OnInit {

  constructor(private router: Router, private _userService: UserService, private location: Location, private _alertService: AlertService) { }
  appointment: any = APPPOINTEMENT
  addressTab: boolean;
  photoTab: boolean;
  reviewTab: boolean;
  userData: any = {};
  enrollmentId: any;
  loader: boolean = true;
  bodyHeight: any = document.body.clientHeight;
  isChecked: boolean = false;
  ngOnInit() {
    let tabs = {
      "addressTab": false,
      "photoTab": true,
      "reviewTab": false
    }
    localStorage.setItem('tabs', JSON.stringify(tabs));
    this.enrollmentId = JSON.parse(localStorage.getItem('userId'))
    if (this.enrollmentId) {
      this.getEnrolment()
    } else {
      this.loader = false
    }
  }

  getEnrolment() {
    this._userService.getEnrolment(this.enrollmentId).subscribe((response: any) => {
      this.loader = false;
      if (response && response.residentEnrolmentEntity) {
        let res = response.residentEnrolmentEntity;
        let hofRes = response.headOfFamilyEntity
        this.userData = {
          "id": this.enrollmentId,
          "fullName": res.fullName,
          "dob": res.dob,
          "age": res.age,
          "gender": res.gender,
          "careOfType": res.careOfType,
          "careOfName": res.careOfName,
          "houseNO": res.houseNO,
          "adrs1": res.adrs1,
          "adrs2": res.adrs2,
          "landmark": res.landMark,
          "vtc": res.vtc,
          "district": res.district,
          "postOfc": res.postOfc,
          "policeOfc": res.policeOfc,
          "mobileNo": res.mobileNo,
          "email": res.email,
          "state": res.state,
          "pinCode": res.pinCode,
          "enrolmentStatus": 'SUBMIT',
          "enrolmentType": "NEW",
          "hofEnrol": res.hofEnrol,
          "hofRel_type": hofRes && hofRes.hofRelType,
          "hofRelativeName": hofRes && hofRes.relativeName,
          "hofEnrolmentId_rel": hofRes && hofRes.enrolmentIdRel,
          "hofAadharId_rel": hofRes && hofRes.aadharIdRel,
          "consentGiven": this.isChecked ? 1 : 0
        }
      }
    }, err => {
      this.loader = false
      //this._alertService.error(err.statusText)
    })
  }
  handleNavigation(type) {
    switch (type) {
      case "basic": {
        this.router.navigate([APPPOINTEMENT.ROUTERLINKS.BASIC_ENROLLMENT]);
        break;
      }
      case "address": {
        this.router.navigate([APPPOINTEMENT.ROUTERLINKS.ADDRESS_ENROLLMENT, this.userData.hofEnrol]);
        break;
      }
      default: {
        //statements; 
        break;
      }
    }
  }
  handleSubmit() {
    this.loader = true;
    this._userService.updateEnrolment(this.userData, this.enrollmentId).subscribe((res: any) => {
      if (res) {
        this.loader = false;
        localStorage.setItem("appointmentId", JSON.stringify(res.appointmentId))
        this.router.navigate([APPPOINTEMENT.ROUTERLINKS.SUBMISSION_ENROLMENT, res.appointmentId]);
      }
    }, err => {
      this.loader = false
      //this._alertService.error(err.statusText)
    })
  }
  handleBackNavigation() {
    this.router.navigate([APPPOINTEMENT.ROUTERLINKS.ADDRESS_ENROLLMENT, this.userData.hofEnrol]);
  }
  checkValue() {
    this.isChecked = !this.isChecked
  }
}
