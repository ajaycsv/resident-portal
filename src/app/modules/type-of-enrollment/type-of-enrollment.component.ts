import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APPPOINTEMENT } from '../../app-constants';
import { UserService, AlertService } from '../../services/index';

@Component({
  selector: 'app-type-of-enrollment',
  templateUrl: './type-of-enrollment.component.html',
  styleUrls: ['./type-of-enrollment.component.scss']
})
export class TypeOfEnrollmentComponent implements OnInit {
  routes: any = APPPOINTEMENT;
  bodyHeight: any = document.body.clientHeight
  enrolmentId : any
  loader: false
  userData: any;
  userHofData: any;
  constructor(private _router: Router, private userService: UserService, private alertService: AlertService) { }

  ngOnInit() {
     this.getUser()
  }
  getUser() {
    this.enrolmentId = JSON.parse(localStorage.getItem('userId'))
    this.userService.getEnrolment(this.enrolmentId).subscribe((res: any) => {
      this.loader = false;
      if (res) {
        this.userData = res.residentEnrolmentEntity ? res.residentEnrolmentEntity : null;
        this.userHofData = res.headOfFamilyEntity ? res.headOfFamilyEntity : null;
        }
    }, err => {
      this.loader = false;
      // this.alertService.error(err.status + '-' + err.statusText)
    });
  }
  updateUser(obj,id) {  
    // this.userService.updateEnrolment(obj, this.enrolmentId).subscribe((res: any) => {
      this.userService.getEnrolment(id).subscribe((res:any) => {
      if (res) {
        this.loader = false;
        this._router.navigate([APPPOINTEMENT.ROUTERLINKS.ADDRESS_ENROLLMENT,id])
      }
    }, error => {
      this.loader = false;
      // this.alertService.error(error.status + '-' + error.statusText)
    })
  }
  navigateToPage(type) {
    switch (type) {
      case "dashboard": {
        this._router.navigate([APPPOINTEMENT.ROUTERLINKS.DASHBOARD]);
        break;
      }
      case "enroll": {
        this._router.navigate([APPPOINTEMENT.ROUTERLINKS.BASIC_ENROLLMENT]);
        break;
      }
      default: {
        //statements; 
        break;
      }
    }
  }

  navigationToEnrolment(id) {
    localStorage.setItem('hofEnrol',JSON.stringify(id))
    let obj: any= {};
    if (this.userData) {
      obj.fullName = this.userData.fullName,
      obj.dob = this.userData.dob,
      obj.gender= this.userData.gender,
      obj.age = this.userData.age,
      obj.enrolmentType =  "NEW",
      obj.enrolmentStatus = "DRAFT",
      obj.loggedInMobile =  JSON.parse(localStorage.getItem('loggedInMobile')),
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
      obj.pageNo = id == 1 ? 'HOF' : 'DOC';
      obj.hofEnrol = id
      if (this.userHofData && id == 1) {
        obj.hofRel_type = this.userHofData.hofRelType;
        obj.hofRelativeName = this.userHofData.relativeName;
        obj.hofEnrolmentId_rel = this.userHofData.enrolmentIdRel;
        obj.hofAadharId_rel = this.userHofData.aadharIdRel;
      }
      this.updateUser(obj,id);
    }
  }
}
