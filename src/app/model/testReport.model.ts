import { Test } from "./test.model";
import { Patient } from "./patient.model";

export class TestReport{
    id:number;
    test:Test;
    description:string;
    patient:Patient;
    constructor(id:number,test:Test,description:string,patient:Patient)
    {
        this.id=id;
        this.test=test;
        this.description=this.description;
        this.patient=patient;
    }
}