import { Component, OnInit, Input } from '@angular/core';
import { Patient } from '../../../../model/patient.model';
import { ModalService } from '../../../../services/modal.service';
import { PatientService } from '../../../../services/patient.service';
import { PatientEditComponent } from '../patient-edit/patient-edit.component';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent implements OnInit {
  @Input() hospitalId;
  patients:Patient[];
  constructor(private patientService:PatientService,private modalService:ModalService) { }

  ngOnInit() {

    this.patientService.patientsChanged.subscribe(
      (patients: Patient[]) => {
        debugger
        this.patients = patients;

    });
    this.patientService.getPatientsByHospital(this.hospitalId).subscribe((result)=>{
        if(result.total!=0)
      {
        this.patients=result.data;
      }
    });
  }
  onEditPatient(patient:Patient)
  {
    this.modalService.open(PatientEditComponent,patient.id,this.hospitalId);
  }

  onDeletePatient(patient:Patient)
  {

    this.patientService.deletePatient(patient.id).subscribe(result=>{
    if(result.success)
    {
      this.patientService.getPatientsByHospital(this.hospitalId).subscribe(result=>{
        if(result.total!=0)
        {
          let patients:Patient[]=result.data;
          this.patientService.patientsChanged.next(patients);
        }
      });
    }
    });
  } 
}

