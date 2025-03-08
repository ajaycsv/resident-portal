import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService, AlertService, UtilService } from '../../../services/index';
import { APPPOINTEMENT } from '../../../app-constants'
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-acknowledgement',
  templateUrl: './acknowledgement.component.html',
  styleUrls: ['./acknowledgement.component.scss']
})
export class AcknowledgementComponent implements OnInit {
  loggedInNumber: any;
  selectedCenter: any = {}
  selectedSlot: any = {}
  userId: any;
  loader: boolean = false;
  userData: any = {};
  appointment: any = APPPOINTEMENT
  base64Pdf: string;
  pdfFileUrl;
  pdfFilename: any;
  base64QrImage: any;
  qrImageUrl: any;
  disabledDownloadPrint: boolean = true;
  constructor(private _activateRouter: ActivatedRoute, private _userService: UserService, private _alertService: AlertService, private router: Router, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.loggedInNumber = JSON.parse(localStorage.getItem('loggedInMobile'))
    this.selectedCenter = JSON.parse(localStorage.getItem('selectedCenter'))
    this.selectedSlot = JSON.parse(localStorage.getItem('slot'))
    this.userId = JSON.parse(localStorage.getItem('userId'))
    this.getUser();
    this.updateQrForm();
    history.pushState(null, null, this.router.url);
    window.onpopstate = function () {
      history.go(1);
    };
  }

  getUser() {
    if (this.userId) {
      this._userService.getEnrolment(this.userId).subscribe((res: any) => {
        this.loader = false;
        if (res) {
          this.userData = res.residentEnrolmentEntity ? res.residentEnrolmentEntity : null;
          this.userData.headOfFamilyEntity = res.headOfFamilyEntity ? res.headOfFamilyEntity : null;
        }
      }, err => {
        this.loader = false;
        //this._alertService.error(err.statusText)
      });
    } else if (localStorage.getItem('DraftedUpdated')) {
      let data = JSON.parse(localStorage.getItem('DraftedUpdated'));
      let NameUpdate;
      let DobUpdate;
      let GenderUpdate;
      let MobileUpdate;
      let EmailUpdate;
      let AddressUpdate;
      let BiometricUpdate;
      if (data && data.length > 0) {
        data.forEach(element => {
          NameUpdate = element.filter(app => app.updateType.toUpperCase() === 'NAME');
          DobUpdate = element.filter(app => app.updateType.toUpperCase() === 'DOB');
          GenderUpdate = element.filter(app => app.updateType.toUpperCase() === 'GENDER');
          MobileUpdate = element.filter(app => app.updateType.toUpperCase() === 'MOBILE');
          EmailUpdate = element.filter(app => app.updateType.toUpperCase() === 'EMAIL');
          AddressUpdate = element.filter(app => app.updateType.toUpperCase() === 'ADDRESS');
          BiometricUpdate = element.filter(app => app.updateType.toUpperCase() === 'BIOMETRIC');
        });
      }
      this.userData = {
        appointmentId: (localStorage.getItem('appointmentId')) ? JSON.parse(localStorage.getItem('appointmentId')) : '',
        fullName: (NameUpdate && NameUpdate.length !== 0) ? NameUpdate[0].newValue : '',
        dob: (DobUpdate && DobUpdate.length !== 0) ? DobUpdate[0].newValue : '',
        gender: (GenderUpdate && GenderUpdate.length !== 0) ? GenderUpdate[0].newValue : '',
        pinCode: (AddressUpdate && AddressUpdate.length !== 0) ? AddressUpdate[0].address.pinCode : '',
        adrs1: (AddressUpdate && AddressUpdate.length !== 0) ?  AddressUpdate[0].address.houseNo + ', ' + AddressUpdate[0].address.street + ', ' + AddressUpdate[0].address.area : '',
        landMark: (AddressUpdate && AddressUpdate.length !== 0) ?  AddressUpdate[0].address.landMark : '',
        vtc: (AddressUpdate && AddressUpdate.length !== 0) ?  AddressUpdate[0].address.vtc : '',
        district: (AddressUpdate && AddressUpdate.length !== 0) ?  AddressUpdate[0].address.district : '',
        state: (AddressUpdate && AddressUpdate.length !== 0) ?  AddressUpdate[0].address.state : '',
        mobileNo: (MobileUpdate && MobileUpdate.length !== 0) ? MobileUpdate[0].newValue : localStorage.getItem('loggedInMobile'),
        email: (EmailUpdate && EmailUpdate.length !== 0) ? EmailUpdate[0].newValue : '',
      }
    } else if (localStorage.getItem('updateAadharRecord')) {
      let data = JSON.parse(localStorage.getItem('updateAadharRecord'));
      let NameUpdate = data.filter(app => app.response.updateType.toUpperCase() === 'NAME');
      let DobUpdate = data.filter(app => app.response.updateType.toUpperCase() === 'DOB');
      let GenderUpdate = data.filter(app => app.response.updateType.toUpperCase() === 'GENDER');
      let MobileUpdate = data.filter(app => app.response.updateType.toUpperCase() === 'MOBILE');
      let EmailUpdate = data.filter(app => app.response.updateType.toUpperCase() === 'EMAIL');
      let AddressUpdate = data.filter(app => app.response.updateType.toUpperCase() === 'ADDRESS');
      let addressData: any;
      let BiometricUpdate = data.filter(app => app.response.updateType.toUpperCase() === 'BIOMETRIC');
      if (AddressUpdate && AddressUpdate.length !== 0) {
        addressData = JSON.parse(AddressUpdate[0].response.newValue);
      } else {
        addressData = '';
      }
      this.userData = {
        appointmentId: (localStorage.getItem('appointmentId')) ? JSON.parse(localStorage.getItem('appointmentId')) : '',
        fullName: (NameUpdate && NameUpdate.length !== 0) ? NameUpdate[0].response.newValue : '',
        dob: (DobUpdate && DobUpdate.length !== 0) ? DobUpdate[0].response.newValue : '',
        gender: (GenderUpdate && GenderUpdate.length !== 0) ? GenderUpdate[0].response.newValue : '',
        pinCode: (addressData) ? addressData.pinCode : '',
        adrs1: (addressData) ?  addressData.houseNo : '',
        landMark: (addressData) ?  addressData.landMark : '',
        vtc: (addressData) ?  addressData.vtc : '',
        district: (addressData) ?  addressData.district : '',
        state: (addressData) ?  addressData.state : '',
        mobileNo: (MobileUpdate && MobileUpdate.length !== 0) ? MobileUpdate[0].response.newValue : localStorage.getItem('loggedInMobile'),
        email: (EmailUpdate && EmailUpdate.length !== 0) ? EmailUpdate[0].response.newValue : '',
      }
    }
  }

