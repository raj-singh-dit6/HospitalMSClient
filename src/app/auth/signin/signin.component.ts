import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { UserInfo } from '../../model/UserInfo.model';
import { Role } from '../../model/role.model';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  loginStatus= new Subject();
  constructor(private authService: AuthService,private router:Router){}
  ngOnInit() {

    if(this.authService.isAuthenticated())
        this.router.navigateByUrl("/dashboard");      
  }

  onSignin(form: NgForm) {
    const username = form.value.username;
    const password = form.value.password;
    this.authService.signinUser(username, password)
    .subscribe((result) => {
      if (result) {
        let currentUser:UserInfo= result;
        console.log(currentUser);
        let roles:Role[]=currentUser.roles;
        // if(roles.find(role=>role.type==="ADMIN")!=null){
        //   this.router.navigateByUrl('/dashboard');
        // }else if(roles.find(role=>role.type==="HEAD")!=null){
        //   this.router.navigate(['/head',currentUser.hospital.id]);
        // }else if(roles.find(role=>role.type==="DOCTOR")!=null){
        //   this.router.navigate(['/doctor',currentUser.hospital.id]);
        // }else if(roles.find(role=>role.type==="PATIENT")!=null){
        //   this.router.navigate(['/patient',currentUser.hospital.id]);
        // }
        this.router.navigateByUrl('/dashboard');
      } else {
          alert("login failed")
      }
    });
  }

}
