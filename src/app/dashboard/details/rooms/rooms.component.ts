import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalService } from '../../../services/modal.service';
import { RoomService } from '../../../services/room.service';
import { RoomEditComponent } from './room-edit/room-edit.component';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {

  hospitalId:string;
  constructor(private roomService:RoomService,private route:ActivatedRoute,private modalService:ModalService) { 
    this.hospitalId = route.snapshot.paramMap.get('hospitalId');
  }

  ngOnInit() {

  }
  onNewRoom()
  {
     this.modalService.open( RoomEditComponent,'',this.hospitalId);
  }
}
