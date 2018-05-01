import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControlName, Validators, FormControl, FormArray, FormBuilder } from '@angular/forms';
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
  constructor(public activeModal: NgbActiveModal,
    private formBuilder : FormBuilder,
    private specialityService:SpecialityService,private router:Router) { }

  ngOnInit() {     
      this.editMode = (this.id!=null && this.id!='');
      this.initForm();   
  }

  private initForm(){
    this.specialityForm= this.formBuilder.group({});

    if(this.editMode){
      let speciality:any;

      this.specialityService.getSpeciality(this.id).subscribe(result=>{
      if(result.total!=0){
          speciality=result.data;
          debugger
          this.createForm(speciality.type);
        }
      }); 
    } 
    else{
      this.createForm();
    }
  }

  createForm(type : any= ''):void{
    let formBuilder = this.formBuilder;
    this.specialityForm= formBuilder.group({
      'type': formBuilder.control(type,Validators.required),
    })
  }

  onSubmit(){

    if(this.editMode){
      this.specialityService.addSpeciality(this.specialityForm.value).subscribe(result=>{
        if(result.success)
        {
          this.specialityService.getSpecialities().subscribe((result)=>{
            if(result.total!=0)
            {
              let specialities:Speciality[]=result.data;
              this.specialityService.specialitiesChanged.next(specialities);
              debugger;
            }
          });
        }
      });
    }else{
      this.specialityService.updateSpeciality(this.specialityForm.value).subscribe(result=>{
        if(result.success)
        {
          this.specialityService.getSpecialities().subscribe((result)=>{
            if(result.total!=0)
            {
              let specialities:Speciality[]=result.data;
              this.specialityService.specialitiesChanged.next(specialities);
              debugger;
            }
          });
        }
      });
    }
    this.activeModal.close();
  }

}
