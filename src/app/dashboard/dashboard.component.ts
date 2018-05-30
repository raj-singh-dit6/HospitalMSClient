import { Component, OnInit } from '@angular/core';
import { UserInfo } from '../model/UserInfo.model';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Role } from '../model/role.model';
import { Hospital } from '../model/hospital.model';
import { Subject } from 'rxjs/Subject';
import {debounceTime} from 'rxjs/operators';

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

  static _success = new Subject<string>();
  staticAlertClosed = false;
  successMessage: string;

  constructor(private authService:AuthService,private router:Router) { }

  ngOnInit() {
    
    this.sessionKey = localStorage.getItem('sessionKey');
    this.userInfo = JSON.parse(localStorage.getItem('user')) || { userName: '' };   
    this.roles=this.userInfo.roles;
    this.role=this.roles[0];

    setTimeout(() => this.staticAlertClosed = true, 20000);
    DashboardComponent._success.subscribe((message) => this.successMessage = message);
    DashboardComponent._success.pipe(
      debounceTime(5000)
    ).subscribe(() => this.successMessage = null);
  }



}
