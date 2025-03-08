import { Injectable } from '@angular/core';
import { DataService } from '../helpers/interceptor.service';
import { APPPOINTEMENT } from '../.././app-constants';
import { environment } from '../../../environments/environment'

@Injectable()
export class AuthenticationService {
  ENV: any = environment;
  constructor(private dataService: DataService) {
  }

  getAuth() {
    return this.dataService.get(this.ENV.APIEndpoint + APPPOINTEMENT.AUTH_SERVICE + APPPOINTEMENT.APIS.GET_TOKEN);
  }
  getCaptcha() {
    return this.dataService.get(this.ENV.APIEndpoint + APPPOINTEMENT.MISC_SERVICE + APPPOINTEMENT.APIS.CAPTCHA);
  }

  validateCaptcha(obj) {
    return this.dataService.post(this.ENV.APIEndpoint + APPPOINTEMENT.MISC_SERVICE + APPPOINTEMENT.APIS.VALIDATE_CAPTCHA, obj)
  }

  validateToken(obj) {
    return this.dataService.post(this.ENV.APIEndpoint + APPPOINTEMENT.AUTH_SERVICE + APPPOINTEMENT.APIS.VALIDATE_TOKEN, obj)
  }

  generateGenericOtp(obj) {
    return this.dataService.post(this.ENV.APIEndpoint + APPPOINTEMENT.MISC_SERVICE + APPPOINTEMENT.APIS.GENERATE_GENERIC_OTP, obj)
  }

  validateGenericOtp(obj) {
    return this.dataService.post(this.ENV.APIEndpoint + APPPOINTEMENT.MISC_SERVICE + APPPOINTEMENT.APIS.VALIDATE_GENERIC_OTP, obj)
  }
} 
