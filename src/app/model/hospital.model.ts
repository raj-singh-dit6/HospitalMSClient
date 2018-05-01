import { Room } from "./room.model";
import { Speciality } from "./speciality.model";

export class Hospital{
    
    id:number;
    name:string;
    address:string;
    room:Room[];
    speciality:Speciality;
    contact:number;
    active:Boolean;
    constructor(id:number,name:string,address:string,speciality:Speciality,contact:number,active:Boolean){
        this.id=id;
        this.name=name;
        this.address=address;
        this.speciality=speciality,
        this.contact=contact;
        this.active=active;
    }   
}