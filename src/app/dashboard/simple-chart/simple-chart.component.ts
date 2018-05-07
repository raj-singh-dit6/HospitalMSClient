import { Component, OnInit, Input } from '@angular/core';
import { ChartService } from '../../services/chart.service';

@Component({
  selector: 'app-simple-chart',
  templateUrl: './simple-chart.component.html',
  styleUrls: ['./simple-chart.component.scss']
})
export class SimpleChartComponent implements OnInit{
  @Input() chartFor:string;
  width = 600;
  height = 400;
  type = 'column2d';
  dataFormat = 'json';
  dataSource;

  constructor(private chartService:ChartService) {
  }

  ngOnInit() {
    this.chartService.getChartDataSet(this.chartFor).subscribe(result=>{
      if(result && result!=0)
      {
        this.dataSource=result.data;
      }
    });
  }
}
