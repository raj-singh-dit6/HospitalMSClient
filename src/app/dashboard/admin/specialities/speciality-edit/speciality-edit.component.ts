import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControlName, Validators, FormControl, FormArray, FormBuilder } from '@angular/forms';
import { SpecialityService } from '../../../../services/speciality.service';
import { Speciality } from '../../../../model/speciality.model';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
    private specialityService:SpecialityService,private router:Router,private toastr:ToastrService) { }

  ngOnInit() {     
      this.editMode = (this.id!=null && this.id!='');
      this.initForm();   
  }

  private initForm(){
    this.specialityForm= this.formBuilder.group({});

    if(this.editMode){
      let speciality:any;

      this.specialityService.getSpeciality(this.id).subscribe(result=>{
        if(result && result.total!=0)
        {
          speciality=result.data;
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

    const updateSpeciality=this.specialityForm.value;
    const speciality:Speciality=new Speciality(this.id,updateSpeciality.type);
    if(this.editMode){
      this.specialityService.updateSpeciality(speciality).subscribe(result=>{
        if(result.success)
        {
          this.specialityService.getSpecialities().subscribe((result)=>{
            if(result && result.total!=0)
            {
              let specialities:Speciality[]=result.data;
              this.specialityService.specialitiesChanged.next(specialities);
              this.toastr.success('Updated hospital record successfully', 'Notice');
            }
          });
        }else{
          this.toastr.error('Failed to update hospital record.', 'Notice', {
            timeOut: 3000,
          });
        }
      });
    }else{
      this.specialityService.addSpeciality(speciality).subscribe(result=>{
        if(result.success)
        {
          this.specialityService.getSpecialities().subscribe((result)=>{
            if(result && result.total!=0)
            {
              let specialities:Speciality[]=result.data;
              this.specialityService.specialitiesChanged.next(specialities);
              ;
            }
          });
        }
      });
    }
    this.activeModal.close();
  }

}
