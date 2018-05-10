import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestReportEditComponent } from './test-report-edit.component';

describe('TestReportEditComponent', () => {
  let component: TestReportEditComponent;
  let fixture: ComponentFixture<TestReportEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestReportEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestReportEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
