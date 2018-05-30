import { Injectable } from '@angular/core';
import {Http, RequestOptions, Headers,  Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { APP_HOME } from '../shared/constant/api-constant';


import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserInfo } from '../model/UserInfo.model';
import { Role } from '../model/role.model';
import { of } from 'rxjs/observable/of';
import { Subject } from 'rxjs/Subject';
import { Head } from '../model/head.model';
import { FetchRequestOptions } from './request-options.service';

@Injectable()
export class HeadService {

  headChanged= new Subject<Head>();
  constructor(private http: Http) {}
  
  getHeadByHospital(hospitalId:string){
    let url = APP_HOME+"head/hospital/"+hospitalId;
    return this.http.get(url,FetchRequestOptions.getRequestOptions())
      .map((res: Response) => res.json())
      .catch((err: Response) => this.handleError(err));
  }

  getHeads(){
    let url = APP_HOME+"head/all";
    return this.http.get(url,FetchRequestOptions.getRequestOptions())
      .map((res: Response) => res.json())
      .catch((err: Response) => this.handleError(err));
  }

  getHead(id:number){
    let url = APP_HOME+"head/"+id;
    return this.http.get(url,FetchRequestOptions.getRequestOptions())
      .map((res: Response) => res.json())
      .catch((err: Response) => this.handleError(err));
  }

  addHead(head:Head){
    let url = APP_HOME+"head/add";
    return this.http.post(url,JSON.stringify(head),FetchRequestOptions.getRequestOptions())
      .map((res: Response) => res.json())
      .catch((err: Response) => this.handleError(err));
  }


  updateHead(head:Head){
    let url = APP_HOME+"head/update";
    return this.http.post(url,JSON.stringify(head),FetchRequestOptions.getRequestOptions())
      .map((res: Response) => res.json())
      .catch((err: Response) => this.handleError(err));
  }

  deleteHead(id:number){
    
    let url = APP_HOME+"head/delete/"+id;
    return this.http.delete(url,FetchRequestOptions.getRequestOptions())
      .map((res: Response) => res.json())
      .catch((err: Response) => this.handleError(err));
  }


  private handleError(error: Response) {
    console.error(error);
    return of(null);
  }
}
