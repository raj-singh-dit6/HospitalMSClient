import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HospHeadComponent } from './hosp-head.component';

describe('HospHeadComponent', () => {
  let component: HospHeadComponent;
  let fixture: ComponentFixture<HospHeadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HospHeadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HospHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
