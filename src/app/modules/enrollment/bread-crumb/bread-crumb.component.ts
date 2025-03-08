import { Component, OnInit, Input } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { APPPOINTEMENT } from '../../../app-constants';

@Component({
  selector: 'app-bread-crumb',
  templateUrl: './bread-crumb.component.html',
  styleUrls: ['./bread-crumb.component.scss']
})
export class BreadCrumbComponent implements OnInit {
  routes: any = APPPOINTEMENT;
  currentRouteState: any;
  private sub: any;
  id: any;
  @Input() addressTab: boolean;
  @Input() photoTab: boolean;
  @Input() reviewTab: boolean;

  tabState: any;
  constructor(private router: Router,private activatedRoute:ActivatedRoute) {

  }

  ngOnInit() {
    // this.sub = this.activatedRoute.params.subscribe(params => {
    //   this.id = params['typeOfEnrolment'];
    // });
    this.id = JSON.parse(localStorage.getItem('hofEnrol'))
    this.currentRouteState = this.router.url
    this.tabState = JSON.parse(localStorage.getItem('tabs'));
  }
}
