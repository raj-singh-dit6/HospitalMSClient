import { Component, OnInit, Input } from '@angular/core';
import { PatientEditComponent } from './patient-edit/patient-edit.component';
import { PatientService } from '../../../services/patient.service';
import { ActivatedRoute } from '@angular/router';
import { ModalService } from '../../../services/modal.service';
import { Patient } from '../../../model/patient.model';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit {

  @Input() hospitalId:string;
  constructor(private patientService:PatientService,private route:ActivatedRoute,private modalService:ModalService) { 
  }

  ngOnInit() {


  }
  onNewPatient()
  {
     this.modalService.open( PatientEditComponent,'',this.hospitalId);
  }
}
