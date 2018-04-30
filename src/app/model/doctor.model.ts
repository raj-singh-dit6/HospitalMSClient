import { Occupancy } from "./occupany.model";
import { Hospital } from "./hospital.model";
import { Room } from "./room.model";
import { Department } from "./department.model";
import { Patient } from "./patient.model";""

export class Doctor{

    id:number;
    description:string;
    active:boolean;
    department:Department;
    patients:Patient[];

    constructor(id:number,description:string,active:boolean,department:Department,patients:Patient[])
    {
        this.id=id;
        this.department=department;
        this.active=active;
        this.patients=this.patients;
    } 
}