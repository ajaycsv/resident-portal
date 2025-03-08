import { Component, OnInit, AfterViewInit, ElementRef, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { APPPOINTEMENT } from '../../app-constants';
import { DashboardService, UtilService, AlertService, EnrollmentCenterSearchService } from '../../services/index';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import * as _ from "lodash";
import * as moment from 'moment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  routes: any = APPPOINTEMENT;
  applications: any = [];
  updatedApplications: any = [];
  submittedEnrolments: any = [];
  draftedEnrolments: any = [];
  submittedUpdateEnrollments: any = [];
  submittedUpdateData: any = [];
  draftedUpdatedEnrollments: any = [];
  draftedUpdatedData: any = [];
  loader: boolean = true;
  today: any = new Date();
  dob: any;
  timeDifference: any;
  age: any;
  bodyHeight: any = document.body.clientHeight;
  elementRef: ElementRef;
  submitted: any = [];
  drafted: any = [];
  enrollmentCenterDetails = {
    ecName: '',
    ecAddress: '',
    date: '',
    time: ''
  }
  modalRef: BsModalRef;
  draftActive: boolean = false;
  constructor(private _router: Router, private _dashboardService: DashboardService, private _alertService: AlertService, private _enrollmetService: EnrollmentCenterSearchService, private modalService: BsModalService) { }

  ngOnInit() {
    this.draftActive = JSON.parse(localStorage.getItem('draftActive'));
    localStorage.removeItem('updateAadharRecord')
    this.getApplications();
    this.getUpdateApplications();
    localStorage.removeItem("resheduleData");
    // history.pushState(null, null, this._router.url);
    // window.onpopstate = function () {
    //   history.go(1);
    // };
    localStorage.removeItem('draftActive');
    localStorage.removeItem('slot');
    localStorage.removeItem('selectedCenter');
    localStorage.removeItem('enrolmenCenters');
    localStorage.removeItem('fields');
    localStorage.removeItem('appointmentType');
    localStorage.removeItem('appointmentId');
    localStorage.removeItem('DraftedUpdated');
    localStorage.removeItem('backToChoose');
    localStorage.removeItem('aadharName');
    localStorage.removeItem('tabs');
    localStorage.removeItem('userId');
    localStorage.removeItem('hofEnrol');
    localStorage.removeItem('BookingDataInfo');
  }

  getApplications() {
    this.loader = true;
    let mobileNo = JSON.parse(localStorage.getItem('loggedInMobile'))
    this._dashboardService.getApplications(mobileNo).subscribe((res: any) => {
      if (res && res.message) {
        this.applications = [];
      } else {
        this.applications = res;
        this.submittedEnrolments = this.applications.filter(app => app.enrolmentStatus.toUpperCase() === 'SUBMIT' || app.enrolmentStatus.toUpperCase() === 'BOOKED')
        this.draftedEnrolments = this.applications.filter(app => app.enrolmentStatus.toUpperCase() === 'DRAFT')
      }
      this.loader = false;
    }, err => {
      this.loader = false;
      //this._alertService.error(err.statusText)
    })
  }

  getUpdateApplications() {
    this.loader = true
    let mobileNo = JSON.parse(localStorage.getItem('loggedInMobile'))
    this._dashboardService.getUpdateAadhaarRecords(mobileNo).subscribe((res: any) => {
      if (res && res.message) {
        this.loader = false;
        this.updatedApplications = [];
      } else {
        this.updatedApplications = res;
        // this.submitted = this.updatedApplications.filter(app => app.status.toUpperCase() === 'SUBMIT' || app.status.toUpperCase() === 'BOOKED');
        this.submittedUpdateEnrollments = this.updatedApplications.filter(app => app.status.toUpperCase() === 'SUBMIT' || app.status.toUpperCase() === 'BOOKED');
        this.draftedUpdatedEnrollments = this.updatedApplications.filter(app => app.status.toUpperCase() === 'DRAFT');
        if (this.draftedUpdatedEnrollments && this.draftedUpdatedEnrollments.length > 0) {
          this.sortWithAadhaarId(this.draftedUpdatedEnrollments); 
        }
        if (this.submittedUpdateEnrollments && this.submittedUpdateEnrollments.length > 0) {
          this.sortWithAppointmentId(this.submittedUpdateEnrollments);
        }
        // this.submittedUpdateEnrollments = _.uniqBy(this.submitted, 'aadhaarId')
        // this.draftedUpdatedEnrollments = _.uniqBy(this.drafted, 'aadhaarId')
      }
    }, err => {
      this.loader = false
    })
  }

  sortWithAadhaarId (dataList) {
    dataList.forEach(element => {
      let tempData = {
        aadhaarId: '',
        fullName: '',
        data: []
      };
      if (this.draftedUpdatedData.length === 0) {
        tempData.aadhaarId = element.aadhaarId;
        tempData.fullName = element.fullName;
        tempData.data.push(element);
        this.draftedUpdatedData.push(tempData);
      } else if (this.draftedUpdatedData.length > 0) {
        let subdata = this.draftedUpdatedData.filter(app => app.aadhaarId === element.aadhaarId);
        if (subdata.length > 0) {
          subdata[0].data.push(element);
        } else if (subdata.length === 0) {
          tempData.aadhaarId = element.aadhaarId;
          tempData.fullName = element.fullName;
          tempData.data.push(element);
          this.draftedUpdatedData.push(tempData);
        }
      }
    });
  }

  sortWithAppointmentId(dataList) {
    dataList.forEach(element => {
      let tempData = {
        appointmentId: '',
        fullName: '',
        data: []
      }
      if (this.submittedUpdateData.length === 0) {
        tempData.appointmentId = element.appointmentId;
        tempData.fullName = element.fullName;
        tempData.data.push(element);
        this.submittedUpdateData.push(tempData);
      } else if (this.submittedUpdateData.length > 0) {
        let subData = this.submittedUpdateData.filter(app => app.appointmentId === element.appointmentId);
        if (subData.length > 0) {
          subData[0].data.push(element);
        } else if (subData && subData.length === 0) {
          tempData.appointmentId = element.appointmentId;
          tempData.fullName = element.fullName;
          tempData.data.push(element);
          this.submittedUpdateData.push(tempData);
        }
      }
    });
  }

  ageCalculator(dob) {
    let dob1 = new Date(dob);
    let timeDifference = Math.abs(this.today.getTime() - dob1.getTime());
    let age = Math.floor(timeDifference / (1000 * 3600 * 24) / 365);
    return age;
  }
  navigateToUpdate(obj) {
      let submitted: any = this.drafted.filter(app => app.aadhaarId === obj.aadhaarId)
      let updateAadharRecord = [{
        errorMessage: '',
        response: obj.data
      }];
      localStorage.setItem("appointmentId", JSON.stringify(obj.appointmentId));
      localStorage.setItem("DraftedUpdated", JSON.stringify(submitted));
      localStorage.removeItem("fields");
      localStorage.removeItem('updateAadharRecord');
      localStorage.setItem('appointmentType', JSON.stringify('UPDATE'));
      localStorage.setItem('updateAadharRecord', JSON.stringify(updateAadharRecord));
      this._router.navigate([APPPOINTEMENT.ROUTERLINKS.UPDATE_ENROLMENT]);
  }
  navigateToNewUpdate() {
    localStorage.removeItem('updateAadharRecord');
    localStorage.removeItem('DraftedUpdated');
    localStorage.removeItem("fields");
    localStorage.setItem('appointmentType', JSON.stringify('UPDATE'));
    this._router.navigate([APPPOINTEMENT.ROUTERLINKS.CHOOSE_UPDATE]);
  }
  navigateToEnrolment(obj) {
    let tabs = {
      "addressTab": true,
      "photoTab": true,
      "reviewTab": true
    }
    localStorage.setItem('tabs', JSON.stringify(tabs));
    localStorage.setItem('userId', JSON.stringify(obj.id));
    localStorage.setItem('appointmentType', JSON.stringify('NEW'));
    if(obj.pageNo && obj.pageNo.toUpperCase() === 'TYPEOFENROLL') {
      this._router.navigate([APPPOINTEMENT.ROUTERLINKS.TYPE_OF_ENROLLMENT]);
    } else if(obj.pageNo && obj.pageNo.toUpperCase() === 'HOF') {
      localStorage.setItem('hofEnrol', JSON.stringify(1))
      this._router.navigate([APPPOINTEMENT.ROUTERLINKS.ADDRESS_ENROLLMENT,1]);
    } else if(obj.pageNo && obj.pageNo.toUpperCase() === 'DOC') {
      localStorage.setItem('hofEnrol', JSON.stringify(0))
      this._router.navigate([APPPOINTEMENT.ROUTERLINKS.ADDRESS_ENROLLMENT,0]);
    } else if(obj.pageNo && obj.pageNo.toUpperCase() === 'REVIEW') {
      this._router.navigate([APPPOINTEMENT.ROUTERLINKS.REVIEW_ENROLLMENT]);
    } else {
      this._router.navigate([APPPOINTEMENT.ROUTERLINKS.BASIC_ENROLLMENT]);
    }
  }
  handleClick() {
    let tabs = {
      "addressTab": true,
      "photoTab": true,
      "reviewTab": true
    }
    localStorage.removeItem('userId');
    localStorage.setItem('tabs', JSON.stringify(tabs));
    this._router.navigate([APPPOINTEMENT.ROUTERLINKS.BASIC_ENROLLMENT]);
  }

  handleBookAppointment(res) {
    localStorage.setItem("appointmentId", JSON.stringify(res.appointmentId));
    localStorage.setItem('userId', JSON.stringify(res.id));
    localStorage.setItem('appointmentType', JSON.stringify('NEW'));
    localStorage.setItem('BookingDataInfo', JSON.stringify(res));
    this._router.navigate([APPPOINTEMENT.ROUTERLINKS.SEARCH_ENROLMENT_CENTER]);
  }

  handleUpdateBookAppoint(obj) {
    let resheduleData = {
      id: obj.id,
      flag: false
    }
    this.drafted.push(obj.data);
    localStorage.setItem("DraftedUpdated", JSON.stringify(this.drafted))
    localStorage.setItem("appointmentId", JSON.stringify(obj.appointmentId));
    localStorage.removeItem('updateAadharRecord');
    localStorage.setItem('appointmentType', JSON.stringify('UPDATE'));
    localStorage.setItem("resheduleData", JSON.stringify(resheduleData));
    this._router.navigate([APPPOINTEMENT.ROUTERLINKS.SEARCH_ENROLMENT_CENTER]);
  }

  handleRescheduleBookAppointment(obj) {
    let data;
    let resheduleData = {
      id: obj.enrollmentSlotID,
      flag: true
    }
    if (obj.enrolmentType && obj.enrolmentType === 'NEW') {
      localStorage.setItem('userId', JSON.stringify(obj.id));
    } else {
      if (obj){
        data = [obj.data];
        localStorage.setItem('DraftedUpdated', JSON.stringify(data));
      }
    }
    localStorage.removeItem('updateAadharRecord');
    localStorage.setItem("appointmentId", JSON.stringify(obj.appointmentId));
    localStorage.setItem("resheduleData", JSON.stringify(resheduleData));
    localStorage.setItem('appointmentType', JSON.stringify((obj.enrolmentType) ? obj.enrolmentType : 'UPDATE'));
    this._router.navigate([APPPOINTEMENT.ROUTERLINKS.SEARCH_ENROLMENT_CENTER]);
  }

  openModal(template: TemplateRef<any>, obj) {
    this.loader = true;
    this.modalRef = this.modalService.show(template);
    this._enrollmetService.getBookingSlotId(obj.appointmentId).subscribe((res: any) => {
      this.loader = false;
      if (res) {
        this.enrollmentCenterDetails.ecName = (res.ecName) ? res.ecName : '';
        this.enrollmentCenterDetails.ecAddress = (res.ecAddress) ? res.ecAddress : '';
        this.enrollmentCenterDetails.date = moment.utc(res.appointmentStartTime).format('DD/MM/YYYY');
        this.enrollmentCenterDetails.time = moment.utc(res.appointmentStartTime).format('LT');
        obj.enrollmentSlotID = res.bookingId;
      }
    }, err => {
      this.loader = false;
      this._alertService.error("Something went wrong try again after sometime");
    })
  }
}
