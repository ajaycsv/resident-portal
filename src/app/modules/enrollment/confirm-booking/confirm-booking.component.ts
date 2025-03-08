import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APPPOINTEMENT } from '../../../app-constants';
import { EnrollmentCenterSearchService, AlertService, UserService } from '../../../services/index';
@Component({
  selector: 'app-confirm-booking',
  templateUrl: './confirm-booking.component.html',
  styleUrls: ['./confirm-booking.component.scss']
})
export class ConfirmBookingComponent implements OnInit {
  confirmSlot: any;
  selectedCenter: any;
  loggedInNumber: any;
  loader: boolean = false
  bodyHeight: any = document.body.clientHeight;
  userId: any;
  userData: any;
  updatedAadhaarRecord: any;
  updateNameRecord: any = {};
  updateDobRecord: any = {};
  updateAgeRecord: any = {};
  updateGenderRecord: any = {};
  updateAddressRecord: any = {};
  updateMobileRecord: any = {};
  updateEmailRecord: any = {};
  addressRecord: any = {};
  draftedUpdated: any = []
  draftedNameUpdate: any = {};
  draftedGenderUpdate: any = {};
  draftedDobUpdate: any = {};
  draftedMobileUpdate: any = {};
  draftedEmailUpdate: any = {};
  draftedAddressUpdate: any = {};
  draftedBiometricUpdate: any = {}
  resheduleData = JSON.parse(localStorage.getItem('resheduleData'));
  updateBiometricUpdate: any;
  constructor(private router: Router, private enrollmentService: EnrollmentCenterSearchService, private _alertService: AlertService, private userService: UserService) { }

