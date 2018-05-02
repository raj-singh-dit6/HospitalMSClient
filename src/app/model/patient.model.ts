import { Occupancy } from "./occupany.model";
import { Hospital } from "./hospital.model";
import { Room } from "./room.model";
import { Doctor } from "./doctor.model";
import { PatientStatus } from "./patientStatus.model";
import { User } from "./user.model";

export class Patient{

    id:number;
    user:User;
    room:Room;
    hospital:Hospital;
    doctor:Doctor;
    admittedDate:Date;
    dischargedDate:Date;
    attendedDate:Date;
    patientStatus:PatientStatus;

    constructor(id:number,user:User,hospital:Hospital,patientStatus:PatientStatus)
    {
        this.user=user;
        this.hospital=hospital;
        this.patientStatus=patientStatus;
    } 
}