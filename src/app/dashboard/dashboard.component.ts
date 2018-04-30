import { Component, OnInit } from '@angular/core';
import { UserInfo } from '../model/UserInfo.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userInfo:UserInfo;
  sessionKey:string;
  constructor() { }

  ngOnInit() {
    this.sessionKey = localStorage.getItem('sessionKey');
    this.userInfo = JSON.parse(localStorage.getItem('user')) || { userName: '' };   
    // debugger
  }

}
