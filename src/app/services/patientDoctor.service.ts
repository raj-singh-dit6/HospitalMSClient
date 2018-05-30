import { Injectable } from "@angular/core";
import {Http, RequestOptions, Headers,  Response} from '@angular/http';
import { APP_HOME } from "../shared/constant/api-constant";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { of } from "rxjs/observable/of";
import { FetchRequestOptions } from './request-options.service';

@Injectable()
export class PatientDoctorService {

    constructor(private http: Http) {}

    getPatientDoctorsByPatient(patientId:any){
    let url = APP_HOME+"patientDoctor/all/patient/"+patientId;
    return this.http.get(url,FetchRequestOptions.getRequestOptions())
      .map((res: Response) => res.json())
      .catch((err: Response) => this.handleError(err));
  }

  private handleError(error: Response) {
    return of(null);
  }
}