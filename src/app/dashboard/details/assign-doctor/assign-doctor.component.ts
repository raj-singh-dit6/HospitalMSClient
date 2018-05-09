import { Component, OnInit, Input } from '@angular/core';
import { Doctor } from '../../../model/doctor.model';
import { Hospital } from '../../../model/hospital.model';
import { PatientStatus } from '../../../model/patientStatus.model';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { HospitalService } from '../../../services/hospital.service';
import { PatientStatusService } from '../../../services/patientStatusService.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Patient } from '../../../model/patient.model';
import { DoctorService } from '../../../services/doctor.service';
import { RoomService } from '../../../services/room.service';
import { Room } from '../../../model/room.model';
import { User } from '../../../model/user.model';
import { PatientService } from '../../../services/patient.service';
import { PatientDoctorService } from '../../../services/patientDoctor.service';

@Component({
  selector: 'app-assign-doctor',
  templateUrl: './assign-doctor.component.html',
  styleUrls: ['./assign-doctor.component.scss']
})
export class AssignDoctorComponent implements OnInit {
  @Input() id:Patient;
  @Input() id2: any;
  patient:Patient;
  hospital: Hospital;
  patientStatuses: PatientStatus[];
  doctors:Doctor[];
  rooms:Room[];
  editMode= false;
  assignDoctorForm: FormGroup;

  constructor(private patientDoctorService:PatientDoctorService,private patientService:PatientService,private doctorService:DoctorService,
     public activeModal: NgbActiveModal,private formBuilder:FormBuilder) {
      }

  ngOnInit() {
    this.editMode=this.id.room!=null;
    this.patient=this.id;

    this.patientDoctorService.getPatientDoctorsByPatient(this.patient.id).subscribe(result=>{
      if(result && result.total!=0){
        this.doctors=result.data;
      }
    });
    this.initForm();

  }

  private initForm() {
    this.assignDoctorForm = this.formBuilder.group({});
    let doctor:number;
    if (this.editMode) {
      this.createForm(doctor);
    }else{
        this.createForm();
    }
  }
  
  createForm(doctor:any=''){

    this.assignDoctorForm = this.formBuilder.group({
      'doctor': new FormControl(doctor, Validators.required),
    });
  }

  onSubmit() {
    const doctorId=this.assignDoctorForm.get('doctor').value;
    const doctor=this.doctors.find(x=>x.id==doctorId);
  
    this.patient.doctor=doctor;
    this.patientService.assignDoctor(this.patient).subscribe(result => {
      if (result.success) {
        // this.patientService.getPatientsByHospital(this.id2).subscribe(result=>{
        //   if(result && result.total!=0)
        //   {
        //     let patients:Patient[]=result.data;
        //     this.patientService.patientsChanged.next(patients);
        //   }
        // });
      }
    });
    this.activeModal.close();
  }
}
