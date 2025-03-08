import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressEnrollmentComponent } from './address-enrollment.component';

describe('AddressEnrollmentComponent', () => {
  let component: AddressEnrollmentComponent;
  let fixture: ComponentFixture<AddressEnrollmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddressEnrollmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressEnrollmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
