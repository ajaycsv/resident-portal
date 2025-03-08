import { Injectable } from '@angular/core';
import { DataService } from '../helpers/interceptor.service';
import { APPPOINTEMENT } from '../.././app-constants';
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  ENV: any = environment;

  constructor(private _dataService: DataService) { }

  createEnrolment(obj) {
    return this._dataService.post(this.ENV.APIEndpoint + APPPOINTEMENT.DEMO_GRAPHIC_SERVICE + APPPOINTEMENT.APIS.CREATE_RESIDENT_ENROLMENT, obj)
  }

  getEnrolment(userId) {
    return this._dataService.get(this.ENV.APIEndpoint + APPPOINTEMENT.DEMO_GRAPHIC_SERVICE + APPPOINTEMENT.APIS.GET_RESID_BY_ID + '?enrolmentId=' + userId)
  }

  updateEnrolment(obj, enrolId) {
    return this._dataService.put(this.ENV.APIEndpoint + APPPOINTEMENT.DEMO_GRAPHIC_SERVICE + APPPOINTEMENT.APIS.UPDATE_RESID_BY_ID + '?enrolmentId=' + enrolId, obj)
  }

  updateAadharRecord(obj) {
    return this._dataService.put(this.ENV.APIEndpoint + APPPOINTEMENT.DEMO_GRAPHIC_UPDATE_SERVICE + APPPOINTEMENT.APIS.UPDATE_AADHARR_RECORD, obj)
  }

  getUpdateAadharPreview(aadhar) {
    return this._dataService.get(this.ENV.APIEndpoint + APPPOINTEMENT.DEMO_GRAPHIC_UPDATE_SERVICE + APPPOINTEMENT.APIS.GET_UPDATE_PREVIEW + '?aadhaarId=' + aadhar)
  }

  updateReviewAadhaarRecord(obj) {
    return this._dataService.put(this.ENV.APIEndpoint + APPPOINTEMENT.DEMO_GRAPHIC_UPDATE_SERVICE + APPPOINTEMENT.APIS.UPDATE_REVIEW_AADHAAR_RECORDS, obj)
  }
  
  getVillagesByPinCode(pinCode) {
    return this._dataService.get(this.ENV.APIEndpoint + APPPOINTEMENT.MISC_SERVICE + APPPOINTEMENT.APIS.GET_VILLAGES_BY_PINCODE + '?pincode=' + pinCode)
  }

  getSubDistrictByCode(code) {
    return this._dataService.get(this.ENV.APIEndpoint + APPPOINTEMENT.MISC_SERVICE + APPPOINTEMENT.APIS.GET_SUB_DIST_BY_CODE + '?subDistrictCode=' + code)
  }

  getDistrictByCode(code) {
    return this._dataService.get(this.ENV.APIEndpoint + APPPOINTEMENT.MISC_SERVICE + APPPOINTEMENT.APIS.GET_DIST_BY_CODE + '?districtCode=' + code)
  }

  getStateByCode(code) {
    return this._dataService.get(this.ENV.APIEndpoint + APPPOINTEMENT.MISC_SERVICE + APPPOINTEMENT.APIS.GET_STATE_BY_CODE + '?stateCode=' + code)
  }

  getQrCodeUpdateForm(id) {
    return this._dataService.get(this.ENV.APIEndpoint + APPPOINTEMENT.DEMO_GRAPHIC_SERVICE_QRCODE + APPPOINTEMENT.APIS.QRCODE_UPDATE_FORM + '/' +id) 
  }

  getQrCodeNewForm(id) {
    return this._dataService.get(this.ENV.APIEndpoint + APPPOINTEMENT.DEMO_GRAPHIC_SERVICE_QRCODE + APPPOINTEMENT.APIS.QRCODE_NEW_FORM + '/' +id) 
  }
}
