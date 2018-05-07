import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadDoctorsComponent } from './head-doctors.component';

describe('HeadDoctorsComponent', () => {
  let component: HeadDoctorsComponent;
  let fixture: ComponentFixture<HeadDoctorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeadDoctorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadDoctorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
