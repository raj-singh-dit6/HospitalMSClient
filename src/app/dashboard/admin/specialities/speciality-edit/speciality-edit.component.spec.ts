import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialityEditComponent } from './speciality-edit.component';

describe('SpecialityEditComponent', () => {
  let component: SpecialityEditComponent;
  let fixture: ComponentFixture<SpecialityEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecialityEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialityEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
