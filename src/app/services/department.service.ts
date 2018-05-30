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
import { Department } from '../model/department.model';
import { of } from 'rxjs/observable/of';
import { Subject } from 'rxjs/Subject';
import { FetchRequestOptions } from './request-options.service';

@Injectable()
export class DepartmentService {
  departmentsChanged = new Subject<Department[]>();
  constructor(private http: Http) {}
  
  getDepartments(){
    let url = APP_HOME+"department/all";
    return this.http.get(url,FetchRequestOptions.getRequestOptions())
      .map((res: Response) => res.json())
      .catch((err: Response) => this.handleError(err));
  }

  getDepartment(id:number){
    let url = APP_HOME+"department/"+id;
    return this.http.get(url,FetchRequestOptions.getRequestOptions())
      .map((res: Response) => res.json())
      .catch((err: Response) => this.handleError(err));
  }

  addDepartment(department:Department){
    
     let url = APP_HOME+"department/add";
     return this.http.post(url,JSON.stringify(department),FetchRequestOptions.getRequestOptions())
      .map((res: Response) => res.json())
       .catch((err: Response) => this.handleError(err));
  }

  updateDepartment(department:Department){
    let url = APP_HOME+"department/update";
    return this.http.post(url,department,FetchRequestOptions.getRequestOptions())
      .map((res: Response) => res.json())
      .catch((err: Response) => this.handleError(err));
  }

  deleteDepartment(id:number){
    let url = APP_HOME+"department/delete/"+id;
    return this.http.delete(url,FetchRequestOptions.getRequestOptions())
      .map((res: Response) => res.json())
      .catch((err: Response) => this.handleError(err));
  }

  private handleError(error: Response) {
    console.error(error);
    return of(null);
  }
}