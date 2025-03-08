import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APPPOINTEMENT } from '../../../app-constants';

@Component({
  selector: 'app-top-navigation',
  templateUrl: './top-navigation.component.html',
  styleUrls: ['./top-navigation.component.scss']
})
export class TopNavigationComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() {
  }

  navigation() {
    this._router.navigate([APPPOINTEMENT.ROUTERLINKS.BASIC_ENROLLMENT]);
  }

  navigatToEnroll(type) {
  }
  logout() {
    localStorage.clear();
    this._router.navigate([APPPOINTEMENT.ROUTERLINKS.ROOT]);
  }
}
