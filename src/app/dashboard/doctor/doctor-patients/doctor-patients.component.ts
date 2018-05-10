import { Component, OnInit, Input } from '@angular/core';
import { Doctor } from '../../../model/doctor.model';
import { PatientService } from '../../../services/patient.service';
import { Patient } from '../../../model/patient.model';
import { ModalService } from '../../../services/modal.service';
import { AdmittPatientsComponent } from '../admitt-patients/admitt-patients.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor-patients',
  templateUrl: './doctor-patients.component.html',
  styleUrls: ['./doctor-patients.component.scss']
})
export class DoctorPatientsComponent implements OnInit {
  @Input() doctorId:number;
  patients:Patient[];
  constructor(private patientService:PatientService,private modalService:ModalService,private router:Router) { }

  ngOnInit() {
    this.patientService.getPatientsByDoctor(this.doctorId).subscribe(result=>{
      if(result && result.total!=0){
        this.patients= result.data;
      }
    });
  }

  onAdmit(patient:Patient)
  {
    this.modalService.open(AdmittPatientsComponent,patient,this.doctorId);
  }

  onTestReports(patient:Patient){
    this.router.navigate(['/test-reports',patient.id]);
  }
  
}