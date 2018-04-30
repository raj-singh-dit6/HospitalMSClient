import { Occupancy } from "./occupany.model";
import { Hospital } from "./hospital.model";
import { Room } from "./room.model";

export class Department{

    id:number;
    name:string;

    constructor(id:number,name:string)
    {
        this.id=id;
        this.name=name;
    } 
}