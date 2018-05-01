import { Occupancy } from "./occupany.model";
import { Hospital } from "./hospital.model";
import { Room } from "./room.model";
import { Department } from "./department.model";
import { Patient } from "./patient.model";import { User } from "./user.model";
""

export class Doctor{

    id:number;
    description:string;
    user:User;
    active:boolean;
    department:string;
    patients:Patient[];
    hospital:Hospital;

    constructor(id:number,description:string,active:boolean,department:string,hospital:Hospital)
    {
        this.id=id;
        this.description=description;
        this.department=department;
        this.hospital=hospital;
    } 
}