import { Component, OnInit } from '@angular/core';
import { Occupancy } from '../../../../model/occupany.model';
import { OccupancyService } from '../../../../services/occupancy.service';

@Component({
  selector: 'app-occupancy-list',
  templateUrl: './occupancy-list.component.html',
  styleUrls: ['./occupancy-list.component.scss']
})
export class OccupancyListComponent implements OnInit {

  occupancies:Occupancy[];
  
  constructor(private occupancyService:OccupancyService) { }

  ngOnInit() {
      this.occupancyService.getOccupancies().subscribe((result)=>{
         this.occupancies=result.data;
     });
  }
}
