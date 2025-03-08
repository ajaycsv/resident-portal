import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewEnrollmentComponent } from './review-enrollment.component';

describe('ReviewEnrollmentComponent', () => {
  let component: ReviewEnrollmentComponent;
  let fixture: ComponentFixture<ReviewEnrollmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewEnrollmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewEnrollmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
