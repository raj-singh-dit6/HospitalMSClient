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
import { Occupancy } from '../model/occupany.model';

@Injectable()
export class OccupancyService {
  occupanciesChanged = new Subject<Occupancy[]>();
  constructor(private http: Http) {}
  
  getOccupancies(){
    let url = APP_HOME+"occupancy/all";
    return this.http.get(url,this.getRequestOptions())
      .map((res: Response) => res.json())
      .catch((err: Response) => this.handleError(err));
  }

  getOccupancy(id:number){
    let url = APP_HOME+"occupancy/"+id;
    return this.http.get(url,this.getRequestOptions())
      .map((res: Response) => res.json())
      .catch((err: Response) => this.handleError(err));
  }

  addOccupancy(occupancy:Occupancy){
    
     let url = APP_HOME+"occupancy/add";
     return this.http.post(url,JSON.stringify(occupancy),this.getRequestOptions())
      .map((res: Response) => res.json())
       .catch((err: Response) => this.handleError(err));
  }

  updateOccupancy(occupancy:Occupancy){
    let url = APP_HOME+"occupancy/update";
    return this.http.post(url,JSON.stringify(occupancy),this.getRequestOptions())
      .map((res: Response) => res.json())
      .catch((err: Response) => this.handleError(err));
  }

  deleteOccupancy(id:number){
    let url = APP_HOME+"occupancy/delete/"+id;
    return this.http.delete(url,this.getRequestOptions())
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