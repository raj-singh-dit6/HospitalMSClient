import { Room } from "./room.model";

export class Hospital{
    
    id:number;
    name:string;
    address:string;
    room:Room[];
    constructor(id:number,name:string,address:string,room:Room[]){}   
}