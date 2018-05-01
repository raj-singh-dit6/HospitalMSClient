import { Component, OnInit, Input } from '@angular/core';
import { HospitalService } from '../../../../services/hospital.service';
import { Hospital } from '../../../../model/hospital.model';
import { Department } from '../../../../model/department.model';
import { User } from '../../../../model/user.model';
import { Doctor } from '../../../../model/doctor.model';
import { DoctorService } from '../../../../services/doctor.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-doctor-edit',
  templateUrl: './doctor-edit.component.html',
  styleUrls: ['./doctor-edit.component.scss']
})
export class DoctorEditComponent implements OnInit {
  @Input() id: any;
  hospitals: Hospital[];
  editMode= false;
  doctorForm: FormGroup;
  constructor(private hospitalService: HospitalService, private doctorService: DoctorService, public activeModal: NgbActiveModal) { }

  ngOnInit() {
    if(this.id!=null && this.id!='')
      {
        this.editMode=true;
      }
    this.hospitalService.getHospitals().subscribe(result => {
      if (result.total != 0) {
        this.hospitals = result.data;
      }
    });
    this.initForm();

  }

  private initForm() {
    let firstName = '';
    let lastName = '';
    let address = '';
    let dob = '';
    let contact: number;
    let email = '';
    let description = '';
    let hospital: Hospital;
    let department='';
    if (this.editMode) {
      let doctor: Doctor;
      this.doctorService.getDoctor(this.id).subscribe(result => {
        if (result.total != 0) {
          doctor = result.data
          firstName = doctor.user.firstName;
          lastName = doctor.user.lastName;
          address = doctor.user.address;
          dob = doctor.user.dob;
          email = doctor.user.email;
          contact = doctor.user.contact;
          hospital = doctor.hospital;
          department = doctor.department;
          description = doctor.description;
          console.log(doctor);
        }
      });

    }
    debugger
    this.doctorForm = new FormGroup({
      'firstName': new FormControl(firstName, Validators.required),
      'lastName': new FormControl(lastName),
      'description': new FormControl(description),
      'hospital': new FormControl(hospital, Validators.required),
      'dob': new FormControl(dob),
      'department': new FormControl(department, Validators.required),
      'address': new FormControl(address, Validators.required),
      'email': new FormControl(email, Validators.required),
      'contact': new FormControl(contact, [Validators.required,
                         Validators.pattern(/^[1-9]+[0-9]*$/)])
    });
  }

  onSubmit() {
    if (this.editMode) {
      this.doctorService.addDoctor(this.doctorForm.value).subscribe(result => {
        if (result.success) {
          this.doctorService.getDoctors().subscribe(result=>{
            if(result.total!=0)
            {
              let doctors:Doctor[]=result.data;
              this.doctorService.doctorsChanged.next(doctors);
            }
          });
        }
      });
    } else {
      this.doctorService.updateDoctor(this.doctorForm.value).subscribe(result => {
        if (result.success) {
          this.doctorService.getDoctors().subscribe(result=>{
            if(result.total!=0)
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
