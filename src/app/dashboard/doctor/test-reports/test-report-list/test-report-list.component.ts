import { Component, OnInit, Input } from '@angular/core';
import { TestService } from '../../../../services/test.service';
import { Test } from '../../../../model/test.model';
import { TestReport } from '../../../../model/testReport.model';
import { TestReportService } from '../../../../services/testReport.service';
import { ModalService } from '../../../../services/modal.service';
import { TestReportEditComponent } from '../test-report-edit/test-report-edit.component';
import { ConfirmContentComponent } from '../../../../shared/confirm-content/confirm-content.component';
import { ConfirmService } from '../../../../shared/confirm-content/confirm.service';

@Component({
  selector: 'app-test-report-list',
  templateUrl: './test-report-list.component.html',
  styleUrls: ['./test-report-list.component.scss']
})
export class TestReportListComponent implements OnInit {
  testReports:TestReport[];
  @Input() patientId:string;
  
  constructor(private testReportService:TestReportService,private modalService:ModalService,private confirmService:ConfirmService){ }

  ngOnInit() {    
    this.testReportService.getTestReportReportsByPatient(this.patientId).subscribe(result=>{
      if(result && result.total!=0)
      {
        this.testReports=result.data;
      }
    });

  }

  onEditTestReport(testReport:TestReport)
  {
    this.modalService.open(TestReportEditComponent,testReport.id,this.patientId);
  }

  onDeleteTestReport(testReport:TestReport)
  {
    this.confirmService.open(ConfirmContentComponent).then((result) => {
      let action = `${result}`;
       if(action.indexOf('yes')!=-1)
       {
        this.testReportService.deleteTestReport(testReport.id).subscribe(result=>{
        if(result.success)
        {
          this.testReportService.getTestReportReportsByPatient(this.patientId).subscribe(result=>{
            if(result && result.total!=0)
            {
              let testReports:TestReport[]=result.data;
              this.testReportService.testReportsChanged.next(testReports);
            }
          });
        }
        });
      }
    });
  }

}
