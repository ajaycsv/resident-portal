import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,ActivatedRouteSnapshot } from '@angular/router';
import { APPPOINTEMENT } from '../../../app-constants';
import { EnrollmentCenterSearchService, AlertService } from '../../../services/index';
import * as moment from 'moment';

@Component({
  selector: 'app-slot-booking',
  templateUrl: './slot-booking.component.html',
  styleUrls: ['./slot-booking.component.scss']
})
export class SlotBookingComponent implements OnInit {
  private activatedRouteSnapshot: ActivatedRouteSnapshot
  loader: boolean = false;
  enrolmenCenters; any = [];
  totalSlots: any = [];
  availableSlots: any = []
  value: Date;
  minDate: any = Date;
  maxDate: any = Date;
  defaultDate: Date;
  selectedDate: any;
  id: number;
  enrolmentCenter: any
  private sub: any;
  radioSelected: any;
  selectedSlot: any;
  day1; day2; day3; day4; day5; day6; day7; day8; day9; day10; day11; day12; day13; day14;
  bodyHeight: any = document.body.clientHeight;
  availableSlotCount: any = 0;
  constructor(private router: Router, private _activatedRouter: ActivatedRoute, private _enrolmentCenterService: EnrollmentCenterSearchService,
    private _alertService: AlertService) { }

  ngOnInit() {
    this.enrolmenCenters = localStorage.getItem('enrolmenCenters') ? JSON.parse(localStorage.getItem('enrolmenCenters')) : []
    this.enrolmentCenter = JSON.parse(localStorage.getItem('selectedCenter'))
    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    let prevMonth = (month === 0) ? 11 : month;
    let prevYear = (prevMonth === 11) ? year - 1 : year;
    let nextMonth = (month === 11) ? 0 : month + 1;
    let nextYear = (nextMonth === 0) ? year + 1 : year;
    this.defaultDate = new Date();
    this.minDate = new Date();
    this.minDate.setMonth(prevMonth);
    this.minDate.setFullYear(prevYear);
    this.maxDate = new Date();
    this.maxDate.setDate(this.minDate.getDate() + 13);
    // this.maxDate.setMonth(nextMonth);
    // this.maxDate.setFullYear(nextYear);
    this.sub = this._activatedRouter.params.subscribe(params => {
      this.id = params['ecId'];
      this.selectedDate = moment().format('YYYY-MM-DD')
      this.getSlots()
    });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  onSelect(event) {
    this.selectedDate = moment(new Date(event)).format('YYYY-MM-DD')
    this.getDailySlots()
  }
  handleConfirmBooking(slot) {
    this.router.navigate([APPPOINTEMENT.ROUTERLINKS.CONFIRM_BOOKING]);
  }

  getSlots() {
    this.loader = true;
    let endDate = 2;
    let startDate = 0;
    let totalDays = 12;
    let batches = 3;
    let obj;
    for (var i = 0; i < (totalDays / batches); i++) {
      if (i == 0) {
        obj = {
          "ecId": this.id,
          "endDate": moment(new Date(this.minDate)).add(endDate, 'days').format('YYYY-MM-DD'),
          "startDate": moment(new Date(this.minDate)).add(startDate, 'days').format('YYYY-MM-DD')
        }
        this.getEnrollmentSlots(obj);
        startDate = endDate + 1;
        endDate = startDate + batches - 1;
      } else {
        obj = {
          "ecId": this.id,
          "startDate": moment(new Date(this.minDate)).add(startDate, 'days').format('YYYY-MM-DD'),
          "endDate": moment(new Date(this.minDate)).add(endDate, 'days').format('YYYY-MM-DD')
        }
        startDate = endDate + 1;
        endDate = startDate + batches - 1;
        this.getEnrollmentSlots(obj);
      }
    }
    if (totalDays % batches) {
      obj = {
        "ecId": this.id,
        "startDate": moment(new Date(this.minDate)).add(startDate, 'days').format('YYYY-MM-DD'),
        "endDate": moment(new Date(this.minDate)).add(endDate, 'days').format('YYYY-MM-DD')
      }
      startDate = endDate + 1;
      endDate = startDate + batches - 1;
      this.getEnrollmentSlots(obj);
    }
  }

  getEnrollmentSlots(obj) {
    this._enrolmentCenterService.getSlots(obj).subscribe((res: any) => { 
      res.forEach(element => {
        element.startTime = moment.utc(element.startTime).format('LT');
        element.endTime = moment.utc(element.endTime).format('LT');
        this.totalSlots.push(element);
      });
      setTimeout(() => {
        this.setingDays(this.totalSlots);
        this.getDailySlots();
        this.loader = false
      }, 2500);
    }, err => {
      this.loader = false
      this._alertService.error(err.statusText)
    });
  }

  setingDays(data) {
    var days = data.map(function (item) {
      return item.date;
    });
    var daysUinque = days.filter(function (item, index) {
      return days.indexOf(item) >= index;
    })
    daysUinque.forEach((r: any) => {
      let f = moment(new Date(r), 'YYYY-MM-DD')
      if (!this.day1) {
        this.day1 = f.date();
        return
      }
      if (!this.day2) {
        this.day2 = f.date();
        return;
      }
      if (!this.day3) {
        this.day3 = f.date();
        return;
      }
      if (!this.day4) {
        this.day4 = f.date();
        return;
      }
      if (!this.day5) {
        this.day5 = f.date();
        return;
      }
      if (!this.day6) {
        this.day6 = f.date();
        return;
      }
      if (!this.day7) {
        this.day7 = f.date();
        return;
      }
      if (!this.day8) {
        this.day8 = f.date();
        return;
      }
      if (!this.day9) {
        this.day9 = f.date();
        return;
      }
      if (!this.day10) {
        this.day10 = f.date();
        return;
      }
      if (!this.day11) {
        this.day11 = f.date();
        return;
      }
      if (!this.day12) {
        this.day12 = f.date();
        return;
      }
      if (!this.day13) {
        this.day13 = f.date();
        return;
      }
      if (!this.day14) {
        this.day14 = f.date();
        return;
      }
    })
  }

  getDailySlots() {
    this.availableSlotCount = 0;
    this.availableSlots = this.totalSlots.filter(app => app.date.includes(this.selectedDate));
    this.availableSlots.forEach(element => {
      this.availableSlotCount += element.available_booths;
    });
  }

  onItemChange(item) {
    this.selectedSlot = item
    localStorage.setItem("slot", JSON.stringify(item))
  }

  changeEvent(value) {
    let array = this.enrolmenCenters.filter(app => app.id == value);
    this.enrolmentCenter.registrarName = array[0].registrarName;
    this.enrolmentCenter.ecName =  array[0].ecName;
    this.enrolmentCenter.fullAdrs = array[0].fullAdrs;
    this.enrolmentCenter.subDistrict = array[0].subDistrict;
    this.enrolmentCenter.state = array[0].state;
    this.enrolmentCenter.pinCode = array[0].pinCode;
    this.id = value;
    this.getSlots()
  }
  handleBack() {
    this.router.navigate([APPPOINTEMENT.ROUTERLINKS.SEARCH_ENROLMENT_CENTER]);
  }
}