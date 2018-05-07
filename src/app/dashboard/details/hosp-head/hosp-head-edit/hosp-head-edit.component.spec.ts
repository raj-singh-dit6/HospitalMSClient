import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadEditComponent } from './head-edit.component';

describe('HeadEditComponent', () => {
  let component: HeadEditComponent;
  let fixture: ComponentFixture<HeadEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeadEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
