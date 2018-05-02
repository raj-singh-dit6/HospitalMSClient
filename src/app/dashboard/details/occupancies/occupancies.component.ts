import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../../services/modal.service';
import { OccupancyEditComponent } from './occupancy-edit/occupancy-edit.component';

@Component({
  selector: 'app-occupancies',
  templateUrl: './occupancies.component.html',
  styleUrls: ['./occupancies.component.scss']
})
export class OccupanciesComponent implements OnInit {

  constructor(private modalService:ModalService) { }

  ngOnInit() {
    
  }

  onAddOccupancy()
  {
    this.modalService.open(OccupancyEditComponent,'','');
  }

}
