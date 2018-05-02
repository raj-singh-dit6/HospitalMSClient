import { Component, OnInit, OnDestroy } from '@angular/core';
import { HospitalService } from '../../../../services/hospital.service';
import { Hospital } from '../../../../model/hospital.model';
import { ModalService } from '../../../../services/modal.service';
import { HospitalEditComponent } from '../hospital-edit/hospital-edit.component';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hospital-list',
  templateUrl: './hospital-list.component.html',
  styleUrls: ['./hospital-list.component.css']
})
export class HospitalListComponent implements OnInit,OnDestroy {
  hospitals:Hospital[];
  hospitalSubs:Subscription;
  
  constructor(private hospitalService:HospitalService,private modalService:ModalService,private router:Router) { }

  ngOnInit() {

    this.hospitalSubs= this.hospitalService.hospitalChanged
    .subscribe(
      (hospitals: Hospital[]) => {
        debugger
        this.hospitals = hospitals;
      }
    );

    this.hospitalService.getHospitals().subscribe((result)=>{
        if(result.total!=0)
      {
        this.hospitals=result.data;
      }
    });
  }
  onEditHospital(hospital:Hospital)
  {
    this.modalService.open(HospitalEditComponent,hospital.id,'');
  }

  onDeleteHospital(hospital:Hospital)
  {

    this.hospitalService.deleteHospital(hospital.id).subscribe(result=>{
    if(result.success)
    {
      this.hospitalService.getHospitals().subscribe(result=>{
        if(result.total!=0)
        {
          let hospitals:Hospital[]=result.data;
          this.hospitalService.hospitalChanged.next(hospitals);
        }
      });
    }
    });
  }
  
  ngOnDestroy()
  {
    this.hospitalSubs.unsubscribe();
  }

}
