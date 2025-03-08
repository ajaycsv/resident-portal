import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEnrolmentComponent } from './update-enrolment.component';

describe('UpdateEnrolmentComponent', () => {
  let component: UpdateEnrolmentComponent;
  let fixture: ComponentFixture<UpdateEnrolmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateEnrolmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateEnrolmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
