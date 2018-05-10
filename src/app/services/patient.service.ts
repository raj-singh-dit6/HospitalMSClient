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
import { Subject } from 'rxjs/Subject';
import { Patient } from '../model/patient.model';

@Injectable()
export class PatientService {

  patientsChanged= new Subject<Patient[]>();
  constructor(private http: Http) {}
  
  getPatientsByHospital(hospitalId:any){
    let url = APP_HOME+"patient/all/hospital/"+hospitalId;
    return this.http.get(url,this.getRequestOptions())
      .map((res: Response) => res.json())
      .catch((err: Response) => this.handleError(err));
  }

  getPatientsByDoctor(doctorId:any){
    let url = APP_HOME+"patient/all/doctor/"+doctorId;
    return this.http.get(url,this.getRequestOptions())
      .map((res: Response) => res.json())
      .catch((err: Response) => this.handleError(err));
  }

  getPatientsByRoom(roomId:string){
    let url = APP_HOME+"patient/all/room/"+roomId;
    return this.http.get(url,this.getRequestOptions())
      .map((res: Response) => res.json())
      .catch((err: Response) => this.handleError(err));
  }

  getPatientsDailyStatus(hospitalId:any){
    let url = APP_HOME+"patient/all/status/daily/"+hospitalId;
    return this.http.get(url,this.getRequestOptions())
      .map((res: Response) => res.json())
      .catch((err: Response) => this.handleError(err));
  }

  getPatients(){
    let url = APP_HOME+"patient/all";
    return this.http.get(url,this.getRequestOptions())
      .map((res: Response) => res.json())
      .catch((err: Response) => this.handleError(err));
  }


  getPatient(id:number){
    let url = APP_HOME+"patient/"+id;
    return this.http.get(url,this.getRequestOptions())
      .map((res: Response) => res.json())
      .catch((err: Response) => this.handleError(err));
  }

  addPatient(patient:Patient){
    let url = APP_HOME+"patient/add";
    return this.http.post(url,JSON.stringify(patient),this.getRequestOptions())
      .map((res: Response) => res.json())
      .catch((err: Response) => this.handleError(err));
  }


  updatePatient(patient:Patient){
    let url = APP_HOME+"patient/update";
    return this.http.post(url,JSON.stringify(patient),this.getRequestOptions())
      .map((res: Response) => res.json())
      .catch((err: Response) => this.handleError(err));
  }

  assignDoctor(patient:Patient){
    let url = APP_HOME+"patient/assign/doctor";
    return this.http.post(url,JSON.stringify(patient),this.getRequestOptions())
      .map((res: Response) => res.json())
      .catch((err: Response) => this.handleError(err));
  }

  assignRoom(patient:Patient){
    let url = APP_HOME+"patient/assign/room";
    return this.http.post(url,JSON.stringify(patient),this.getRequestOptions())
      .map((res: Response) => res.json())
      .catch((err: Response) => this.handleError(err));
  }

  deletePatient(id:number){
    let url = APP_HOME+"patient/delete/"+id;
    return this.http.delete(url,this.getRequestOptions())
      .map((res: Response) => res.json())
      .catch((err: Response) => this.handleError(err));
  }


  private handleError(error: Response) {
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
