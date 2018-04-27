import { Component, OnInit, Input } from '@angular/core';
import { Hospital } from '../../../../../model/hospital.model';

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styleUrls: ['./hospital.component.css']
})
export class HospitalComponent implements OnInit {
  @Input() hospital:Hospital;
  @Input() index: number;

  constructor() { }

  ngOnInit() {
  }

}
