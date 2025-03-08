import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseUpdateComponent } from './choose-update.component';

describe('ChooseUpdateComponent', () => {
  let component: ChooseUpdateComponent;
  let fixture: ComponentFixture<ChooseUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
