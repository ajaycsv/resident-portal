import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicEnrollmentComponent } from './basic-enrollment.component';

describe('BasicEnrollmentComponent', () => {
  let component: BasicEnrollmentComponent;
  let fixture: ComponentFixture<BasicEnrollmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicEnrollmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicEnrollmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