  download() {
    this.pdfFileUrl = this.sanitizer.bypassSecurityTrustResourceUrl('data:application/pdf;base64,'+ this.base64Pdf);
    this.pdfFilename = 'acknowledgement-' + JSON.parse(localStorage.getItem('appointmentId')) + '.pdf';
  }

  qrImage() {
    this.qrImageUrl = this.sanitizer.bypassSecurityTrustResourceUrl('data:application/png;base64,'+ this.base64QrImage);
  }
  print(): void {
    let pdfWindow = window.open('', '_blank');
    pdfWindow.document.write("<iframe width='100%' height='100%' style='margin:-8px' src='data:application/pdf;base64," + this.base64Pdf +"'></iframe>");
    // window.print();
    // let printContents, popupWin;
    // printContents = document.getElementById('print-section').innerHTML;
    // popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    // popupWin.document.open();
    // popupWin.document.write(`
    //   <html>
    //     <head>
    //       <title>Print tab</title>
    //       <style>
    //       //........Customized style.......
    //       </style>
    //     </head>
    // <body onload="window.print();window.close()">${printContents}</body>
    //   </html>`
    // );
    // popupWin.document.close();
  }

  updateQrForm() {
    let appointmentId = JSON.parse(localStorage.getItem('appointmentId'));
    
    if ( JSON.parse(localStorage.getItem('appointmentType')) === 'UPDATE') {
      
      this._userService.getQrCodeUpdateForm(appointmentId).subscribe((res: any) => {
        this.base64Pdf = (res.payload.pdfContent.data) ? res.payload.pdfContent.data : '';
        this.base64QrImage = (res.payload.qrCodeContent) ? res.payload.qrCodeContent : '';
        this.download();
        this.qrImage();
        this.disabledDownloadPrint = false;
      }, err => {
      })
    } else if ( JSON.parse(localStorage.getItem('appointmentType')) === 'NEW') {
      this._userService.getQrCodeNewForm(appointmentId).subscribe((res: any) => {
        if (res) {
          this.base64Pdf = (res.payload.pdfContent.data) ? res.payload.pdfContent.data : '';
          this.base64QrImage = (res.payload.qrCodeContent) ? res.payload.qrCodeContent : '';
          this.download();
          this.qrImage();
          this.disabledDownloadPrint = false;
        }
      }, err => {
      })
    }
    
  }
}
