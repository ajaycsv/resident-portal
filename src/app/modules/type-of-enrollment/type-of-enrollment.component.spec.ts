import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeOfEnrollmentComponent } from './type-of-enrollment.component';

describe('TypeOfEnrollmentComponent', () => {
  let component: TypeOfEnrollmentComponent;
  let fixture: ComponentFixture<TypeOfEnrollmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeOfEnrollmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeOfEnrollmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
