import { Component, OnInit, Input } from '@angular/core';
import { Hospital } from '../../model/hospital.model';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {
  @Input() hospital:Hospital;
  constructor() { }

  ngOnInit() {
  }

}
