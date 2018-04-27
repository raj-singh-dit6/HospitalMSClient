import { Role } from "./role.model";

export class User{

    id:number;
    userName:string;
    firstName:string;
    lastName:string;
    email:string;
    contact:number;
    dob:Date;
    roleId:number;
    hospitalId:number;

    constructor(id:number,userName:string,firstName:string,lastName:string,email:string,roleId:number,hospitalId:number){
            this.id = id;
            this.userName=userName;
            this.firstName=firstName;
            this.lastName=lastName;
            this.email=email;
            this.roleId=roleId;
            this.hospitalId=hospitalId;
    }
}