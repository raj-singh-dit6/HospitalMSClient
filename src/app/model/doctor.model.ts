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
    active:Boolean;
    department:Department;
    patients:Patient[];
    hospital:Hospital;

    constructor(id:number,description:string,active:Boolean,department:Department,hospital:Hospital,user:User)
    {
        this.id=id;
        this.description=description;
        this.department=department;
        this.hospital=hospital;
        this.user=user;
        this.active=active;
    } 
}