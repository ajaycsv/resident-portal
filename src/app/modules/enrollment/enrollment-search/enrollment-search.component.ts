import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { APPPOINTEMENT } from '../../../app-constants';
import { UtilService, AlertService, EnrollmentCenterSearchService } from '../../../services/index';
import { Location } from '@angular/common';
import { flatMap } from 'rxjs/operators';
@Component({
  selector: 'app-enrollment-search',
  templateUrl: './enrollment-search.component.html',
  styleUrls: ['./enrollment-search.component.scss']
})
export class EnrollmentSearchComponent implements OnInit {
  appointment: any = APPPOINTEMENT
  globalSearchForm: FormGroup;
  pinCodeSearchForm: FormGroup;
  stateCenterSearchForm: FormGroup
  enrolmenCenters: any = [];
  loader: boolean = false;
  pinCodeSubmitted = false;
  searchTextSubmitted = false;
  searchStateFormSubmitted = false;
  pinCode: any;
  searchText: any;
  bodyHeight: any = document.body.clientHeight;
  statesData: any = [];
  districtData: any = [];
  subDistrictData: any = [];
  vtcData: any = [];
  enrolmenCentersFlag = false;

  constructor(private formBuilder: FormBuilder, private _route: Router, private _alertService: AlertService, private _enrollmentCenterService: EnrollmentCenterSearchService,
    private _utilService: UtilService) { }

  ngOnInit() {
    this.globalSearchForm = this.formBuilder.group({
      searchName: ['', [Validators.required, Validators.max(6)]]
    })

    this.pinCodeSearchForm = this.formBuilder.group({
      searchPincode: ['', Validators.required]
    })

    this.stateCenterSearchForm = this.formBuilder.group({
      searchState: ['', [Validators.required]],
      searchDistrict: ['', [Validators.required]],
      searchSubDistrict: ['', [Validators.required]],
      searchVillage: ['', [Validators.required]]
    });

    this._enrollmentCenterService.getAllStateDetails().subscribe((res) => {
      if(res) {
        this.statesData = res;
      }
    }, err => {
      this._alertService.error(err.statusText)
    });

    this.stateCenterSearchForm.get('searchState').valueChanges.subscribe((res) => {
      this.stateCenterSearchForm.patchValue({
        searchDistrict:'',
        searchSubDistrict:'',
        searchVillage:''
      });
      if (this.stateCenterSearchForm.get('searchState').value !== '') {
        this._enrollmentCenterService.getDistrictDetailsByStateCode(res).subscribe((res) => {
          if(res) {
            this.districtData = res;
          }
        }, err => {
          this._alertService.error(err.statusText)
        });
      }
    });

    this.stateCenterSearchForm.get('searchDistrict').valueChanges.subscribe((res) => {
      this.stateCenterSearchForm.patchValue({
        searchSubDistrict:'',
        searchVillage:''
      });
      if (this.stateCenterSearchForm.get('searchDistrict').value !==  '') { 
        this._enrollmentCenterService.getSubDistByDistrictCode(res).subscribe((res) => {
          if(res) {
            this.subDistrictData = res;
          }
        }, err => {
          this._alertService.error(err.statusText)
        });
      }
    });

    this.stateCenterSearchForm.get('searchSubDistrict').valueChanges.subscribe((res) => {
      this.stateCenterSearchForm.patchValue({
        searchVillage:''
      });
      if (this.stateCenterSearchForm.get('searchSubDistrict').value !==  '') {
        this._enrollmentCenterService.getVtcBySubDistCode(res).subscribe((res) => {
          if(res) {
            this.vtcData = res;
          }
        }, err => {
          this._alertService.error(err.statusText)
        });
      }
      
    });
  }
  get g() { return this.globalSearchForm.controls; }
  get p() { return this.pinCodeSearchForm.controls; }
  get s() { return this.stateCenterSearchForm.controls; }

  keyPress(event: any) {
    this._utilService.keyPress(event)
  }
  onSubmitGlobalSearch(f) {
    this.searchTextSubmitted = true;
    if (this.globalSearchForm.invalid) {
      return;
    }
    this.searchText = f.searchName.value;
    this.getEnrollmentBasedOnFreeText(this.searchText)
  }

  onSubmitPinCodeSearch(f) {
    this.pinCodeSubmitted = true;
    if (this.pinCodeSearchForm.invalid) {
      return;
    }
    this.pinCode = f.searchPincode.value;
    this.getEnrollmentBasedOnPinCode(this.pinCode)
  }

  onSubmitStateSearch(f) {
    this.searchStateFormSubmitted = true;
    if (this.stateCenterSearchForm.invalid) {
      return;
    }
    this.getEnrollmentBasedOnVtc(f);
  }

  handleSlotBooking(center) {
    localStorage.setItem('selectedCenter', JSON.stringify(center))
    this._route.navigate([APPPOINTEMENT.ROUTERLINKS.SLOT_BOOKING, center.id]);
  }

  /**API CALLS */
  getEnrollmentBasedOnPinCode(code) {
    this.loader = true;
    this._enrollmentCenterService.getEnrollmentCenterByPinCode(code).subscribe((res: any) => {
      this.loader = false;
      if (res && !res.error) {
        this.enrolmenCenters = [];
        this.enrolmenCenters = res;
        localStorage.setItem('enrolmenCenters', JSON.stringify(this.enrolmenCenters))
      } else {
        this.enrolmenCenters = [];
        this.enrolmenCentersFlag =  false;
      }
    }, err => {
      this.loader = false;
      this.enrolmenCenters = [];
     // this._alertService.error(err.statusText)
    })
  }

  getEnrollmentBasedOnFreeText(txt) {
    this.loader = true;
    this._enrollmentCenterService.getEnrollmentCenterByText(txt).subscribe((res: any) => {
      this.loader = false;
      if (res && !res.error) {
        this.enrolmenCenters = [];
        this.enrolmenCenters = res;
        localStorage.setItem('enrolmenCenters', JSON.stringify(this.enrolmenCenters))
      } else {
        this.enrolmenCenters = []
      }
    }, err => {
      this.loader = false;
      this.enrolmenCenters = [];
     // this._alertService.error(err.statusText)
    })
  }

  getEnrollmentBasedOnVtc(data) {
    this.loader = true;
    let vtc = this.vtcData.filter(app => app.villageCode === data.searchVillage.value);
    let state = this.statesData.filter(app => app.stateCode === data.searchState.value);
    let district = this.districtData.filter(app => app.districtCode === data.searchDistrict.value);
    let subDist = this.subDistrictData.filter(app => app.subDistrictCode === data.searchSubDistrict.value);
    let payload = {
      state: state[0].stateName,
      district: district[0].districtName,
      subDistrict: subDist[0].subdistrictName,
      vtc: vtc[0].villageName
    };
    this._enrollmentCenterService.searchEnrollmentCenter(payload).subscribe((res: any) => {
      this.loader = false;
      if (res && res.length !== 0 && !res.error) {
        this.enrolmenCenters = [];
        this.enrolmenCenters = res;
        localStorage.setItem('enrolmenCenters', JSON.stringify(this.enrolmenCenters))
      } else if (res.length === 0 && !res.error) {
        this.enrolmenCenters = [];
        this.enrolmenCentersFlag =  true;
      }  else {
        this.enrolmenCenters = []
      }
    }, err => {
      this.loader = false;
      this.enrolmenCenters = [];
      this._alertService.error(err.statusText)
    })
  }
}
