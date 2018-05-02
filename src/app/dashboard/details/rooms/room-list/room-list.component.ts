import { Component, OnInit, Input } from '@angular/core';
import { Room } from '../../../../model/room.model';
import { RoomService } from '../../../../services/room.service';
import { ModalService } from '../../../../services/modal.service';
import { RoomEditComponent } from '../room-edit/room-edit.component';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent implements OnInit {
  @Input() hospitalId;
  rooms:Room[];
  constructor(private roomService:RoomService,private modalService:ModalService) { }

  ngOnInit() {

    this.roomService.roomsChanged.subscribe(
      (rooms: Room[]) => {
        debugger
        this.rooms = rooms;

    });
    this.roomService.getRoomsByHospital(this.hospitalId).subscribe((result)=>{
        if(result.total!=0)
      {
        this.rooms=result.data;
      }
    });
  }
  onEditPatient(room:Room)
  {
    this.modalService.open(RoomEditComponent,room.id,this.hospitalId);
  }

  onDeletePatient(room:Room)
  {

    this.roomService.deleteRoom(room.id).subscribe(result=>{
    if(result.success)
    {
      this.roomService.getRoomsByHospital(this.hospitalId).subscribe(result=>{
        if(result.total!=0)
        {
          let rooms:Room[]=result.data;
          this.roomService.roomsChanged.next(rooms);
        }
      });
    }
    });
  } 
}
