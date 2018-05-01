import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';


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
        this.router.navigateByUrl('/dashboard');
      } else {
          alert("login failed")
      }
    });
  }

}
