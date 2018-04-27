import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OccupanciesComponent } from './occupancies.component';

describe('OccupanciesComponent', () => {
  let component: OccupanciesComponent;
  let fixture: ComponentFixture<OccupanciesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OccupanciesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OccupanciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
