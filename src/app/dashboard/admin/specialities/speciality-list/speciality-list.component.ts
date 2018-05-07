import { Component, OnInit, OnDestroy } from '@angular/core';
import { Speciality } from '../../../../model/speciality.model';
import { SpecialityService } from '../../../../services/speciality.service';
import { ModalService } from '../../../../services/modal.service';
import { SpecialityEditComponent } from '../speciality-edit/speciality-edit.component';
import { Subscription } from 'rxjs/Subscription';
import { ConfirmService } from '../../../../shared/confirm-content/confirm.service';
import { ConfirmContentComponent } from '../../../../shared/confirm-content/confirm-content.component';

@Component({
  selector: 'app-speciality-list',
  templateUrl: './speciality-list.component.html',
  styleUrls: ['./speciality-list.component.scss']
})
export class SpecialityListComponent implements OnInit, OnDestroy {
  specialities:Speciality[];
  subscription:Subscription;

  constructor(private specialityService:SpecialityService,private modalService:ModalService,private confirmService:ConfirmService) {  }

  ngOnInit() { 
    this.subscription = this.specialityService.specialitiesChanged
      .subscribe(
        (specialities: Speciality[]) => {
          
          this.specialities = specialities;
        }
      ); 
    this.specialityService.getSpecialities().subscribe((result)=>{
      if(result && result.total!=0)
      {
        this.specialities=result.data;
      }
    });
  }



  onEditSpeciality(speciality:Speciality)
  {
    this.modalService.open(SpecialityEditComponent,speciality.id,'')
  }

  onDeleteSpeciality(speciality:Speciality)
  {
    this.confirmService.open(ConfirmContentComponent).then((result) => {
      let action = `${result}`;
      if(action.indexOf('yes')!=-1)
      {
        this.specialityService.deleteSpeciality(speciality.id).subscribe(result=>{
          if(result.success)
          {
            this.specialityService.getSpecialities().subscribe(result=>{
              if(result && result.total!=0)
              {
                let specialities:Speciality[]=result.data;
                this.specialityService.specialitiesChanged.next(specialities);
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
