import { Component, OnInit, Input } from '@angular/core';
import { HospitalService } from '../../../../services/hospital.service';
import { Hospital } from '../../../../model/hospital.model';
import { Department } from '../../../../model/department.model';
import { User } from '../../../../model/user.model';
import { Doctor } from '../../../../model/doctor.model';
import { DoctorService } from '../../../../services/doctor.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DepartmentService } from '../../../../services/department.service';
@Component({
  selector: 'app-doctor-edit',
  templateUrl: './doctor-edit.component.html',
  styleUrls: ['./doctor-edit.component.scss']
})
export class DoctorEditComponent implements OnInit {
  @Input() id: any;
  @Input() id2: any;
  hospitals: Hospital[];
  departments: Department[];
  editMode= false;
  doctorForm: FormGroup;
  constructor(private hospitalService: HospitalService,private departmentService:DepartmentService,
     private doctorService: DoctorService,
     public activeModal: NgbActiveModal,private formBuilder:FormBuilder) { }

  ngOnInit() {
    this.editMode=this.id!=null && this.id!='';
    this.hospitalService.getHospitals().subscribe(result => {
      if(result && result.total!=0)
      {
        this.hospitals = result.data;
      }
    });

    this.departmentService.getDepartments().subscribe(result=>{
      if(result && result.total!=0)
      {
        this.departments = result.data;
      }
    });
    this.initForm();

  }

  private initForm() {
    this.doctorForm = this.formBuilder.group({});
    let firstName = '';
    let lastName = '';
    let address = '';
    let dob :Date;
    let contact: number;
    let email = '';
    let description = '';
    let hospital: number;
    let department:number;
    let active:Boolean;
    if (this.editMode) {
      let doctor: Doctor;
      this.doctorService.getDoctor(this.id).subscribe(result => {
        if(result && result.total!=0)
        {
          doctor = result.data
          firstName = doctor.user.firstName;
          lastName = doctor.user.lastName;
          address = doctor.user.address;
          email = doctor.user.email;
          contact = doctor.user.contact;
          hospital = doctor.hospital.id;
          department = doctor.department.id;
          description = doctor.description;
          active = doctor.active;
            
          this.createForm(firstName,lastName,description,address,dob,email,contact,hospital,department,active);
        }
      });
    }else{
        this.createForm();
    }
  }
  
  createForm(firstName:any='',lastName:any='',description:any='',address:any='',dob:any='',email:any='',contact:any='',hospital:any=this.id2,department:any='',active:Boolean=false){

    this.doctorForm = this.formBuilder.group({
      'firstName': new FormControl(firstName, Validators.required),
      'lastName': new FormControl(lastName),
      'description': new FormControl(description),
      'hospital': new FormControl(hospital, Validators.required),
      'department': new FormControl(department, Validators.required),
      'address': new FormControl(address, Validators.required),
      'email': new FormControl(email, Validators.required),
      'contact': new FormControl(contact, [Validators.required,
                         Validators.pattern(/^[1-9]+[0-9]*$/)]),
      'active':new FormControl(active),                 
    });
  }

  onSubmit() {
    const hospId=this.doctorForm.get('hospital').value;
    const depId=this.doctorForm.get('department').value;
    const hospital= this.hospitals.find(x=>x.id==hospId);
    const updateDoctor:any=this.doctorForm.value;
    const user:User= new User(null,null,updateDoctor.firstName,updateDoctor.lastName,updateDoctor.email,null,hospital,updateDoctor.address,updateDoctor.contact);
    const department=this.departments.find(x=>x.id==depId);
    const doctor:Doctor=new Doctor(this.id,updateDoctor.description,updateDoctor.active,department,hospital,user);
    if (this.editMode) {
      this.doctorService.updateDoctor(doctor).subscribe(result => {
        if (result.success) {
          this.doctorService.getDoctorsByHospital(this.id2).subscribe(result=>{
            if(result && result.total!=0)
            {
              let doctors:Doctor[]=result.data;
              this.doctorService.doctorsChanged.next(doctors);
            }
          });
        }
      });
    } else {
      this.doctorService.addDoctor(doctor).subscribe(result => {
        if (result.success) {
          this.doctorService.getDoctorsByHospital(this.id2).subscribe(result=>{
            if(result && result.total!=0)
            {
              let doctors:Doctor[]=result.data;
              this.doctorService.doctorsChanged.next(doctors);
            }
          });
        }      
      });
    }
    this.activeModal.close();
  }


}
