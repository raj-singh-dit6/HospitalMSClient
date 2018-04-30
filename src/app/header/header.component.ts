import { Component } from '@angular/core';
import { Response } from '@angular/http';
import { AuthService } from '../services/auth.service';
import { ModalService } from '../services/modal.service';
import { SignupComponent } from '../auth/signup/signup.component';
import { Subject } from 'rxjs/Subject';
import { UserInfo } from '../model/UserInfo.model';
import { Role } from '../model/role.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  userInfo:UserInfo;
  sessionKey:string;

  constructor(private modalService:ModalService,private authService:AuthService){}
  userRoles:Role[];
  ngOnInit() {
    this.sessionKey = localStorage.getItem('sessionKey');
    this.userInfo = JSON.parse(localStorage.getItem('user')) || { username: '' };
    this.userRoles = this.userInfo.roles;
  
  }  

  onNewRegistration()
  { 
    this.modalService.open(SignupComponent,'');
  }
  

  
  onSaveData()
  {

  }

  onFetchData(){
   
  }

}
