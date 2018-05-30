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
import { ToastrService } from 'ngx-toastr';

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
  constructor(public activeModal: NgbActiveModal,private specialityService:SpecialityService,private hospitalService:HospitalService,private formBuilder: FormBuilder,private router:Router,private toastr: ToastrService) { }

  ngOnInit() {

    this.editMode=this.id!=null && this.id!=''
    this.specialitySubs= this.specialityService.specialitiesChanged
    .subscribe(
      (specialities: Speciality[]) => {
        this.specialities = specialities;
      }
    ); 

    this.specialityService.getSpecialities().subscribe(result=>{
      if(result && result.total!=0)
      {
        this.specialities=result.data;
      }
    })
    this.initForm();
   
  }

  private initForm(){
    this.hospitalForm= this.formBuilder.group({});
    let name='';
    let address='';
    let contact:number;
    let active:Boolean;
    let specialityId:number;
    if(this.editMode){
      let hospital:Hospital;
      this.hospitalService.getHospital(this.id).subscribe(result=>
      {
        if(result && result.total!=0)
        {
         hospital=result.data
         name=hospital.name;
         address=hospital.address;
         contact=hospital.contact;
         specialityId=hospital.speciality.id;
         active=hospital.active;
         this.createForm(name,specialityId,address,contact,active);
        }
      });
    }else{
      this.createForm();
    }
  }
  
  createForm(name:any='',specialityId:any='',address:any='',contact:any='',active:Boolean=false)
  {
    this.hospitalForm= this.formBuilder.group({
      'name':new FormControl(name,Validators.required),
      'speciality':new FormControl(specialityId,Validators.required),
      'address':new FormControl(address,Validators.required),
      'active':new FormControl(active),
      'contact':new FormControl(contact,[Validators.required,
                                    Validators.pattern(/^[1-9]+[0-9]*$/)])                   
    });
  }
  onSubmit(){
    const specialityId=this.hospitalForm.get('speciality').value;
    const speciality= this.specialities.find(x=>x.id==specialityId);
    const updateHospital:Hospital=this.hospitalForm.value; 
    const hospital:Hospital= new Hospital(this.id,updateHospital.name,updateHospital.address,speciality,updateHospital.contact,updateHospital.active);
    if(this.editMode){
      this.hospitalService.updateHospital(hospital).subscribe(result=>{
        if(result && result.success){
          let hospitals:Hospital[]=[];
          this.hospitalService.getHospitals().subscribe((result)=>{
          if(result && result.total!=0)
          {
            hospitals=result.data;
            this.hospitalService.hospitalChanged.next(hospitals);
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
      this.hospitalService.addHospital(hospital).subscribe(result=>{
        if(result.success){
          let hospitals:Hospital[]=[];
          this.hospitalService.getHospitals().subscribe((result)=>{
          if(result && result.total!=0)
          {
            hospitals=result.data;
            this.hospitalService.hospitalChanged.next(hospitals);
            this.toastr.success('Added new hospital record successfully', 'Notice');
          }else{
            this.toastr.error('Failed to update hospital record.', 'Notice', {
              timeOut: 3000,
            });
          }
        });
        }
      });
    }
    this.activeModal.close();
  }

  ngOnDestroy() {
    this.specialitySubs.unsubscribe();
  }

}