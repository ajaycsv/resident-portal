import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpClient, HttpErrorResponse, HttpXsrfTokenExtractor } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, finalize } from 'rxjs/operators';
import { CommunicationService } from './communication.service';
import { UtilService } from './util.service';
import { AlertService } from '../helpers/alert.service';
import { APPPOINTEMENT } from '../../app-constants';
@Injectable()
export class DataService {
  constructor(private http: HttpClient) { }

  // get method
  get(url) {
    return this.http.get(url).pipe(
      catchError((error) => {
        return throwError(error);
      }))
    // finalize(() => this.responseCall()));
  }
  // post method
  post(url, req) {
    return this.http.post(url, req).pipe(
      catchError((error) => {
        return throwError(error);
      }))
    // finalize(() => this.responseCall()));
  }
  patch(url, req) {
    return this.http.patch(url, req).pipe(
      catchError((error) => {
        return throwError(error);
      }))

  }
  // put method
  put(url, req) {
    return this.http.put(url, JSON.stringify(req)).pipe(
      catchError((error) => {
        return throwError(error);
      }))
    // finalize(() => this.responseCall()));
  }

  // delete method
  delete(url, req) {
    return this.http.put(url, JSON.stringify(req)).pipe(
      catchError((error) => {
        return throwError(error);
      }))
    // finalize(() => this.responseCall()));
  }

  requestCall() {
    //this._myCommunicationService.loaderDataEmitChange(true);
  }
  responseCall() {
    //this._myCommunicationService.loaderDataEmitChange(false);
  }

}

@Injectable()
export class InterceptorService implements HttpInterceptor {
  constructor(private _communicationService: CommunicationService, private _utilService: UtilService, private router: Router, private _alertService: AlertService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authToken: any = this._utilService.getAuth();
    let authReq;
    let captchUrl = req.url.includes(APPPOINTEMENT.APIS.CAPTCHA);
    let authUrl = req.url.includes(APPPOINTEMENT.APIS.GET_TOKEN);
    let validateCaptchaUrl = req.url.includes(APPPOINTEMENT.APIS.VALIDATE_CAPTCHA)
    let imageUrl = req.url.includes(APPPOINTEMENT.APIS.IMAGE_UPLOAD)
    let otpUrl = req.url.includes(APPPOINTEMENT.APIS.GENERATE_GENERIC_OTP);
    let validateotpUrl = req.url.includes(APPPOINTEMENT.APIS.VALIDATE_GENERIC_OTP);
    if (authUrl) {
      authReq = req.clone({
        headers: req.headers.set('Content-Type', 'application/json')
          .set('Accept', 'application/json')
      });
    } else if (captchUrl) {
      authReq = req.clone({
        headers: req.headers
          //.set('Content-Type', 'image/jpeg')
          .set('token', authToken.token)
          .set('Accept', 'image/jpeg'),
        responseType: 'blob'
      });
    } else if (validateCaptchaUrl || otpUrl || validateotpUrl) {
      authReq = req.clone({
        headers: req.headers.set('Content-Type', 'application/json')
          .set('Accept', 'text/plain')
          .set('token', authToken.token),
        responseType: 'text'
      });
    } else if (imageUrl) {
      authReq = req.clone({
        headers: req.headers
          .set('Accept', 'application/json')
      })
    } else {
      authReq = req.clone({
        headers: req.headers.set('Content-Type', 'application/json')
          .set('Accept', 'application/json')
          .set('token', authToken.token)
      })
    }
    // send the newly created request
    return next.handle(authReq).pipe(catchError((error: HttpErrorResponse) => {
      let errorMessage = '';
      if (error.error instanceof ErrorEvent) {
        // client-side error
        errorMessage = `Error: ${error.error.message}`;
      } else {
        // server-side error
        errorMessage = `${error.status}-${error.error}`;
        if (error.status == 401) {
          localStorage.clear()
          this.router.navigate([APPPOINTEMENT.ROUTERLINKS.LOGIN]);
        } else if (error.status == 400) {
          this._alertService.error("Bad Request, Data unavailbale")
        } else if (error.status >= 500) {
          this._alertService.error("Something went wrong, Please try after sometime")
        } else if(error.status == 406) {
          // this._alertService.error(error.statusText)
        }
      }
      //this._communicationService.emitChange(errorMessage);
      return throwError(error);
    }));
  }
}
