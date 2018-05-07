import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadRoomsComponent } from './head-rooms.component';

describe('HeadRoomsComponent', () => {
  let component: HeadRoomsComponent;
  let fixture: ComponentFixture<HeadRoomsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeadRoomsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
