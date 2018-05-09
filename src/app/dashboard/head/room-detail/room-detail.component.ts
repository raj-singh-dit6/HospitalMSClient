import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Patient } from '../../../model/patient.model';
import { PatientService } from '../../../services/patient.service';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.scss']
})
export class RoomDetailComponent implements OnInit {

  roomId:string;
  patients:Patient[];
  constructor(route : ActivatedRoute,private patientService:PatientService)
  {
    this.roomId = route.snapshot.paramMap.get('roomId');
  }
  ngOnInit() {
    this.patientService.getPatientsByRoom(this.roomId).subscribe(result=>{
      if(result && result.total!=0)
      {
        this.patients=result.data;
      }
    });

  }

}
