import { Injectable } from '@angular/core';
import { DataService } from '../helpers/interceptor.service';
import { APPPOINTEMENT } from '../../app-constants';
import { environment } from '../../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class EnrollmentCenterSearchService {
  ENV: any = environment;

  constructor(private _dataService: DataService) { }

  getEnrollmentCenterByPinCode(code) {
    return this._dataService.get(this.ENV.APIEndpoint + APPPOINTEMENT.ENROLLMENT_CENTER_SERVICE + APPPOINTEMENT.APIS.GET_ENROLMENT_CENTER + '?pin=' + code)
  }

  getEnrollmentCenterByText(txt) {
    return this._dataService.get(this.ENV.APIEndpoint + APPPOINTEMENT.ENROLLMENT_CENTER_SERVICE + APPPOINTEMENT.APIS.GET_ENROLMENT_CENTER + '?searchText=' + txt)
  }

  searchEnrollmentCenter(data) {
    return this._dataService.get(this.ENV.APIEndpoint + APPPOINTEMENT.ENROLLMENT_CENTER_SERVICE + APPPOINTEMENT.APIS.SEARCH_ENROLMENT_CENTER + '?state=' + data.state + '&district=' + data.district + '&subDistrict=' + data.subDistrict + '&vtc=' + data.vtc)
  }
  
  getSlots(obj) {
    return this._dataService.post(this.ENV.APIEndpoint + APPPOINTEMENT.BOOKING_SERVICE + APPPOINTEMENT.APIS.GET_SLOTS_BY_DATE, obj)
  }

  bookSlot(obj) {
    return this._dataService.post(this.ENV.APIEndpoint + APPPOINTEMENT.BOOKING_SERVICE + APPPOINTEMENT.APIS.SLOT_BOOKING, obj)
  }

  cancelSlot(id) {
    return this._dataService.post(this.ENV.APIEndpoint + APPPOINTEMENT.BOOKING_SERVICE + APPPOINTEMENT.APIS.CANCEL_SLOT,+ '?id=' + id)
  }

  rescheduleBookedSlot(obj) {
    return this._dataService.post(this.ENV.APIEndpoint + APPPOINTEMENT.BOOKING_SERVICE + APPPOINTEMENT.APIS.RESCHEDULE_SLOT, obj)
  }

  getBookingSlotId(id) {
    return this._dataService.get(this.ENV.APIEndpoint + APPPOINTEMENT.BOOKING_SERVICE + APPPOINTEMENT.APIS.GET_BOOKING_SLOT_BY_APPOINTMENT_ID + '?appointmentId=' + id)
  }

  getAllStateDetails() {
    return this._dataService.get(this.ENV.APIEndpoint + APPPOINTEMENT.MISC_SERVICE + APPPOINTEMENT.APIS.GET_ALL_STATE_DETAILS)
  }

  getDistrictDetailsByStateCode(stateCode) {
    return this._dataService.get(this.ENV.APIEndpoint + APPPOINTEMENT.MISC_SERVICE + APPPOINTEMENT.APIS.GET_DISTRICT_BY_STATE_CODE + '?stateCode=' + stateCode)
  }

  getSubDistByDistrictCode(distCode) {
    return this._dataService.get(this.ENV.APIEndpoint + APPPOINTEMENT.MISC_SERVICE + APPPOINTEMENT.APIS.GET_SUB_DIST_BY_DISTRICT_CODE + '?districtCode=' + distCode)
  }

  getVtcBySubDistCode(subDistCode) {
    return this._dataService.get(this.ENV.APIEndpoint + APPPOINTEMENT.MISC_SERVICE + APPPOINTEMENT.APIS.GET_VTC_BY_SUB_DIST_CODE + '?subDistrictCode=' + subDistCode)
  }
}
