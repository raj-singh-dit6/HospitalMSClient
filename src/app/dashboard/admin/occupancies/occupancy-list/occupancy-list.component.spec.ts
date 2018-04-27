import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OccupancyListComponent } from './occupancy-list.component';

describe('OccupancyListComponent', () => {
  let component: OccupancyListComponent;
  let fixture: ComponentFixture<OccupancyListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OccupancyListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OccupancyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
