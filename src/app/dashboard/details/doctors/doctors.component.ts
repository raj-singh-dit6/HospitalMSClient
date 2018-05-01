import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../../services/doctor.service';
import { Doctor } from '../../../model/doctor.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalService } from '../../../services/modal.service';
import { DoctorEditComponent } from './doctor-edit/doctor-edit.component';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.scss']
})
export class DoctorsComponent implements OnInit {
  hospitalId:string;
  doctors:Doctor[];
  constructor(private doctorService:DoctorService,private route:ActivatedRoute,private modalService:ModalService) { 
    this.hospitalId = route.snapshot.paramMap.get('hospitalId');
  }

  ngOnInit() {
    
    this.doctorService.getDoctorsByHospital(this.hospitalId).subscribe(result=>{
      if(result.total!=0)
      {
        this.doctors=result.data;
      }
    });

  }
  onNewDoctor()
  {
     this.modalService.open( DoctorEditComponent,'');
  }
}
