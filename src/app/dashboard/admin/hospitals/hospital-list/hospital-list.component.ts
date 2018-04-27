import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../../../services/hospital.service';
import { Hospital } from '../../../../model/hospital.model';

@Component({
  selector: 'app-hospital-list',
  templateUrl: './hospital-list.component.html',
  styleUrls: ['./hospital-list.component.css']
})
export class HospitalListComponent implements OnInit {
  hospitals:Hospital[];
  
  constructor(private hospitalService:HospitalService) { }

  ngOnInit() {
      this.hospitalService.getHospitals().subscribe((result)=>{
         this.hospitals=result.data;
     });
  }


}
