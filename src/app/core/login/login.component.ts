import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommunicationService, AuthenticationService, UtilService, AlertService } from '../../services/index'
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { CookieService } from 'ngx-cookie';
import { APPPOINTEMENT } from '../../app-constants';
import * as moment from 'moment';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  msg: any = APPPOINTEMENT;
  registerForm: FormGroup;
  imageBlobUrl: any;
  invalidCaptcha: boolean = false;
  invalidOtp = false;
  enableOtpButton: boolean = true;
  resendOtpCount = 0;
  model: any = {
    mobileNumber: '',
    OTP: '',
    captcha: ''
  };
  bodyHeight: any = document.body.clientHeight;
  mobnumPattern = "^((\\+91-?)|0)?[0-9]{10}$";
  interval;
  timeLeft: number = 60;
  constructor(private _router: Router, private _authenticationService: AuthenticationService, private _utilService: UtilService,
    private _cookieService: CookieService, private _alertService: AlertService) { }

  ngOnInit() {
    this._cookieService.remove('auth');
    this.getAuth();
    localStorage.clear()
    history.pushState(null, null, this._router.url);
    window.onpopstate = function () {
      history.go();
    };
  }

  /** API CALLS */
  getAuth() {
    this._authenticationService.getAuth().subscribe((response: any) => {
      if (response) {
        this.putCookie('auth', JSON.stringify(response))
        this.getCaptcha();

      }
    })
  }
  getCaptcha() {
    this._authenticationService.getCaptcha().subscribe((response: any) => {
      this.createImageFromBlob(response);
    })
    // , err => {
    //   this._alertService.error(err.statusText)
    // })
  }
  generateOtp() {
    let obj = {
      "mobileNumber": this.model.mobileNumber
    }
    this._authenticationService.generateGenericOtp(obj).subscribe((res: any) => {
       this.enableOtpButton = false;
    }, err => {
      this._alertService.error("Not able to Generate OTP!! Please try after some time");
    })
  }
  validateOtp() {
    let req = {
      "mobileNumber": this.model.mobileNumber,
      "otp": this.model.OTP
    }
    this._authenticationService.validateGenericOtp(req).subscribe((res: any) => {
      localStorage.setItem('loggedInMobile', JSON.stringify(this.model.mobileNumber));
      this._router.navigate([APPPOINTEMENT.ROUTERLINKS.DASHBOARD]);
    }, err => {
      if (err.status === 400 || err.status === 406) {
        this.invalidOtp = true;
      }
    })
  }

  resendOtp() {
    this.resendOtpCount += 1;
    if (this.resendOtpCount < 3 ){
      this.interval = setInterval(() => {
        if(this.timeLeft > 0) {
          this.timeLeft--;
        } else {
          this.timeLeft = 60;
          clearInterval(this.interval);
        }
      },1000);
      this.validateCaptcha();
    } else {
      window.location.reload();
    }
    
  }
  

  validateCaptcha() {
    let req = {
      "captcha": this.model.captcha
    }
    this._authenticationService.validateCaptcha(req).subscribe((res: any) => {
      if (res) {
        this.generateOtp()
        // this._router.navigate([APPPOINTEMENT.ROUTERLINKS.DASHBOARD]);
      }
    }, error => {
      if (error.status === 400 || error.status === 406) {
        this.invalidCaptcha = true;
      }
      throw error;
    })
  }
  /** END OF API CALLS*/

  putCookie(key: string, value: string) {
    const expiryDate : Date = new Date(new Date().getTime() + (1000 * 60 * 20));
    return this._cookieService.put(key, value, {"expires" : expiryDate});
  }

  getCookie(key: string) {
    return this._cookieService.get(key);
  }
  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.imageBlobUrl = reader.result;
    }, false);
    if (image) {
      reader.readAsDataURL(image);
    }
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  /**To validate only numbers */
  keyPress(event: any) {
    this._utilService.keyPress(event)
  }

  /**To resend captcha */
  resendCaptcha() {
    this.getCaptcha()
  }
  /** To Get OTP */
  onGetOTP(form: NgForm) {
    localStorage.setItem('loggedInMobile', JSON.stringify(this.model.mobileNumber))
    if (form.invalid) {
      return;
    }
    this.validateCaptcha()
    //form.resetForm();
  }

  /** To Validate OTP */
  onOTPSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.validateOtp();
    form.resetForm();
  }
}