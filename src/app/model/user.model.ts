import { Role } from "./role.model";
import { Hospital } from "./hospital.model";

export class User{

    id:number;
    userName:string;
    firstName:string;
    lastName:string;
    address:string;
    email:string;
    contact:number;
    roleId:number;
    hospital:Hospital;

    constructor(id:number,userName:string,firstName:string,lastName:string,email:string,roleId:number,hospital:Hospital,address:string,contact:number){
            this.id = id;
            this.userName=userName;
            this.firstName=firstName;
            this.lastName=lastName;
            this.contact=contact;
            this.email=email;
            this.roleId=roleId;
            this.hospital=hospital;
            this.address=address;
    }
}