  ngOnInit() {
    this.confirmSlot = JSON.parse(localStorage.getItem('slot'));
    this.selectedCenter = JSON.parse(localStorage.getItem('selectedCenter'));
    this.loggedInNumber = localStorage.getItem('loggedInMobile') ? JSON.parse(localStorage.getItem('loggedInMobile')) : '';
    this.userId = JSON.parse(localStorage.getItem('userId'));
    this.updatedAadhaarRecord = JSON.parse(localStorage.getItem('updateAadharRecord'));
    if (this.updatedAadhaarRecord) {
      this.updateNameRecord = this.updatedAadhaarRecord.filter(app => app.response.updateType.toUpperCase() === 'NAME');
      this.updateDobRecord = this.updatedAadhaarRecord.filter(app => app.response.updateType.toUpperCase() === 'DOB');
      this.updateGenderRecord = this.updatedAadhaarRecord.filter(app => app.response.updateType.toUpperCase() === 'GENDER');
      this.updateMobileRecord = this.updatedAadhaarRecord.filter(app => app.response.updateType.toUpperCase() === 'MOBILE');
      this.updateEmailRecord = this.updatedAadhaarRecord.filter(app => app.response.updateType.toUpperCase() === 'EMAIL');
      this.updateAddressRecord = this.updatedAadhaarRecord.filter(app => app.response.updateType.toUpperCase() === 'ADDRESS');
      this.updateBiometricUpdate = this.updatedAadhaarRecord.filter(app => app.response.updateType.toUpperCase() === 'BIOMETRIC');
      if (this.updateAddressRecord.length !== 0) {
        this.addressRecord = JSON.parse(this.updateAddressRecord[0].response.newValue)
      }
    }
    if (JSON.parse(localStorage.getItem('appointmentType')) !== 'UPDATE' && this.userId) {
      this.getUserDetails();
    }
    this.draftedUpdated = JSON.parse(localStorage.getItem('DraftedUpdated'))
    if (this.draftedUpdated && this.draftedUpdated.length > 0) {
      this.draftedUpdated.forEach(element => {
        this.draftedNameUpdate = element.filter(app => app.updateType.toUpperCase() === 'NAME');
        this.draftedDobUpdate = element.filter(app => app.updateType.toUpperCase() === 'DOB');
        this.draftedGenderUpdate = element.filter(app => app.updateType.toUpperCase() === 'GENDER');
        this.draftedMobileUpdate = element.filter(app => app.updateType.toUpperCase() === 'MOBILE');
        this.draftedEmailUpdate = element.filter(app => app.updateType.toUpperCase() === 'EMAIL');
        this.draftedAddressUpdate = element.filter(app => app.updateType.toUpperCase() === 'ADDRESS');
        this.draftedBiometricUpdate = element.filter(app => app.updateType.toUpperCase() === 'BIOMETRIC');
      });
    }
  }
  updateDraftedAadhaar() {
    let obj: any = [];
    if (this.draftedNameUpdate.length !== 0) {
      this.draftedNameUpdate[0].status = 'BOOKED';
      (this.draftedNameUpdate[0].createdAt) ? delete this.draftedNameUpdate[0].createdAt : '';
      (this.draftedNameUpdate[0].updatedAt) ? delete this.draftedNameUpdate[0].updatedAt : '';
      obj.push(this.draftedNameUpdate[0])
    }
    if (this.draftedGenderUpdate.length !== 0) {
      this.draftedGenderUpdate[0].status = 'BOOKED';
      (this.draftedGenderUpdate[0].createdAt) ? delete this.draftedGenderUpdate[0].createdAt : '';
      (this.draftedGenderUpdate[0].updatedAt) ? delete this.draftedGenderUpdate[0].updatedAt : '';
      obj.push(this.draftedGenderUpdate[0])
    }
    if (this.draftedDobUpdate.length !== 0) {
      this.draftedDobUpdate[0].status = 'BOOKED';
      (this.draftedDobUpdate[0].createdAt) ? delete this.draftedDobUpdate[0].createdAt : '';
      (this.draftedDobUpdate[0].updatedAt) ? delete this.draftedDobUpdate[0].updatedAt : '';
      obj.push(this.draftedDobUpdate[0])
    }
    if (this.draftedMobileUpdate.length !== 0) {
      this.draftedMobileUpdate[0].status = 'BOOKED';
      (this.draftedMobileUpdate[0].createdAt) ? delete this.draftedMobileUpdate[0].createdAt : '';
      (this.draftedMobileUpdate[0].updatedAt) ? delete this.draftedMobileUpdate[0].updatedAt : '';
      obj.push(this.draftedMobileUpdate[0])
    }
    if (this.draftedEmailUpdate.length !== 0) {
      this.draftedEmailUpdate[0].status = 'BOOKED';
      (this.draftedEmailUpdate[0].createdAt) ? delete this.draftedEmailUpdate[0].createdAt : '';
      (this.draftedEmailUpdate[0].updatedAt) ? delete this.draftedEmailUpdate[0].updatedAt : '';
      obj.push(this.draftedEmailUpdate[0])
    }
    if (this.draftedAddressUpdate.length !== 0) {
      this.draftedAddressUpdate[0].status = 'BOOKED';
      (this.draftedAddressUpdate[0].createdAt) ? delete this.draftedAddressUpdate[0].createdAt : '';
      (this.draftedAddressUpdate[0].updatedAt) ? delete this.draftedAddressUpdate[0].updatedAt : '';
      obj.push(this.draftedAddressUpdate[0])
    }
    if (this.draftedBiometricUpdate.length !== 0) {
      this.draftedBiometricUpdate[0].status = 'BOOKED';
      (this.draftedBiometricUpdate[0].createdAt) ? delete this.draftedBiometricUpdate[0].createdAt : '';
      (this.draftedBiometricUpdate[0].updatedAt) ? delete this.draftedBiometricUpdate[0].updatedAt : '';
      obj.push(this.draftedBiometricUpdate[0])
    }
    this.userService.updateReviewAadhaarRecord(obj).subscribe((res: any) => {
      this.loader = false;
      if (res) {
        // localStorage.removeItem('updateAadharRecord')
        // localStorage.removeItem('DraftedUpdated')
      }
    }, err => {
      this.loader = false
      //this._alertService.error( err.statusText)
    })
  }
  getUserDetails() {
    this.loader = true
    this.userService.getEnrolment(this.userId).subscribe((res: any) => {
      if (res && res.residentEnrolmentEntity && res.residentEnrolmentEntity.hofEnrol === 0) {
        this.loader = false;
        let data = res.residentEnrolmentEntity
        this.userData = {
          "id": data.id,
          "fullName": data.fullName,
          "dob": data.dob,
          "gender": data.gender,
          "age": data.age,
          "enrolmentType": "NEW",
          "enrolmentStatus": "BOOKED",
          "mobileNo": data.mobileNo,
          "email": data.email,
          "adrs1": data.adrs1,
          "adrs2": data.adrs2,
          "vtc": data.vtc,
          "pinCode": data.pinCode,
          "district": data.district,
          "state": data.state,
          "careOfType": data.careOfType ? data.careOfType : 'c/o',
          "careOfName": data.careOfName,
          "houseNO": data.houseNO,
          "landMark": data.landMark,
          "postOfc": data.postOfc,
          "policeOfc": data.policeOfc,
          "hofEnrol": data.hofEnrol
        }
      } else if (res && res.residentEnrolmentEntity && res.residentEnrolmentEntity.hofEnrol === 1) {
        this.loader = false;
        let data = res.residentEnrolmentEntity
        this.userData = {
          "id": data.id,
          "fullName": data.fullName,
          "dob": data.dob,
          "gender": data.gender,
          "age": data.age,
          "enrolmentType": "NEW",
          "enrolmentStatus": "BOOKED",
          "mobileNo": data.mobileNo,
          "email": data.email,
          "adrs1": data.adrs1,
          "adrs2": data.adrs2,
          "vtc": data.vtc,
          "pinCode": data.pinCode,
          "district": data.district,
          "state": data.state,
          "careOfType": data.careOfType ? data.careOfType : 'c/o',
          "careOfName": data.careOfName,
          "houseNO": data.houseNO,
          "landMark": data.landMark,
          "postOfc": data.postOfc,
          "policeOfc": data.policeOfc,
          "hofEnrol": data.hofEnrol,
          "hofRel_type": res.headOfFamilyEntity.hofRelType,
          "hofRelativeName": res.headOfFamilyEntity.relativeName,
          "hofEnrolmentId_rel": res.headOfFamilyEntity.enrolmentIdRel,
          "hofAadharId_rel": res.headOfFamilyEntity.aadharIdRel,
        }
      }
    }, error => {
      this.loader = false
      //this._alertService.error(error.statusText)
    })
  }
  updateEnrolment(obj) {
    this.userService.updateEnrolment(obj, this.userId).subscribe((res: any) => {
      if (res) {
        this.loader = false
      }
    }, error => {
      this.loader = false
      //this._alertService.error(error.statusText)
    })
  }
  slotBooking() {
    this.loader = true;
    let appointmentId = JSON.parse(localStorage.getItem('appointmentId')) 
    let obj = {
      //"date": this.confirmSlot.date,
      "residentMobileNumber": this.loggedInNumber,
      "slotId": this.confirmSlot.id,
      "email": this.userData ? this.userData.email : '',
      //"ecId": this.confirmSlot.ecId,
      "appointmentId": appointmentId
    }
    this.enrollmentService.bookSlot(obj).subscribe((res: any) => {
      if (res) {
        this.loader = false;
        if (this.updatedAadhaarRecord) {
          this.updateReviewAadhaarPage();
        } 
        if(this.draftedUpdated) {
          this.updateDraftedAadhaar()
        }
        if(this.userData) {
          this.updateEnrolment(this.userData);
        }
        this.router.navigate([APPPOINTEMENT.ROUTERLINKS.ACKNOWLEDGEMENT]);
      }
    }, err => {
      this.loader = false
      //this._alertService.error(err.statusText)
    })
  }

