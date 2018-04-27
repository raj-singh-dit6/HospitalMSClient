import { Injectable } from '@angular/core';
import {Http, RequestOptions, Headers,  Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { NgForm } from '@angular/forms';
import { of } from 'rxjs/observable/of';
import { Occupancy } from '../model/occupany.model';

@Injectable()
export class OccupancyService {
  _BASEURL:string='http://localhost:8080/SecuredWeb';

  constructor(private http: Http) {}
  
  getOccupancies(){
    let url = this._BASEURL+"/occupancy/all";
    return this.http.get(url,this.getRequestOptions())
      .map((res: Response) => res.json())
      .catch((err: Response) => this.handleError(err));
  }

  addOccupancy(occup:Occupancy){
    let url = this._BASEURL+"/occupancy/add";
    return this.http.post(url,JSON.stringify(occup),this.getRequestOptions())
      .map((res: Response) => res.json())
      .catch((err: Response) => this.handleError(err));
  }

  updateOccupancy(occup:Occupancy){
    let url = this._BASEURL+"/occupancy/update";
    return this.http.post(url,JSON.stringify(occup),this.getRequestOptions())
      .map((res: Response) => res.json())
      .catch((err: Response) => this.handleError(err));
  }

  deleteOccupancy(id:number){
    let url = this._BASEURL+"/occupancy/?id="+id;
    return this.http.get(url,this.getRequestOptions())
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
