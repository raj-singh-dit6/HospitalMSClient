import { Component, OnInit, Input } from '@angular/core';
import { Hospital } from '../../model/hospital.model';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {
  @Input() hospital:Hospital;
  constructor() { }

  ngOnInit() {
  }

}
