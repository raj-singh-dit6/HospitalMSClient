import { Role } from "./role.model";

export class UserInfo{

    id:number;
    userName:string;
    firstName:string;
    lastName:string;
    email:string;
    contact:number;
    roles:Role[];
    sessionKey:string;

    constructor(id:number,userName:string,firstName:string,lastName:string,email:string,roles:Role[]){
            this.id = id;
            this.userName=userName;
            this.firstName=firstName;
            this.lastName=lastName;
            this.email=email;
            this.roles=roles;
    }
}