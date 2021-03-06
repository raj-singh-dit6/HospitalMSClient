import { Injectable } from '@angular/core';
import {Http, RequestOptions, Headers,  Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';


import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserInfo } from '../model/UserInfo.model';
import { Role } from '../model/role.model';
import { of } from 'rxjs/observable/of';
import { User } from '../model/user.model';
import { APP_HOME } from '../shared/constant/api-constant';
import { FetchRequestOptions } from './request-options.service';

@Injectable()
export class UserService{

  constructor(private http: Http) {}
  
  getUsers(){
    let url = APP_HOME+"user/all";
    return this.http.get(url,FetchRequestOptions.getRequestOptions())
      .map((res: Response) => res.json())
      .catch((err: Response) => this.handleError(err));
  }

  updateUser(form:NgForm){

  }

  addUser(user: User){
    console.log(JSON.stringify(user));
    let url = APP_HOME+"user/add";
    return this.http.post(url,user,FetchRequestOptions.getRequestOptions())
      .map((res: Response) => res.json())
      .catch((err: Response) => this.handleError(err));
    
  }

  private handleError(error: Response) {
    console.error(error);
    return of(null);
  }
}
