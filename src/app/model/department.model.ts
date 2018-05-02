import { Occupancy } from "./occupany.model";
import { Hospital } from "./hospital.model";
import { Room } from "./room.model";
import { Doctor } from "./doctor.model";

export class Department{

    id:number;
    name:string;
    doctors:Doctor[];

    constructor(id:number,name:string)
    {
        this.id=id;
        this.name=name;
    } 
}