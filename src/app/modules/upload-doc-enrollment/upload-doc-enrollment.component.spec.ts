import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadDocumentEnrollmentComponent } from './upload-doc-enrollment.component';

describe('DocumentEnrollmentComponent', () => {
  let component: UploadDocumentEnrollmentComponent;
  let fixture: ComponentFixture<UploadDocumentEnrollmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadDocumentEnrollmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadDocumentEnrollmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
