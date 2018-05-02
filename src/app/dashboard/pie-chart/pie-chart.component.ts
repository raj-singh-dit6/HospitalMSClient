import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent{
  id = 'chart1';
  width = 600;
  height = 400;
  type = 'pie3d';
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
