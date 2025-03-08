import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { APPPOINTEMENT } from '../../../app-constants';
@Component({
  selector: 'app-enrolment-submission',
  templateUrl: './enrolment-submission.component.html',
  styleUrls: ['./enrolment-submission.component.scss']
})
export class EnrolmentSubmissionComponent implements OnInit {
  id: number;
  private sub: any;
  bodyHeight: any = document.body.clientHeight;
  mobileNUmber: any;
  appointment: any = APPPOINTEMENT
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.mobileNUmber = JSON.parse(localStorage.getItem('loggedInMobile')),
      this.sub = this.route.params.subscribe(params => {
        this.id = params['appointmentId'];
      });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  handleBookAppointmnet() {
    this.router.navigate([APPPOINTEMENT.ROUTERLINKS.SEARCH_ENROLMENT_CENTER]);
  }
}
