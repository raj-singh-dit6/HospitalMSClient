import { Component, OnInit } from '@angular/core';
import { HospitalEditComponent } from './hospital-edit/hospital-edit.component';
import { ModalService } from '../../../services/modal.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styleUrls: ['./hospitals.component.css']
})
export class HospitalsComponent implements OnInit {

  constructor(private modalService:ModalService,private router:Router) { }

  ngOnInit() {
  }

  onNewHospital()
  {
     this.modalService.open( HospitalEditComponent,'','');
  }

}
