import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Patient } from '../../../model/patient.model';
import { PatientService } from '../../../services/patient.service';

@Component({
  selector: 'app-doctor-detail',
  templateUrl: './doctor-detail.component.html',
  styleUrls: ['./doctor-detail.component.scss']
})
export class DoctorDetailComponent implements OnInit {

  doctorId:string;
  patients:Patient[];
  constructor(route : ActivatedRoute,private patientService:PatientService)
  {
    this.doctorId = route.snapshot.paramMap.get('doctorId');
  }

  ngOnInit() {
    this.patientService.getPatientsByDoctor(this.doctorId).subscribe(result=>{
      if(result && result.total!=0)
      {
        this.patients=result.data;
        console.log(this.patients);
      }
    });
  }

  onTestReports(patient:Patient)
  {
    
  }
}
