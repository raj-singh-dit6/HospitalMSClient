import { Component, OnInit } from '@angular/core';
import { UserInfo } from '../model/UserInfo.model';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Role } from '../model/role.model';
import { Hospital } from '../model/hospital.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userInfo:UserInfo;
  sessionKey:string;
  roles:Role[];
  role:Role;
  constructor(private authService:AuthService,private router:Router) { }

  ngOnInit() {
    this.sessionKey = localStorage.getItem('sessionKey');
    this.userInfo = JSON.parse(localStorage.getItem('user')) || { userName: '' };   
    this.roles=this.userInfo.roles;
    this.role=this.roles[0];
  }

}
