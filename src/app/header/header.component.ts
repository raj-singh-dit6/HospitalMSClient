import { Component } from '@angular/core';
import { Response } from '@angular/http';
import { AuthService } from '../services/auth.service';
import { ModalService } from '../services/modal.service';
import { SignupComponent } from '../auth/signup/signup.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  constructor(private modalService:ModalService,private authService:AuthService){}
  
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
