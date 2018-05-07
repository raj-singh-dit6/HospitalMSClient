import { Component, OnInit, Input } from '@angular/core';
import { HospitalService } from '../../../../services/hospital.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { PatientService } from '../../../../services/patient.service';
import { PatientStatus } from '../../../../model/patientStatus.model';
import { Hospital } from '../../../../model/hospital.model';
import { Patient } from '../../../../model/patient.model';
import { User } from '../../../../model/user.model';
import { PatientStatusService } from '../../../../services/patientStatusService.service';

@Component({
  selector: 'app-patient-edit',
  templateUrl: './patient-edit.component.html',
  styleUrls: ['./patient-edit.component.scss']
})
export class PatientEditComponent implements OnInit {
  @Input() id: any;
  @Input() id2: any;
  hospital: Hospital;
  patientStatuses: PatientStatus[];
  editMode= false;
  patientForm: FormGroup;
  constructor(private hospitalService: HospitalService,private patientStatusService:PatientStatusService,
     private patientService: PatientService,
     public activeModal: NgbActiveModal,private formBuilder:FormBuilder) { }

  ngOnInit() {
    this.editMode=this.id!=null && this.id!='';
    this.hospitalService.getHospital(this.id2).subscribe(result => {
      if(result && result.total!=0)
      {
        this.hospital = result.data;
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
    this.patientForm = this.formBuilder.group({});
    let firstName = '';
    let lastName = '';
    let address = '';
    let dob :Date;
    let contact: number;
    let email = '';
    let patientStatus : number;
    if (this.editMode) {
      let patient: Patient;
      this.patientService.getPatient(this.id).subscribe(result => {
        if(result && result.total!=0)
        {
          patient = result.data
          firstName = patient.user.firstName;
          lastName = patient.user.lastName;
          address = patient.user.address;
          email = patient.user.email;
          contact = patient.user.contact;
          patientStatus = patient.patientStatus.id;
          this.createForm(firstName,lastName,address,dob,email,contact,patientStatus);
        }
      });
    }else{
        this.createForm();
    }
  }
  
  createForm(firstName:any='',lastName:any='',address:any='',dob:any='',email:any='',contact:any='',patientStatus:any=''){

    this.patientForm = this.formBuilder.group({
      'firstName': new FormControl(firstName, Validators.required),
      'lastName': new FormControl(lastName),
      'address': new FormControl(address, Validators.required),
      'email': new FormControl(email, Validators.required),
      'contact': new FormControl(contact, [Validators.required,
                         Validators.pattern(/^[1-9]+[0-9]*$/)]),
      'patientStatus': new FormControl(patientStatus, Validators.required),
    });
  }

  onSubmit() {
    
    const patientStatusId=this.patientForm.get('patientStatus').value;
    const updatePatient:any=this.patientForm.value;
    const user:User= new User(null,null,updatePatient.firstName,updatePatient.lastName,updatePatient.email,null,this.hospital,updatePatient.address,updatePatient.contact);
    const patientStatus=this.patientStatuses.find(x=>x.id==patientStatusId);
    const patient:Patient=new Patient(this.id,user,this.hospital,patientStatus);
    if (this.editMode) {
      this.patientService.updatePatient(patient).subscribe(result => {
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
    } else {
      this.patientService.addPatient(patient).subscribe(result => {
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
    }
    this.activeModal.close();
  }

}
