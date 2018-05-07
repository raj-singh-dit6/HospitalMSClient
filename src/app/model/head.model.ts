import { Occupancy } from "./occupany.model";
import { Hospital } from "./hospital.model";
import { Room } from "./room.model";
import { Doctor } from "./doctor.model";
import { PatientStatus } from "./patientStatus.model";
import { User } from "./user.model";

export class Head{

    id:number;
    user:User;
    hospital:Hospital;

    constructor(id:number,user:User,hospital:Hospital)
    {
        this.id=id;
        this.user=user;
        this.hospital=hospital;
    } 
}