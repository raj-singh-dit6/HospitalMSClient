import { Injectable } from '@angular/core';
import {Http, RequestOptions, Headers,  Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { APP_HOME } from '../shared/constant/api-constant';
import { of } from 'rxjs/observable/of';
import { Subject } from 'rxjs/Subject';
import { Occupancy } from '../model/occupany.model';
import { FetchRequestOptions } from './request-options.service';

@Injectable()
export class OccupancyService {
  occupanciesChanged = new Subject<Occupancy[]>();
  constructor(private http: Http) {}
  
  getOccupancies(){
    let url = APP_HOME+"occupancy/all";
    return this.http.get(url,FetchRequestOptions.getRequestOptions())
      .map((res: Response) => res.json())
      .catch((err: Response) => this.handleError(err));
  }

  getOccupancy(id:number){
    let url = APP_HOME+"occupancy/"+id;
    return this.http.get(url,FetchRequestOptions.getRequestOptions())
      .map((res: Response) => res.json())
      .catch((err: Response) => this.handleError(err));
  }

  addOccupancy(occupancy:Occupancy){
    
     let url = APP_HOME+"occupancy/add";
     return this.http.post(url,JSON.stringify(occupancy),FetchRequestOptions.getRequestOptions())
      .map((res: Response) => res.json())
       .catch((err: Response) => this.handleError(err));
  }

  updateOccupancy(occupancy:Occupancy){
    let url = APP_HOME+"occupancy/update";
    return this.http.post(url,JSON.stringify(occupancy),FetchRequestOptions.getRequestOptions())
      .map((res: Response) => res.json())
      .catch((err: Response) => this.handleError(err));
  }

  deleteOccupancy(id:number){
    let url = APP_HOME+"occupancy/delete/"+id;
    return this.http.delete(url,FetchRequestOptions.getRequestOptions())
      .map((res: Response) => res.json())
      .catch((err: Response) => this.handleError(err));
  }

  private handleError(error: Response) {
    console.error(error);
    return of(null);
  }
}