import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmittPatientsComponent } from './admitt-patients.component';

describe('AdmittPatientsComponent', () => {
  let component: AdmittPatientsComponent;
  let fixture: ComponentFixture<AdmittPatientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmittPatientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmittPatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
