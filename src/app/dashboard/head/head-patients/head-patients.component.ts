import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../../model/hospital.model';
import { UserInfo } from '../../../model/UserInfo.model';
import { RoomService } from '../../../services/room.service';
import { Patient } from '../../../model/patient.model';
import { PatientService } from '../../../services/patient.service';

@Component({
  selector: 'app-head-patients',
  templateUrl: './head-patients.component.html',
  styleUrls: ['./head-patients.component.scss']
})
export class HeadPatientsComponent implements OnInit {
  hospital:Hospital;
  userInfo:UserInfo;
  patients:Patient[];
  constructor(private patientService:PatientService) { }

  ngOnInit() {
    let currentUser= localStorage.getItem('user');
    this.userInfo = JSON.parse(localStorage.getItem('user')) || { userName: '' }; 
    this.hospital=this.userInfo.hospital;
    this.patientService.getPatientsByHospital(this.hospital.id).subscribe(result=>{
      if(result && result.total!=0){
        this.patients=result.data;
      }
    });
  }

}
