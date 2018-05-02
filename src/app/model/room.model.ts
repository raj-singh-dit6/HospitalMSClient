import { Occupancy } from "./occupany.model";
import { Hospital } from "./hospital.model";
import { Patient } from "./patient.model";

export class Room{

    id:number;
    roomInfo:string;
    totalBeds:number;
    remBeds:number;
    occupancy:Occupancy; 
    hospital:Hospital;
    vacantStatus:boolean;
	perDayCharge:number ;
    patients:Patient;

    constructor(id:number,occupancy:Occupancy,hospital:Hospital,roomInfo:string)
    {
        this.id=id;
        this.hospital=hospital;
        this.occupancy=occupancy;
        this.roomInfo=roomInfo;
    } 
}