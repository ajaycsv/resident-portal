import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { Location } from '@angular/common';
import { APPPOINTEMENT } from '../../../app-constants';
import { UploadService} from '../../../services/index';

@Component({
  selector: 'app-photo-upload',
  templateUrl: './photo-upload.component.html',
  styleUrls: ['./photo-upload.component.scss'],
  providers: [UploadService]
})
export class PhotoUploadComponent implements OnInit {
  validationMessages: any = APPPOINTEMENT
  submitted = false;
  photoUploadForm: FormGroup;
  receivedFileName: any
  imageUrl: any;
 
  constructor(private formBuilder: FormBuilder, private _uploadService: UploadService, ) { }

  ngOnInit() {
    this.photoUploadForm = this.formBuilder.group({
      file: ['', [Validators.required, this.ageRangeValidator()]]
    });
  }

  get f() { return this.photoUploadForm.controls; }

  uploadImage() {
    let formdata = new FormData();
    formdata.append('file',this.receivedFileName)
    formdata.append('userId','12345')
    formdata.append('docType','12345')
    this._uploadService.uploadImage(formdata).subscribe((res: any) => {
      this.imageUrl = res;
      // const a = document.createElement('a');
      // a.href = URL.createObjectURL(this.imageUrl.fileDownloadUri);
      // a.download = "title";
      // document.body.appendChild(a);
      // a.click();
    })
  }
  receiveMessage($event) {
    this.receivedFileName = $event
    if(this.receivedFileName) {
      this.uploadImage()
    }
  }
  ageRangeValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (!control.value.includes('.jpg')) {
        return { 'fileType': true };
      }
      return null;
    };
  }
  onSubmit(Ngform) {
    this.submitted = true;
    // stop here if form is invalid
    if (this.photoUploadForm.invalid) {
      return;
    }
    // this.goToNext = true;
    let tabs = {
      "addressTab": false,
      "photoTab": false,
      "reviewTab": true
    }
    localStorage.setItem('tabs',JSON.stringify(tabs));
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.photoUploadForm.value))
  }
}
