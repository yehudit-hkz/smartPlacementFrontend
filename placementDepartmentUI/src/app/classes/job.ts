import { ReasonForClosingThePosition, Subject } from './my-enum-list';

export class Job{
    Id:number;
    dateReceived:Date;
    title:string;
    description:string;
    isActive:boolean;
    didSendCV:boolean; 
    lastUpdateDate:Date;
    contactId:number;
    contactName:string;
    companyId:number;
    companyName:string;     
    gettingId:number;
    gettingName:string;
    handlesId:number;
    handlesName:string;
    ReasonForClosing:ReasonForClosingThePosition;
    Subject:Subject;
}