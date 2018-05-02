import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-simple-chart',
  templateUrl: './simple-chart.component.html',
  styleUrls: ['./simple-chart.component.scss']
})
export class SimpleChartComponent{
  id = 'chart1';
  width = 600;
  height = 400;
  type = 'column2d';
  dataFormat = 'json';
  dataSource;

  constructor() {
      this.dataSource = {
          "chart": {
              "caption": "Harry's SuperMart",
              "subCaption": "Top 5 stores in last month by revenue",
              "numberprefix": "$",
              "theme": "fint"
          },
          "data": [
              {
                  "label": "Bakersfield Central",
                  "value": "880000"
              },
              {
                  "label": "Garden Groove harbour",
                  "value": "730000"
              },
              {
                  "label": "Los Angeles Topanga",
                  "value": "590000"
              },
              {
                  "label": "Compton-Rancho Dom",
                  "value": "520000"
              },
              {
                  "label": "Daly City Serramonte",
                  "value": "330000"
              }
          ]
      }
  }
}
