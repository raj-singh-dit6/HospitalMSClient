import { Component, OnInit, Input } from '@angular/core';
import { Doctor } from '../../../../model/doctor.model';
import { DoctorService } from '../../../../services/doctor.service';
import { ModalService } from '../../../../services/modal.service';
import { Router } from '@angular/router';
import { DoctorEditComponent } from '../doctor-edit/doctor-edit.component';

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.scss']
})
export class DoctorListComponent implements OnInit {
  @Input() hospitalId;
  doctors:Doctor[];
  constructor(private doctorService:DoctorService,private modalService:ModalService) { }

  ngOnInit() {

    this.doctorService.doctorsChanged.subscribe(
      (doctors: Doctor[]) => {
        debugger
        this.doctors = doctors;

    });
    this.doctorService.getDoctorsByHospital(this.hospitalId).subscribe((result)=>{
        if(result.total!=0)
      {
        this.doctors=result.data;
      }
    });
  }
  onEditDoctor(doctor:Doctor)
  {
    this.modalService.open(DoctorEditComponent,doctor.id);
  }

  onDeleteDoctor(doctor:Doctor)
  {

    this.doctorService.deleteDoctor(doctor.id).subscribe(result=>{
    if(result.success)
    {
      this.doctorService.getDoctors().subscribe(result=>{
        if(result.total!=0)
        {
          let doctors:Doctor[]=result.data;
          this.doctorService.doctorsChanged.next(doctors);
        }
      });
    }
    });
  }
}
