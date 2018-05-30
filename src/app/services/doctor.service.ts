import { Injectable } from '@angular/core';
import {Http, RequestOptions, Headers,  Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import {APP_HOME } from '../shared/constant/api-constant';


import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserInfo } from '../model/UserInfo.model';
import { Role } from '../model/role.model';
import { of } from 'rxjs/observable/of';
import { Subject } from 'rxjs/Subject';
import { Doctor } from '../model/doctor.model';
import { FetchRequestOptions } from './request-options.service';

@Injectable()
export class DoctorService {

  doctorsChanged= new Subject<Doctor[]>();
  constructor(private http: Http) {}
  
  getDoctorsByHospital(hospitalId:string){
    let url = APP_HOME+"doctor/all/hospital/"+hospitalId;
    return this.http.get(url,FetchRequestOptions.getRequestOptions())
      .map((res: Response) => res.json())
      .catch((err: Response) => this.handleError(err));
  }

  getDoctors(){
    let url = APP_HOME+"doctor/all";
    return this.http.get(url,FetchRequestOptions.getRequestOptions())
      .map((res: Response) => res.json())
      .catch((err: Response) => this.handleError(err));
  }

  getDoctor(id:any){
    let url = APP_HOME+"doctor/"+id;
    return this.http.get(url,FetchRequestOptions.getRequestOptions())
      .map((res: Response) => res.json())
      .catch((err: Response) => this.handleError(err));
  }

  addDoctor(doctor:Doctor){
    let url = APP_HOME+"doctor/add";
    return this.http.post(url,JSON.stringify(doctor),FetchRequestOptions.getRequestOptions())
      .map((res: Response) => res.json())
      .catch((err: Response) => this.handleError(err));
  }


  updateDoctor(doctor:Doctor){
    let url = APP_HOME+"doctor/update";
    return this.http.post(url,JSON.stringify(doctor),FetchRequestOptions.getRequestOptions())
      .map((res: Response) => res.json())
      .catch((err: Response) => this.handleError(err));
  }

  deleteDoctor(id:number){
    
    let url = APP_HOME+"doctor/delete/"+id;
    return this.http.delete(url,FetchRequestOptions.getRequestOptions())
      .map((res: Response) => res.json())
      .catch((err: Response) => this.handleError(err));
  }


  private handleError(error: Response) {
    console.error(error);
    return of(null);
  }
}
