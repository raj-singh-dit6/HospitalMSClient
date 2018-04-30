import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControlName, Validators, FormControl, FormArray } from '@angular/forms';
import { SpecialityService } from '../../../../services/speciality.service';
import { Speciality } from '../../../../model/speciality.model';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-speciality-edit',
  templateUrl: './speciality-edit.component.html',
  styleUrls: ['./speciality-edit.component.scss']
})

export class SpecialityEditComponent implements OnInit {
  @Input() id:any;
  specialityForm:FormGroup;
  editMode=false;
  constructor(public activeModal: NgbActiveModal,private specialityService:SpecialityService,private router:Router) { }

  ngOnInit() {     
      this.editMode = this.id != '';
      this.initForm();   
  }

  private initForm(){
    let type='';
    if(this.editMode==true){
      let speciality:any;
      this.specialityService.getSpeciality(this.id).subscribe(result=>{
      if(result.total!=0){
          speciality=result.data;
          type=speciality.type;
        }
      }); 
    } 
    this.specialityForm= new FormGroup({
      'type':new FormControl(type,Validators.required),
    })
  }

  onSubmit(){
    this.specialityService.addSpeciality(this.specialityForm.value).subscribe(result=>{
      if(result.success)
      {
        let specialities:Speciality[]=[];
        this.specialityService.getSpecialities().subscribe((result)=>{
          if(result.total!=0)
          {
            specialities=result.data;
          }
        });
        this.specialityService.specialitiesChanged.next(specialities);
        debugger
        this.activeModal.close();
      }
    })
  }

}
