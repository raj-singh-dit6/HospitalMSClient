import { Component, OnInit } from '@angular/core';
import { Test } from '../../../model/test.model';
import { ActivatedRoute } from '@angular/router';
import { ModalService } from '../../../services/modal.service';
import { TestReportEditComponent } from './test-report-edit/test-report-edit.component';

@Component({
  selector: 'app-test-reports',
  templateUrl: './test-reports.component.html',
  styleUrls: ['./test-reports.component.scss']
})
export class TestReportsComponent implements OnInit {
  patientId:string;
  
  constructor(route : ActivatedRoute,private modalService:ModalService)
  {
    this.patientId = route.snapshot.paramMap.get('patientId');
  }

  ngOnInit() {
   }

   onNewTestReport(){
      this.modalService.open(TestReportEditComponent,'',this.patientId)
   }
}
