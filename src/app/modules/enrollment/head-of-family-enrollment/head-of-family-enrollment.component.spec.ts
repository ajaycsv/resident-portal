import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadOfFamilyEnrollmentComponent } from './head-of-family-enrollment.component';

describe('HeadOfFamilyEnrollmentComponent', () => {
  let component: HeadOfFamilyEnrollmentComponent;
  let fixture: ComponentFixture<HeadOfFamilyEnrollmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeadOfFamilyEnrollmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadOfFamilyEnrollmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
