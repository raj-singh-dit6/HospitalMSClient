import { Component, OnInit, OnDestroy } from '@angular/core';
import { OccupancyService } from '../../../../services/occupancy.service';
import { ModalService } from '../../../../services/modal.service';
import { OccupancyEditComponent } from '../occupancy-edit/occupancy-edit.component';
import { Subscription } from 'rxjs/Subscription';
import { Occupancy } from '../../../../model/occupany.model';
import { ConfirmService } from '../../../../shared/confirm-content/confirm.service';
import { ConfirmContentComponent } from '../../../../shared/confirm-content/confirm-content.component';
import { ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-occupancy-list',
  templateUrl: './occupancy-list.component.html',
  styleUrls: ['./occupancy-list.component.scss']
})
export class OccupancyListComponent implements OnInit, OnDestroy {
  occupancies:Occupancy[];
  subscription:Subscription;
  constructor(private occupancyService:OccupancyService,private modalService:ModalService,private confirmService:ConfirmService) {  }

  ngOnInit() { 
    this.subscription = this.occupancyService.occupanciesChanged.subscribe(
        (occupancies: Occupancy[]) => {
          
          this.occupancies = occupancies;
        }
      ); 
    this.occupancyService.getOccupancies().subscribe((result)=>{
      if(result && result.total!=0)
      {
        this.occupancies=result.data;
      }
    });
  }

  onEditOccupancy(occupancy:Occupancy)
  {
    this.modalService.open(OccupancyEditComponent,occupancy.id,'')
  }

  onDeleteOccupancy(occupancy:Occupancy)
  {
    this.confirmService.open(ConfirmContentComponent).then((result) => {
    let action = `${result}`;
     if(action.indexOf('yes')!=-1)
     {
        this.occupancyService.deleteOccupancy(occupancy.id).subscribe(result=>{
          if(result.success)
          {
            this.occupancyService.getOccupancies().subscribe(result=>{
              if(result && result.total!=0)
              {
                let occupancies:Occupancy[]=result.data;
                this.occupancyService.occupanciesChanged.next(occupancies);
                ;
              }
            });
          }
         });
     }
    });
  
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
