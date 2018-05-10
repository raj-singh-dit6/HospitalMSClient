import { Component, OnInit, Input } from '@angular/core';
import { Hospital } from '../../model/hospital.model';
import { Doctor } from '../../model/doctor.model';
import { UserInfo } from '../../model/UserInfo.model';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {
  @Input() doctorId:number;
  userInfo:UserInfo;

  constructor() { }

  ngOnInit() {
    let currentUser= localStorage.getItem('user');
    this.userInfo = JSON.parse(localStorage.getItem('user')) || { userName: '' }; 
    this.doctorId = this.userInfo.id;
  }

}
