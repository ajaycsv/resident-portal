import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEnrollmentComponent } from './new-enrollment.component';

describe('NewEnrollmentComponent', () => {
  let component: NewEnrollmentComponent;
  let fixture: ComponentFixture<NewEnrollmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewEnrollmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEnrollmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
