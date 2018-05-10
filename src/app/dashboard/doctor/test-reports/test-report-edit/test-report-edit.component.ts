import { Component, OnInit, Input } from '@angular/core';
import { Test } from '../../../../model/test.model';
import { TestService } from '../../../../services/test.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { TestReportService } from '../../../../services/testReport.service';
import { TestReport } from '../../../../model/testReport.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PatientService } from '../../../../services/patient.service';
import { Patient } from '../../../../model/patient.model';

@Component({
  selector: 'app-test-report-edit',
  templateUrl: './test-report-edit.component.html',
  styleUrls: ['./test-report-edit.component.scss']
})
export class TestReportEditComponent implements OnInit {
  @Input() id: any;
  @Input() id2: any;
  patient:Patient;
  tests:Test[];
  testReportForm:FormGroup;
  editMode=false;
  
  constructor(public activeModal:NgbActiveModal,private patientService:PatientService,private testService:TestService,private testReportService:TestReportService,private formBuilder:FormBuilder) {}
  
  
  ngOnInit() {
    this.editMode=this.id!=null && this.id!='';
    this.testService.getTests().subscribe(result=>{
      if(result && result.total!=0)
      {
        this.tests=result.data;
      }
      
    });
    this.patientService.getPatient(this.id2).subscribe(result=>{
      if(result && result.total!=0)
      {
        this.patient=result.data;
      }
      
    });

    this.initForm();
  }
  
    private initForm() {
      this.testReportForm = this.formBuilder.group({});
      let test:number;
      let description:string;
      if (this.editMode) {
        let testReport: TestReport;
        this.testReportService.getTestReport(this.id).subscribe(result => {
          if(result && result.total!=0)
          {
            testReport = result.data
            test = testReport.test.id;
            description = testReport.description;
              
            this.createForm(test,description);
          }
        });
      }else{
          this.createForm();
      }
    }
    
    createForm(test:any='',description:any=''){
  
      this.testReportForm = this.formBuilder.group({
        'test': new FormControl(test, Validators.required),
        'description': new FormControl(description),
      });
    }
  
    onSubmit() {
      const testId=this.testReportForm.get('test').value;
      const updateTestReport:any=this.testReportForm.value;
      const test=this.tests.find(x=>x.id==testId);
      const testReport:TestReport=new TestReport(this.id,test,updateTestReport.description,this.patient);
      if (this.editMode) {
        this.testReportService.updateTestReport(testReport).subscribe(result => {
          if (result.success) {
            this.testReportService.getTestReportReportsByPatient(this.id2).subscribe(result=>{
              if(result && result.total!=0)
              {
                let testReports:TestReport[]=result.data;
                this.testReportService.testReportsChanged.next(testReports);
              }
            });
          }
        });
      } else {
        this.testReportService.addTestReport(testReport).subscribe(result => {
          if (result.success) {
            this.testReportService.getTestReportReportsByPatient(this.id2).subscribe(result=>{
              if(result && result.total!=0)
              {
                let testReports:TestReport[]=result.data;
                this.testReportService.testReportsChanged.next(testReports);
              }
            });
          }      
        });
      }
      this.activeModal.close();
    }
  
}
  
