import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadPatientsComponent } from './head-patients.component';

describe('HeadPatientsComponent', () => {
  let component: HeadPatientsComponent;
  let fixture: ComponentFixture<HeadPatientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeadPatientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadPatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
