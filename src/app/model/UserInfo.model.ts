import { Role } from "./role.model";
import { Hospital } from "./hospital.model";

export class UserInfo{

    id:number;
    userName:string;
    firstName:string;
    lastName:string;
    email:string;
    contact:number;
    roles:Role[];
    sessionKey:string;
    hospital:Hospital;

    constructor(id:number,userName:string,firstName:string,lastName:string,email:string,roles:Role[],hospital:Hospital){
            this.id = id;
            this.userName=userName;
            this.firstName=firstName;
            this.lastName=lastName;
            this.email=email;
            this.roles=roles;
            this.hospital=hospital;
    }
}