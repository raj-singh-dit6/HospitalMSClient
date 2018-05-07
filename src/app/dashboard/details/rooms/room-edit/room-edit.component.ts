import { Component, OnInit, Input } from '@angular/core';
import { Hospital } from '../../../../model/hospital.model';
import { Occupancy } from '../../../../model/occupany.model';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { RoomService } from '../../../../services/room.service';
import { OccupancyService } from '../../../../services/occupancy.service';
import { HospitalService } from '../../../../services/hospital.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Room } from '../../../../model/room.model';

@Component({
  selector: 'app-room-edit',
  templateUrl: './room-edit.component.html',
  styleUrls: ['./room-edit.component.scss']
})
export class RoomEditComponent implements OnInit {
  @Input() id: any;
  @Input() id2: any;
  hospital: Hospital;
  occupancies: Occupancy[];
  editMode= false;
  roomForm: FormGroup;
  constructor(private roomService: RoomService,private occupancyService:OccupancyService,
     private hospitalService: HospitalService,
     public activeModal: NgbActiveModal,private formBuilder:FormBuilder) { }

  ngOnInit() {
    this.editMode=this.id!=null && this.id!='';
    this.hospitalService.getHospital(this.id2).subscribe(result => {
      if(result && result.total!=0)
      {
        this.hospital = result.data;
      }
    });

    this.occupancyService.getOccupancies().subscribe(result=>{
      if(result && result.total!=0)
      {
        this.occupancies = result.data;
      }
    });
    this.initForm();

  }

  private initForm() {
    this.roomForm = this.formBuilder.group({});
    let roomInfo = '';
    let perDayCharge :number;
    let occupancy : number;
    if (this.editMode) {
      let room: Room;
      this.roomService.getRoom(this.id).subscribe(result => {
        if (result.total != 0) {
          room = result.data
          roomInfo = room.roomInfo;
          perDayCharge   = room.perDayCharge;
          occupancy = room.occupancy.id;
          this.createForm(roomInfo,occupancy,perDayCharge);
        }
      });
    }else{
        this.createForm();
    }
  }
  
createForm(roomInfo:any='',occupancy:any='',perDayCharge:any=0){

    this.roomForm = this.formBuilder.group({
      'occupancy': new FormControl(occupancy, Validators.required),
      'roomInfo': new FormControl(roomInfo, Validators.required),
      'perDayCharge': new FormControl(perDayCharge, 
        [Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)]),
    });
  }

  onSubmit() {
    const hospId=this.roomForm.get('hospital').value;
    const occupancyId=this.roomForm.get('occupancy').value;
    const updateRoom:any=this.roomForm.value;
    const occupancy=this.occupancies.find(x=>x.id==occupancyId);
    const room:Room=new Room(this.id,occupancy,this.hospital,updateRoom.roomInfo,updateRoom.perDayCharge);
    if (this.editMode) {
      this.roomService.updateRoom(room).subscribe(result => {
        if (result.success) {
          this.roomService.getRoomsByHospital(this.id2).subscribe(result=>{
            if(result && result.total!=0)
            {
              let rooms:Room[]=result.data;
              this.roomService.roomsChanged.next(rooms);
            }
          });
        }
      });
    } else {
      this.roomService.addRoom(room).subscribe(result => {
        if (result.success) {
          this.roomService.getRoomsByHospital(this.id2).subscribe(result=>{
            if(result && result.total!=0)
            {
              let rooms:Room[]=result.data;
              this.roomService.roomsChanged.next(rooms);
            }
          });
        }      
      });
    }
    this.activeModal.close();
  }

}
