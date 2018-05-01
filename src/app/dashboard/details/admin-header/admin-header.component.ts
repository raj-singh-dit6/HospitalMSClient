import { Component, OnInit, Input } from '@angular/core';
import { RoomService } from '../../../services/room.service';
import { DoctorService } from '../../../services/doctor.service';
import { PatientService } from '../../../services/patient.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent implements OnInit {
  @Input() hospitalId:string;

  constructor(private roomService:RoomService,private doctor:DoctorService,private patientService:PatientService,private router:Router) { }

  ngOnInit() {  
  
  }

}
