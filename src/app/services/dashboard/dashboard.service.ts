import { Injectable } from '@angular/core';
import { DataService } from '../helpers/interceptor.service';
import { APPPOINTEMENT } from '../.././app-constants';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  ENV: any = environment;

  constructor(private _dataService: DataService) { }

  getApplications(mobileNo) {
    return this._dataService.get(this.ENV.APIEndpoint + APPPOINTEMENT.DEMO_GRAPHIC_SERVICE + APPPOINTEMENT.APIS.GET_ENROLL_BY_LOGGED_MOBILE + '?loggedInmobileNo=' + mobileNo)
  }

  getUpdateAadhaarRecords(mobileNo) {
    return this._dataService.get(this.ENV.APIEndpoint + APPPOINTEMENT.DEMO_GRAPHIC_UPDATE_SERVICE + APPPOINTEMENT.APIS.GET_AADHAAR_UPDATE_RECORDS + '?loggedInMobile=' + mobileNo)
  }
}
