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
  selector: 'app-assign-room',
  templateUrl: './assign-room.component.html',
  styleUrls: ['./assign-room.component.scss']
})
export class AssignRoomComponent implements OnInit {
  @Input() id:Patient;
  @Input() id2: any;
  patient:Patient;
  patientStatuses: PatientStatus[];
  rooms:Room[];
  editMode= false;
  assignDoctorForm: FormGroup;

  constructor(private patientStatusService:PatientStatusService,
     private patientService:PatientService,public activeModal: NgbActiveModal,private formBuilder:FormBuilder,private roomService:RoomService) {
      }

  ngOnInit() {
    this.editMode=this.id.room!=null;
    this.patient=this.id;

    this.roomService.getRoomsByHospital(this.id2).subscribe(result=>{
      if(result && result.total!=0)
      {
        this.rooms= result.data;
      }
    });
    this.patientStatusService.getPatientStatuses().subscribe(result=>{
      if(result && result.total!=0)
      {
        this.patientStatuses = result.data;
      }
    });
    this.initForm();

  }

  private initForm() {
    this.assignDoctorForm = this.formBuilder.group({});
    let patientStatus : number;
    let room:number;
    let doctor:number;
    if (this.editMode) {
      room=this.patient.room.id;
      patientStatus=this.patient.patientStatus.id;
      this.createForm(room,patientStatus);
    }else{
        this.createForm();
    }
  }
  
  createForm(room:any='',patientStatus:any=''){

    this.assignDoctorForm = this.formBuilder.group({
      'room': new FormControl(room, Validators.required),
      'patientStatus': new FormControl(patientStatus, Validators.required),
    });
  }

  onSubmit() {
    const patientStatusId=this.assignDoctorForm.get('patientStatus').value;
    const roomId=this.assignDoctorForm.get('room').value;    
    const patientStatus=this.patientStatuses.find(x=>x.id==patientStatusId);
    const room=this.rooms.find(x=>x.id==roomId);
    this.patient.room=room;
    this.patient.patientStatus=patientStatus;
    this.patientService.assignRoom(this.patient).subscribe(result => {
      if (result.success) {
        this.patientService.getPatientsByHospital(this.id2).subscribe(result=>{
          if(result && result.total!=0)
          {
            let patients:Patient[]=result.data;
            this.patientService.patientsChanged.next(patients);
          }
        });
      }
    });
    this.activeModal.close();
  }
}
