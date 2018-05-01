import { Component, OnInit } from '@angular/core';
import { UserInfo } from '../model/UserInfo.model';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userInfo:UserInfo;
  sessionKey:string;
  constructor(private authService:AuthService,private router:Router) { }

  ngOnInit() {
    this.sessionKey = localStorage.getItem('sessionKey');
    this.userInfo = JSON.parse(localStorage.getItem('user')) || { userName: '' };   
    if(!this.authService.isAuthenticated())
    {
      this.router.navigateByUrl("/signin")
    }
  }

}
