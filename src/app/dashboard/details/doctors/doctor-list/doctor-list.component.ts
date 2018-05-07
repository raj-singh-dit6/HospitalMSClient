import { Component, OnInit, Input } from '@angular/core';
import { Doctor } from '../../../../model/doctor.model';
import { DoctorService } from '../../../../services/doctor.service';
import { ModalService } from '../../../../services/modal.service';
import { Router } from '@angular/router';
import { DoctorEditComponent } from '../doctor-edit/doctor-edit.component';
import { ConfirmContentComponent } from '../../../../shared/confirm-content/confirm-content.component';
import { ConfirmService } from '../../../../shared/confirm-content/confirm.service';

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.scss']
})
export class DoctorListComponent implements OnInit {
  @Input() hospitalId;
  doctors:Doctor[];
  constructor(private doctorService:DoctorService,private modalService:ModalService,private confirmService:ConfirmService) { }

  ngOnInit() {

    this.doctorService.doctorsChanged.subscribe(
      (doctors: Doctor[]) => {
        
        this.doctors = doctors;

    });
    this.doctorService.getDoctorsByHospital(this.hospitalId).subscribe((result)=>{
      if(result && result.total!=0)
      {
        this.doctors=result.data;
      }
    });
  }
  onEditDoctor(doctor:Doctor)
  {
    this.modalService.open(DoctorEditComponent,doctor.id,this.hospitalId);
  }

  onDeleteDoctor(doctor:Doctor)
  {
    this.confirmService.open(ConfirmContentComponent).then((result) => {
      let action = `${result}`;
       if(action.indexOf('yes')!=-1)
       {
        this.doctorService.deleteDoctor(doctor.id).subscribe(result=>{
        if(result.success)
        {
          this.doctorService.getDoctorsByHospital(this.hospitalId).subscribe(result=>{
            if(result && result.total!=0)
            {
              let doctors:Doctor[]=result.data;
              this.doctorService.doctorsChanged.next(doctors);
            }
          });
        }
        });
      }
    });
  }
}
