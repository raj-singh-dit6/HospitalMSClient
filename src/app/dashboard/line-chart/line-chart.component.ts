import { Component,Input, AfterViewInit, OnInit } from '@angular/core';
import { ChartService } from '../../services/chart.service';
import * as Chart from 'chart.js';
import { Patient } from '../../model/patient.model';
import { PatientService } from '../../services/patient.service';
import { PatientStatusDailyDataSet } from '../../model/patientStatusDailyDataSet.model';
import { Type } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit ,AfterViewInit{ 
 @Input() hospitalId:number;
 chart=[];
 canvas:any;
 ctx:any;
 admittedList=[];
 dischargedList=[];    
 daysInCurrentMonth=[];
 patientStatusDailyDataSet:PatientStatusDailyDataSet;
 constructor(private patientService:PatientService){}

 ngOnInit(){
    this.canvas = document.getElementById('myChart');
    this.ctx = this.canvas.getContext('2d');
    
    this.prepareDataSet();
    //this.initChart();
}
ngAfterViewInit(){
    this.initChart();
}

prepareDataSet()
{
    let today = new  Date();
    this.daysInCurrentMonth=this.getDaysInMonth(today.getMonth(),today.getFullYear());
    this.patientService.getPatientsDailyStatus(this.hospitalId).subscribe(result=>{
        if(result && result.total!=0)
        {
            let data1=result.data.admittedList;
            // this.admittedList=data1.map(x => Object.assign({}, x));
            for (let entry of data1) {
                this.admittedList.push(entry); 
            }
            
            let data2=result.data.dischargedList;
            for (let entry of data2) {
                this.dischargedList.push(entry); 
            }
            
        }
    });
}
initChart(){
    console.log(this.admittedList);
    console.log(this.dischargedList);
this.chart = new Chart(this.ctx, {
    type: 'line',
    data: {
        labels: this.daysInCurrentMonth,
        datasets: [
            { 
                // data: [0,0,0,0,0,0,0,0,0,0,
                //         1,1,1,1,1,1,1,1,1,1,
                //         0,0,0,0,0,0,0,0,0,0],
                data: this.admittedList,
                label: 'Admitted',
                backgroundColor: [
                    'rgba(0,0,255,0.3)'
                ],
                borderColor: [
                    'rgba(0,0,255,0.3)'
                ],
                borderWidth: 2
              },
              { 
                // data:[
                //     1,1,1,1,1,1,1,1,1,1,
                //     0,0,0,0,0,0,0,0,0,0,
                //     0,0,0,0,0,0,0,0,0,0],
                data:this.dischargedList,
                label: 'Discharged',
                backgroundColor: [
                    'rgba(255,255,0,0.3)'
                ],
                borderColor: [
                    'rgba(255,255,0,0.3)'
                ],
                borderWidth: 2
              }
        ]
    },
    options: {
        scales: {
          xAxes: [{
            display: true,
            ticks: {
                beginAtZero:true
                
            }

          }],
          yAxes: [{
            display: true,
            ticks: {
                beginAtZero:true
            }
          }],
        },
        title: {
            display: true,
            text: 'Daily report of patients admitted & discharged for '+new Date().toLocaleDateString('en', { year: 'numeric', month: 'short'})
        }
      }
    });
    console.log('AFTER CHART INIT');
    console.log(this.admittedList);
    console.log(this.dischargedList);
  }
  getDaysInMonth(month,year) {
    let date = new Date(year, month, 1);
    let days = [];
    while (date.getMonth() === month) {
       days.push(new Date(date).toLocaleDateString('en', { year: 'numeric', month: 'short', day: 'numeric' }));
       date.setDate(date.getDate() + 1);
    }
    return days;
 }
} 

