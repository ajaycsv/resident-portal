import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  private messageSource = new BehaviorSubject<Object>('');
  currentData = this.messageSource.asObservable();
   // multiplication table
   multiplication = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
    [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
    [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
    [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
    [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
    [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
    [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
    [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
    [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
  ]
  
  // permutation table
  permutation = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
    [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
    [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
    [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
    [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
    [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
    [7, 0, 4, 6, 9, 1, 3, 2, 5, 8]
  ]
  constructor(private _cookieService: CookieService) { }

  getAuth(): any {
    if (this._cookieService.get('auth') !== undefined) {
      let auth = this._cookieService.get('auth');
      auth = JSON.parse(auth);
      return auth;
    }
  }

   /**To validate only numbers */
   keyPress(event: any) {
    const pattern = /^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/
    ///[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
       return event.preventDefault();
    }
  }
  
  eventToAcceptNumberOtherThanZero(event:any) {
    const pattern =/^([1-9]|[1-9][1-9]|[1-9][1-9][1-9])$/
    // /^[+]?([1-9]+(?:[\.][1-9]*)?|\.[1-9]+)$/
    ///[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
       return event.preventDefault();
    }
  }
  eventToAcceptOnlyNumbers(event: any) {
    var specials=/[*|\":<>[\]{}`\\()';@&$]/;  
    let inputChar = String.fromCharCode(event.charCode);
    if (!inputChar.match(/^[a-zA-Z .]+$/)) {
      return event.preventDefault();
   }
  }
  sentData(message: string) {
    this.messageSource.next(message)
  }

  validateAadhaar(val) {
    let c = 0
    let invertedArray = val.split('').map(Number).reverse()
  
    invertedArray.forEach((val, i) => {
      c = this.multiplication[c][this.permutation[(i % 8)][val]]
    })
    return (c === 0)
  }
  
  validateEmail(val) {
    var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return pattern.test(val);  // returns a boolean
  }
}
