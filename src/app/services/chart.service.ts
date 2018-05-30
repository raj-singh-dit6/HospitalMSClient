import { Injectable } from '@angular/core';
import {Http, RequestOptions, Headers,  Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { of } from 'rxjs/observable/of';
import { APP_HOME } from '../shared/constant/api-constant';
import { FetchRequestOptions } from './request-options.service';

@Injectable()
export class ChartService {
  constructor(private http: Http) {}
  
  getChartDataSet(type:string){
    let url = APP_HOME+"chart/"+type;
    return this.http.get(url,FetchRequestOptions.getRequestOptions())
      .map((res: Response) => res.json())
      .catch((err: Response) => this.handleError(err));
  }

  private handleError(error: Response) {
    console.error(error);
    return of(null);
  }
}