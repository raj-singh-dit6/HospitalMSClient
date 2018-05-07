import { Component, OnInit, Input } from '@angular/core';
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
  @Input() hospitalId:string;
  constructor(private doctorService:DoctorService,private route:ActivatedRoute,private modalService:ModalService) { 
    // this.hospitalId = route.snapshot.paramMap.get('hospitalId');
  }

  ngOnInit() {
  }
  onNewDoctor()
  {
     this.modalService.open( DoctorEditComponent,'',this.hospitalId);
  }
}
