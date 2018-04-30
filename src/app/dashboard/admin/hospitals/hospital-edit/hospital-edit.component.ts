import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControlName, Validators, FormControl, FormArray, FormBuilder } from '@angular/forms';
import { Occupancy } from '../../../../model/occupany.model';
import { SpecialityService } from '../../../../services/speciality.service';
import { Speciality } from '../../../../model/speciality.model';
import { Hospital } from '../../../../model/hospital.model';
import { HospitalsComponent } from '../hospitals.component';
import { HospitalService } from '../../../../services/hospital.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-hospital-edit',
  templateUrl: './hospital-edit.component.html',
  styleUrls: ['./hospital-edit.component.css'],
})
export class HospitalEditComponent implements OnInit, OnDestroy {
  @Input() id:any;
  hospitalForm:FormGroup;
  specialities:Speciality[];
  specialitySubs:Subscription;
  editMode=false;
  constructor(public activeModal: NgbActiveModal,private specialityService:SpecialityService,private hospitalService:HospitalService,private formBuilder: FormBuilder,private router:Router) { }

  ngOnInit() {
    if(this.id!=""){
      this.editMode=true;
    }
    this.specialitySubs= this.specialityService.specialitiesChanged
    .subscribe(
      (specialities: Speciality[]) => {
        this.specialities = specialities;
      }
    ); 

    
    this.specialityService.getSpecialities().subscribe(result=>{
      if(result.total!=0)
      {
        this.specialities=result.data;
      }
    })
    this.initForm();
   
  }

  private initForm(){
    let name='';
    let address='';
    let contact:number;
    let speciality:Speciality;
    if(this.editMode){
      let hospital:Hospital;
      this.hospitalService.getHospital(this.id).subscribe(result=>
      {
        if(result.total!=0){
         hospital=result.data
         name=hospital.name;
         address=hospital.address;
         contact=hospital.contact;
         speciality=hospital.speciality;
         console.log(hospital);
        }
      });
      this.hospitalForm= this.formBuilder.group({
        name:new FormControl(name,Validators.required),
        speciality:new FormControl(speciality,Validators.required),
        address:new FormControl(address,Validators.required),
        contact:new FormControl(contact,[Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)])

        });
  
    }else{
    this.hospitalForm= this.formBuilder.group({
      name:new FormControl(name,Validators.required),
      speciality:new FormControl(speciality,Validators.required),
      address:new FormControl(address,Validators.required),
      contact:new FormControl(contact,[Validators.required,
                                    Validators.pattern(/^[1-9]+[0-9]*$/)])                   
    });
  }
}

  onSubmit(){
        this.hospitalService.addHospital(this.hospitalForm.value).subscribe(result=>{
      if(result && result.success){
        let hospitals:Hospital[]=[];
        this.hospitalService.getHospitals().subscribe((result)=>{
          if(result.total!=0)
        {
          hospitals=result.data;
        }
       });
        this.hospitalService.hospitalChanged.next(hospitals);
        debugger
        this.activeModal.close();
      }
    });
  }

  ngOnDestroy() {
    this.specialitySubs.unsubscribe();
  }

}