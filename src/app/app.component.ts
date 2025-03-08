import { Component, OnInit } from '@angular/core';
import { CommunicationService } from './services/helpers/communication.service';
import { LocationStrategy, Location } from '@angular/common';
import { PlatformLocation } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  msg: any;

  constructor(private _myCommunicationService: CommunicationService, private location: LocationStrategy, private router: Router, private location1: Location) {
    this._myCommunicationService.changeEmitted$.subscribe(message => {
      this.msg = message;
    });
 
  }

  ngOnInit() {
  }

}
