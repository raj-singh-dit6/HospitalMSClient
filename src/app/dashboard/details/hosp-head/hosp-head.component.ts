import { Component, OnInit, Input } from '@angular/core';
import { ModalService } from '../../../services/modal.service';
import { HeadService } from '../../../services/head.service';
import { Head } from '../../../model/head.model';
import { HospHeadEditComponent } from './hosp-head-edit/hosp-head-edit.component';
import { ConfirmContentComponent } from '../../../shared/confirm-content/confirm-content.component';
import { ConfirmService } from '../../../shared/confirm-content/confirm.service';


@Component({
  selector: 'app-hosp-head',
  templateUrl: './hosp-head.component.html',
  styleUrls: ['./hosp-head.component.scss']
})
export class HospHeadComponent implements OnInit {
  @Input() hospitalId;
  head:Head;
  constructor(private headService:HeadService,private modalService:ModalService,private confirmService:ConfirmService) { }

  ngOnInit() {

    this.headService.headChanged.subscribe(
      (head: Head) => {
        this.head = head;

    });
    this.headService.getHeadByHospital(this.hospitalId).subscribe((result)=>{
      if(result && result.total!=0)
      {
        
        this.head=result.data;
      }
    });
  }
  onEditHead(head:Head)
  {
    this.modalService.open(HospHeadEditComponent,head.id,this.hospitalId);
  }

  onDeleteHead(head:Head)
  {
    this.confirmService.open(ConfirmContentComponent).then((result) => {
      let action = `${result}`;
       if(action.indexOf('yes')!=-1)
       {
          this.headService.deleteHead(head.id).subscribe(result=>{
          if(result.success)
          {
            this.headService.getHeadByHospital(this.hospitalId).subscribe(result=>{
              if(result && result.total!=0)
              {
                let head:Head=result.data;
                this.headService.headChanged.next(head);
              }
            });
          }
          });
        }
    });
  }

  onAddHead()
  {
    this.modalService.open(HospHeadEditComponent,'',this.hospitalId);
  }

}
