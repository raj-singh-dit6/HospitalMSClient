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
import { of } from 'rxjs/observable/of';
import { Hospital } from '../model/hospital.model';
import { Subject } from 'rxjs/Subject';
import { FetchRequestOptions } from './request-options.service';

@Injectable()
export class HospitalService {

  hospitalChanged= new Subject<Hospital[]>();
  constructor(private http: Http) {}
  
  getHospitalsSlice()
  {
  }
  getHospitals(){
    let url = APP_HOME+"hospital/all";
    return this.http.get(url,FetchRequestOptions.getRequestOptions())
      .map((res: Response) => res.json())
      .catch((err: Response) => this.handleError(err));
  }

  getHospital(id:number){
    let url = APP_HOME+"hospital/"+id;
    return this.http.get(url,FetchRequestOptions.getRequestOptions())
      .map((res: Response) => res.json())
      .catch((err: Response) => this.handleError(err));
  }

  addHospital(hospital:Hospital){
    let url = APP_HOME+"hospital/add";
    return this.http.post(url,JSON.stringify(hospital),FetchRequestOptions.getRequestOptions())
      .map((res: Response) => res.json())
      .catch((err: Response) => this.handleError(err));
  }

  updateHospital(hospital:Hospital){
    let url = APP_HOME+"hospital/update";
    return this.http.post(url,JSON.stringify(hospital),FetchRequestOptions.getRequestOptions())
      .map((res: Response) => res.json())
      .catch((err: Response) => this.handleError(err));
  }

  deleteHospital(id:number){
    
    let url = APP_HOME+"hospital/delete/"+id;
    return this.http.delete(url,FetchRequestOptions.getRequestOptions())
      .map((res: Response) => res.json())
      .catch((err: Response) => this.handleError(err));
  }


  private handleError(error: Response) {
    console.error(error);
    return of(null);
  }
}
