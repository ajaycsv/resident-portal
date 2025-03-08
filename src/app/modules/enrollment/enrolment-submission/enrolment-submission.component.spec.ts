import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrolmentSubmissionComponent } from './enrolment-submission.component';

describe('EnrolmentSubmissionComponent', () => {
  let component: EnrolmentSubmissionComponent;
  let fixture: ComponentFixture<EnrolmentSubmissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnrolmentSubmissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrolmentSubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
