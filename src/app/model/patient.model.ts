import { Occupancy } from "./occupany.model";
import { Hospital } from "./hospital.model";
import { Room } from "./room.model";
import { Doctor } from "./doctor.model";
import { PatientStatus } from "./patientStatus.model";

export class Patient{

    id:number;
    room:Room;
    doctor:Doctor;
    admittedDate:Date;
    patientStatus:PatientStatus; 
    hospital:Hospital;

    constructor(id:number,totalBeds:number,remBeds:number,occupancy:Occupancy,hospital:Hospital)
    {
        this.id=id;
    } 
}