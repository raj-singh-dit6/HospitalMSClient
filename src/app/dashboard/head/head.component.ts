import { Component, OnInit, Input } from '@angular/core';
import { Hospital } from '../../model/hospital.model';
import { UserEditComponent } from '../details/users/user-edit/user-edit.component';
import { UserInfo } from '../../model/UserInfo.model';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css']
})
export class HeadComponent implements OnInit {
  @Input() hospitalId:number;
  chartFor:string="";
  userInfo:UserInfo;
  constructor() { }

  ngOnInit() {
    let currentUser= localStorage.getItem('user');
    this.userInfo = JSON.parse(localStorage.getItem('user')) || { userName: '' }; 
    this.hospitalId = this.userInfo.hospital.id;
  }

}
