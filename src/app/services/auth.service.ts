import { Injectable } from '@angular/core';
import {Http, RequestOptions, Headers,  Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserInfo } from '../model/UserInfo.model';
import { APP_HOME } from '../shared/constant/api-constant';
import { FetchRequestOptions } from './request-options.service';
import { HandleError } from './handle-errors.service';

@Injectable()
export class AuthService {
  loggedIn:boolean=false;
  currentUser:UserInfo;

  constructor(private http: Http,private router:Router) {

  }

  signinUser(username: string, password: string){
    this.loggedIn = false;
    localStorage.removeItem('user');

    let url = APP_HOME+"login";
    
    let body = new FormData();
    body.append('username', username);
    body.append('password', password);
    return this.http.post(url,body)
      .map((res: Response) => res.json())
      .map((res) => {
        if (res && res.data) {
          let userJson: any = res.data;
          let userInfo = new UserInfo(userJson.id, userJson.userName, userJson.firstName, userJson.lastName,
                          userJson.email,userJson.roles,userJson.hospital);
          localStorage.setItem('user', JSON.stringify(userInfo));
          localStorage.setItem('sessionKey', userJson['sessionKey']);
          this.currentUser = userInfo;
          this.loggedIn = true;
        }
        return this.currentUser;
      })
      .catch((err: Response) => this.handleError(err));
    }

  private handleError(error: Response) {
    console.error(error);
    alert("Bad Credentials");
    return Observable.throw(error.json().error || 'Server error');
  }

  isAuthenticated()
  {
    let sessionKey= localStorage.getItem('sessionKey');
    let userInfo = JSON.parse(localStorage.getItem('user')) || { userName: '' };
    return sessionKey!=null;
  }

  signOut()
  {
    let sessionKey= localStorage.getItem('sessionKey');
    let url = APP_HOME+"/userSession/delete/"+sessionKey;
    let user = JSON.parse(localStorage.getItem('user')) || { userName: '' };
    return this.http.delete(url,FetchRequestOptions.getRequestOptions())
      .map((res: Response) => res.json())
      .catch((err: Response) => this.handleError(err));
  }
}
