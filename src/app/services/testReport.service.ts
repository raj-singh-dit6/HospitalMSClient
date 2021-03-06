import { Subject } from "rxjs/Subject";
import { TestReport } from "../model/testReport.model";
import { Http ,RequestOptions,Response, Headers} from "@angular/http";
import { Injectable } from "@angular/core";
import { APP_HOME } from "../shared/constant/api-constant";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { of } from "rxjs/observable/of";
import { FetchRequestOptions } from './request-options.service';

@Injectable()
export class TestReportService{
    testReportsChanged = new Subject<TestReport[]>();
    constructor(private http: Http) {}
    
    getTestReportReportsByPatient(patientId:any)
    {
      let url = APP_HOME+"testReport/all/patient/"+patientId;
      return this.http.get(url,FetchRequestOptions.getRequestOptions())
      .map((res: Response) => res.json())
      .catch((err: Response) => this.handleError(err));
    }


    getTestReportReports(){
      let url = APP_HOME+"testReport/all";
      return this.http.get(url,FetchRequestOptions.getRequestOptions())
        .map((res: Response) => res.json())
        .catch((err: Response) => this.handleError(err));
    }
  
    getTestReport(id:number){
      let url = APP_HOME+"testReport/"+id;
      return this.http.get(url,FetchRequestOptions.getRequestOptions())
        .map((res: Response) => res.json())
        .catch((err: Response) => this.handleError(err));
    }
  
    addTestReport(testReport:TestReport){
      
       let url = APP_HOME+"testReport/add";
       return this.http.post(url,JSON.stringify(testReport),FetchRequestOptions.getRequestOptions())
        .map((res: Response) => res.json())
         .catch((err: Response) => this.handleError(err));
    }
  
    updateTestReport(testReport:TestReport){
      let url = APP_HOME+"testReport/update";
      return this.http.post(url,JSON.stringify(testReport),FetchRequestOptions.getRequestOptions())
        .map((res: Response) => res.json())
        .catch((err: Response) => this.handleError(err));
    }
  
    deleteTestReport(id:number){
      let url = APP_HOME+"testReport/delete/"+id;
      return this.http.delete(url,FetchRequestOptions.getRequestOptions())
        .map((res: Response) => res.json())
        .catch((err: Response) => this.handleError(err));
    }
  
    private handleError(error: Response) {
      console.error(error);
      return of(null);
    }
}