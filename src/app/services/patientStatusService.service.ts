import { Injectable } from '@angular/core';
import {Http, RequestOptions, Headers,  Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { API_ENDPOINTS, APP_HOME } from '../shared/constant/api-constant';
import { FetchRequestOptions } from './request-options.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserInfo } from '../model/UserInfo.model';
import { Role } from '../model/role.model';
import { of } from 'rxjs/observable/of';
import { Subject } from 'rxjs/Subject';
import { PatientStatus } from '../model/patientStatus.model';

@Injectable()
export class PatientStatusService {

  patientsChanged= new Subject<PatientStatus[]>();
  constructor(private http: Http) {}

  getPatientStatuses(){
    let url = APP_HOME+"patientStatus/all";
    return this.http.get(url,FetchRequestOptions.getRequestOptions())
      .map((res: Response) => res.json())
      .catch((err: Response) => this.handleError(err));
  }


  getPatientStatus(id:number){
    let url = APP_HOME+"patientStatus/"+id;
    return this.http.get(url,FetchRequestOptions.getRequestOptions())
      .map((res: Response) => res.json())
      .catch((err: Response) => this.handleError(err));
  }

  addPatientStatus(patientStatus:PatientStatus){
    let url = APP_HOME+"patientStatus/add";
    return this.http.post(url,JSON.stringify(patientStatus),FetchRequestOptions.getRequestOptions())
      .map((res: Response) => res.json())
      .catch((err: Response) => this.handleError(err));
  }


  updatePatientStatus(patientStatus:PatientStatus){
    let url = APP_HOME+"patientStatus/update";
    return this.http.post(url,JSON.stringify(patientStatus),FetchRequestOptions.getRequestOptions())
      .map((res: Response) => res.json())
      .catch((err: Response) => this.handleError(err));
  }

  deletePatientStatus(id:number){
    let url = APP_HOME+"patientStatus/delete/"+id;
    return this.http.delete(url,FetchRequestOptions.getRequestOptions())
      .map((res: Response) => res.json())
      .catch((err: Response) => this.handleError(err));
  }


  private handleError(error: Response) {
    return of(null);
  }
}