  resheduleSlotBooking() {
    this.loader = true;
    let obj = {
      bookedSlotId: this.resheduleData.id,
      slotId: this.confirmSlot.id
    }
    this.enrollmentService.rescheduleBookedSlot(obj).subscribe((res: any) => {
      if (res) {
        this.loader = false;
        if (this.updatedAadhaarRecord) {
          this.updateReviewAadhaarPage();
        } 
        if(this.draftedUpdated) {
          this.updateDraftedAadhaar()
        }
        if(this.userData) {
          this.updateEnrolment(this.userData);
        }
        this.router.navigate([APPPOINTEMENT.ROUTERLINKS.ACKNOWLEDGEMENT]);
      }
    }, err => {
      this.loader = false
      if (err.status === 406) {
        this._alertService.error(err.error.message)
      } else {
        this._alertService.error("Something went wrong try again after sometime")
      }
    });
  }

  cancel() {
    this.router.navigate([APPPOINTEMENT.ROUTERLINKS.SLOT_BOOKING, this.selectedCenter.id]);
  }

  updateReviewAadhaarPage() {
    let obj: any = [];
    if (this.updateNameRecord.length !== 0) {
      this.updateNameRecord[0].response.status = 'BOOKED';
      (this.updateNameRecord[0].response.createdAt) ? delete this.updateNameRecord[0].response.createdAt : '';
      (this.updateNameRecord[0].response.updatedAt) ? delete this.updateNameRecord[0].response.updatedAt : '';
      obj.push(this.updateNameRecord[0].response)
    }
    if (this.updateGenderRecord.length !== 0) {
      this.updateGenderRecord[0].response.status = 'BOOKED';
      (this.updateGenderRecord[0].response.createdAt) ? delete this.updateGenderRecord[0].response.createdAt : '';
      (this.updateGenderRecord[0].response.updatedAt) ? delete this.updateGenderRecord[0].response.updatedAt : '';
      obj.push(this.updateGenderRecord[0].response)
    }
    if (this.updateDobRecord.length !== 0) {
      this.updateDobRecord[0].response.status = 'BOOKED';
      (this.updateDobRecord[0].response.createdAt) ? delete this.updateDobRecord[0].response.createdAt : '';
      (this.updateDobRecord[0].response.updatedAt) ? delete this.updateDobRecord[0].response.updatedAt : '';
      obj.push(this.updateDobRecord[0].response)
    }
    if (this.updateEmailRecord.length !== 0) {
      this.updateEmailRecord[0].response.status = 'BOOKED';
      (this.updateEmailRecord[0].response.createdAt) ? delete this.updateEmailRecord[0].response.createdAt : '';
      (this.updateEmailRecord[0].response.updatedAt) ? delete this.updateEmailRecord[0].response.updatedAt : '';
      obj.push(this.updateEmailRecord[0].response)
    }
    if (this.updateMobileRecord.length !== 0) {
      this.updateMobileRecord[0].response.status = 'BOOKED';
      (this.updateMobileRecord[0].response.createdAt) ? delete this.updateMobileRecord[0].response.createdAt : '';
      (this.updateMobileRecord[0].response.updatedAt) ? delete this.updateMobileRecord[0].response.updatedAt : '';
      obj.push(this.updateMobileRecord[0].response)
    }
    if (this.updateAddressRecord.length !== 0) {
      this.updateAddressRecord[0].response.status = 'BOOKED';
      (this.updateAddressRecord[0].response.createdAt) ? delete this.updateAddressRecord[0].response.createdAt : '';
      (this.updateAddressRecord[0].response.updatedAt) ? delete this.updateAddressRecord[0].response.updatedAt : '';
      let address = JSON.parse(this.updateAddressRecord[0].response.newValue)
      delete this.updateAddressRecord[0].response["newValue"];
      this.updateAddressRecord[0].response.address = address
      obj.push(this.updateAddressRecord[0].response)
    }
    if (this.updateBiometricUpdate.length !==0) {
      this.updateBiometricUpdate[0].response.status = 'BOOKED';
      (this.updateBiometricUpdate[0].response.createdAt) ? delete this.updateBiometricUpdate[0].response.createdAt : '';
      (this.updateBiometricUpdate[0].response.updatedAt) ? delete this.updateBiometricUpdate[0].response.updatedAt : '';
      obj.push(this.updateBiometricUpdate[0].response)
    }
    this.userService.updateReviewAadhaarRecord(obj).subscribe((res: any) => {
      this.loader = false;
      if (res) {
        // localStorage.removeItem('updateAadharRecord')
      }
    }, err => {
      this.loader = false
      //this._alertService.error(err.statusText)
    })
  }
}
