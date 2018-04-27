import { Injectable } from '@angular/core';
import {Http, RequestOptions, Headers,  Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserInfo } from '../model/UserInfo.model';

@Injectable()
export class AuthService {
  _BASEURL:string='http://localhost:8080/SecuredWeb';
  loggedIn:boolean=false;
  currentUser:UserInfo;

  constructor(private http: Http,private router:Router) {

  }

  signinUser(username: string, password: string){
    this.loggedIn = false;
    localStorage.removeItem('user');

    let url = this._BASEURL+"/login";
    
    let body = new FormData();
    body.append('username', username);
    body.append('password', password);
    return this.http.post(url,body)
      .map((res: Response) => res.json())
      .map((res) => {
        console.log(res);
        if (res && res.data) {
          let userJson: any = res.data;
          console.log(userJson);
          let userInfo = new UserInfo(userJson.id, userJson.userName, userJson.email, userJson.firstName,
                          userJson.lastName,userJson.roles);
          localStorage.setItem('user', JSON.stringify(userInfo));
          localStorage.setItem('sessionKey', userJson['sessionKey']);
          this.currentUser = userInfo;
          this.loggedIn = true;
        }
        return this.loggedIn;
      })
      .catch((err: Response) => this.handleError(err));
    }

  private handleError(error: Response) {
    console.error(error);

    return Observable.throw(error.json().error || 'Server error');
  }

  isAuthenticated()
  {
    return this.loggedIn;
  }
}
