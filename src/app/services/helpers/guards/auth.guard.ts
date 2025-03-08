import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { APPPOINTEMENT} from '../../../app-constants';
@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private _cookieService: CookieService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this._cookieService.get('auth') != undefined && localStorage.getItem('loggedInMobile')) {
      // logged in so return true
      return true;
    }
    // not logged in so redirect to login page with the return url , { queryParams: { returnUrl: state.url }}
    this.router.navigate([APPPOINTEMENT.ROUTERLINKS.LOGIN]);
    return false
  }

}