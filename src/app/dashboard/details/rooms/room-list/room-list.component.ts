import { Component, OnInit, Input } from '@angular/core';
import { Room } from '../../../../model/room.model';
import { RoomService } from '../../../../services/room.service';
import { ModalService } from '../../../../services/modal.service';
import { RoomEditComponent } from '../room-edit/room-edit.component';
import { ConfirmService } from '../../../../shared/confirm-content/confirm.service';
import { ConfirmContentComponent } from '../../../../shared/confirm-content/confirm-content.component';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent implements OnInit {
  @Input() hospitalId;
  rooms:Room[];
  constructor(private roomService:RoomService,private modalService:ModalService,private confirmService:ConfirmService) { }

  ngOnInit() {

    this.roomService.roomsChanged.subscribe(
      (rooms: Room[]) => {
        
        this.rooms = rooms;

    });
    this.roomService.getRoomsByHospital(this.hospitalId).subscribe((result)=>{
      if(result && result.total!=0)
      {
        this.rooms=result.data;
      }
    });
  }
  onEditRoom(room:Room)
  {
    this.modalService.open(RoomEditComponent,room.id,this.hospitalId);
  }

  onDeleteRoom(room:Room)
  {
    this.confirmService.open(ConfirmContentComponent).then((result) => {
      let action = `${result}`;
      if(action.indexOf('yes')!=-1)
      {
        this.roomService.deleteRoom(room.id).subscribe(result=>{
        if(result.success)
        {
          this.roomService.getRoomsByHospital(this.hospitalId).subscribe(result=>{
            if(result && result.total!=0)
            {
              let rooms:Room[]=result.data;
              this.roomService.roomsChanged.next(rooms);
            }
          });
        }
        });
      }
    });
  } 
}
