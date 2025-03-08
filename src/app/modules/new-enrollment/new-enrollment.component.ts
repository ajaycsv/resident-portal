import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { APPPOINTEMENT } from '../../app-constants';
@Component({
  selector: 'app-new-enrollment',
  templateUrl: './new-enrollment.component.html',
  styleUrls: ['./new-enrollment.component.scss']
})
export class NewEnrollmentComponent implements OnInit {
  validationMessages: any = APPPOINTEMENT
  registerForm: FormGroup;
  submitted = false;
  genders = ['Male', 'Female', 'Transgender'];
  default: string = 'Male'
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      gender: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
    this.registerForm.controls['gender'].setValue(this.default, { onlySelf: true });
  }

  get f() { return this.registerForm.controls; }

  onSubmit(NgForm) {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value))
  }
}
