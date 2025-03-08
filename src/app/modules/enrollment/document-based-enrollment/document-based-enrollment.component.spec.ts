import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentBasedEnrollmentComponent } from './document-based-enrollment.component';

describe('DocumentBasedEnrollmentComponent', () => {
  let component: DocumentBasedEnrollmentComponent;
  let fixture: ComponentFixture<DocumentBasedEnrollmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentBasedEnrollmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentBasedEnrollmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
