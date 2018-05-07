import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../../model/hospital.model';
import { UserInfo } from '../../../model/UserInfo.model';
import { Room } from '../../../model/room.model';
import { RoomService } from '../../../services/room.service';

@Component({
  selector: 'app-head-rooms',
  templateUrl: './head-rooms.component.html',
  styleUrls: ['./head-rooms.component.scss']
})
export class HeadRoomsComponent implements OnInit {
  hospital:Hospital;
  userInfo:UserInfo;
  rooms:Room[];
  constructor(private roomService:RoomService) { }

  ngOnInit() {
    let currentUser= localStorage.getItem('user');
    this.userInfo = JSON.parse(localStorage.getItem('user')) || { userName: '' }; 
    this.hospital=this.userInfo.hospital;
    this.roomService.getRoomsByHospital(this.hospital.id).subscribe(result=>{
      if(result && result.total!=0){
        this.rooms=result.data;
      }
    });
  }
}
