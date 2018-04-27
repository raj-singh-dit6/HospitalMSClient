import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControlName, Validators, FormControl, FormArray } from '@angular/forms';
import { Occupancy } from '../../../../model/occupany.model';
import { OccupancyService } from '../../../../services/occupancy.service';

@Component({
  selector: 'app-hospital-edit',
  templateUrl: './hospital-edit.component.html',
  styleUrls: ['./hospital-edit.component.css'],
})
export class HospitalEditComponent implements OnInit {
  @Input() id:any;
  hospitalForm:FormGroup;
  occupencies:Occupancy[];
  editMode=false;
  constructor(public activeModal: NgbActiveModal,private occupancyService:OccupancyService) { }

  ngOnInit() {
    if(this.id!=""){
      this.editMode=true;
    }
    this.occupancyService.getOccupancies().subscribe(result=>{
      this.occupencies=result.data;
      console.log(this.occupencies);
    })
    this.initForm();
   
  }

  initForm(){
    if(this.editMode==true){

      }else{

        let hospitalRooms = new FormArray([]);
        this.hospitalForm= new FormGroup({
          'name':new FormControl('',Validators.required),
          'rooms': hospitalRooms
        })

    }
  }

  onAddRoom() {
    (<FormArray>this.hospitalForm.get('rooms')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required)
      })
    );
  }

  onDeleteRoom(index: number) {
    (<FormArray>this.hospitalForm.get('rooms')).removeAt(index);
  }
}