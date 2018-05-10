import { Injectable } from '@angular/core';
import {Http, RequestOptions, Headers,  Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { APP_HOME } from '../shared/constant/api-constant';
import { of } from 'rxjs/observable/of';
import { Subject } from 'rxjs/Subject';
import { Test } from '../model/test.model';

@Injectable()
export class TestService {
  testsChanged = new Subject<Test[]>();
  constructor(private http: Http) {}
  
  getTests(){
    let url = APP_HOME+"test/all";
    return this.http.get(url,this.getRequestOptions())
      .map((res: Response) => res.json())
      .catch((err: Response) => this.handleError(err));
  }

  getTest(id:number){
    let url = APP_HOME+"test/"+id;
    return this.http.get(url,this.getRequestOptions())
      .map((res: Response) => res.json())
      .catch((err: Response) => this.handleError(err));
  }

  addTest(test:Test){
    
     let url = APP_HOME+"test/add";
     return this.http.post(url,JSON.stringify(test),this.getRequestOptions())
      .map((res: Response) => res.json())
       .catch((err: Response) => this.handleError(err));
  }

  updateTest(test:Test){
    let url = APP_HOME+"test/update";
    return this.http.post(url,JSON.stringify(test),this.getRequestOptions())
      .map((res: Response) => res.json())
      .catch((err: Response) => this.handleError(err));
  }

  deleteTest(id:number){
    let url = APP_HOME+"test/delete/"+id;
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