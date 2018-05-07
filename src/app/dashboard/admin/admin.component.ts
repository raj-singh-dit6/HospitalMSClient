import { Component, OnInit } from '@angular/core';
import { ChartService } from '../../services/chart.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  chartFor:string="HPM";
  constructor() { }

  ngOnInit() {
  }
    
}
