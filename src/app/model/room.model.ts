import { Occupancy } from "./occupany.model";
import { Hospital } from "./hospital.model";

export class Room{

    id:number;
    totalBeds:number;
    remBeds:number;
    occupancy:Occupancy; 
    hospital:Hospital; 

    constructor(id:number,totalBeds:number,remBeds:number,occupancy:Occupancy,hospital:Hospital)
    {
        this.id=id;
        this.totalBeds=totalBeds;
        this.remBeds=remBeds;
        this.hospital=hospital;
        this.occupancy=occupancy;
    } 
}