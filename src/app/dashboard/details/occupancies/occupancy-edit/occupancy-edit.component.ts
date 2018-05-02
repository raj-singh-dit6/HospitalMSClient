import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { OccupancyService } from '../../../../services/occupancy.service';

@Component({
  selector: 'app-occupancy-edit',
  templateUrl: './occupancy-edit.component.html',
  styleUrls: ['./occupancy-edit.component.scss']
})
export class OccupancyEditComponent implements OnInit {
  @Input() id:any;
  occupancyForm:FormGroup;
  editMode=false;
  constructor(public activeModal: NgbActiveModal,private occupService:OccupancyService) { }

  ngOnInit() {
    this.editMode = this.id!=null && this.id!='';
    this.initForm();
   
  }

  initForm(){
    if(this.editMode==true){
    
      }else{

        this.occupancyForm = new FormGroup({
          'occupType':new FormControl('',Validators.required),
        })

    }
  }

   onSubmit() {
    if (this.editMode) {
      this.occupService.updateOccupancy(this.occupancyForm.value);
    } else {
      this.occupService.addOccupancy(this.occupancyForm.value);
    }
  }

}

