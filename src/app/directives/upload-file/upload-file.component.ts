import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {

  @Output() messageEvent = new EventEmitter<string>();

  submitted = false;
  uploadDocumentForm: FormGroup;
  uploadedFileName: any


  constructor(private formBuilder: FormBuilder, ) { }

  ngOnInit() {
    this.uploadDocumentForm = this.formBuilder.group({
      file: ['', [Validators.required, this.fileValidator()]]
    });
  }

  get f() {
    return this.uploadDocumentForm.controls;
  }

  onFileChange(event) {
    this.submitted = true;
    const reader = new FileReader();
    let file = event.target.files[0]
    this.uploadDocumentForm.controls['file'].setValue(file ? file.name : '');
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      // reader.onload = () => {
      //   this.uploadDocumentForm.patchValue({
      //     file: reader.result
      //   });
      //   reader.readAsDataURL(file);
      // need to run CD since file load runs outside of zone
      //   this.cd.markForCheck();
      //};
    }
    this.uploadedFileName = file;
    // if (!this.f.file.errors.required && !this.f.file.errors.fileType) {
    this.messageEvent.emit(this.uploadedFileName)
    // }
  }

  fileValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (!control.value.includes('.jpg')) {
        return { 'fileType': true };
      }
      return null;
    };
  }
  onSubmit(f) {
    
  }
}
