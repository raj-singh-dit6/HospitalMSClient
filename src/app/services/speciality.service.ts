import { Injectable } from '@angular/core';
import {Http, RequestOptions, Headers,  Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { API_ENDPOINTS, APP_HOME } from '../shared/constant/api-constant';


import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserInfo } from '../model/UserInfo.model';
import { Role } from '../model/role.model';
import { Speciality } from '../model/speciality.model';
import { of } from 'rxjs/observable/of';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SpecialityService {
  specialitiesChanged = new Subject<Speciality[]>();
  constructor(private http: Http) {}
  
  getSpecialities(){
    let url = APP_HOME+"speciality/all";
    return this.http.get(url,this.getRequestOptions())
      .map((res: Response) => res.json())
      .catch((err: Response) => this.handleError(err));
  }

  getSpeciality(id:number){
    let url = APP_HOME+"speciality/"+id;
    return this.http.get(url,this.getRequestOptions())
      .map((res: Response) => res.json())
      .catch((err: Response) => this.handleError(err));
  }

  addSpeciality(speciality:Speciality){
    
     let url = APP_HOME+"speciality/add";
     return this.http.post(url,JSON.stringify(speciality),this.getRequestOptions())
      .map((res: Response) => res.json())
       .catch((err: Response) => this.handleError(err));
  }

  updateSpeciality(speciality:Speciality){
    let url = APP_HOME+"speciality/update";
    return this.http.post(url,speciality,this.getRequestOptions())
      .map((res: Response) => res.json())
      .catch((err: Response) => this.handleError(err));
  }

  deleteSpeciality(id:number){
    let url = APP_HOME+"speciality/delete?id="+id;
    return this.http.post(url,this.getRequestOptions())
      .map((res: Response) => res.json())
      .catch((err: Response) => this.handleError(err));
  }

  private handleError(error: Response) {
    console.error(error);
    return of(null);
  }

  private getRequestOptions(): RequestOptions {
    let sessionKey = localStorage.getItem('sessionKey');
    let user = JSON.parse(localStorage.getItem('user')) || { username: '' };
    let username = user['userName'];
    let options = new RequestOptions({
      headers: new Headers({
        'Authorization': username + ';' + sessionKey,
        'content-type': 'application/json'
      })
    });
    return options;
    } 
}