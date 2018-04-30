import { Component, OnInit, Input } from '@angular/core';
import { Occupancy } from '../../../../../model/occupany.model';

@Component({
  selector: 'app-occupancy',
  templateUrl: './occupancy.component.html',
  styleUrls: ['./occupancy.component.scss']
})
export class OccupancyComponent implements OnInit {
  @Input() occupancy:Occupancy;
  @Input() index: number;
  
  constructor() { }

  ngOnInit() {
  }

}
