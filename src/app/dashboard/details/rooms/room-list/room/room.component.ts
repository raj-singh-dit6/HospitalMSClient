import { Component, OnInit, Input } from '@angular/core';
import { Room } from '../../../../../model/room.model';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {
  @Input() room:Room;
  @Input() index: number;
  constructor() { }

  ngOnInit() {
  }

}
