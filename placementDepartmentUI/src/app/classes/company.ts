import{City,Subject} from './my-enum-list'

export class Company{
    Id:number;
    name:string;
    address:string;
    descriptiovOfActivity:string
    City:City; 
    Subject: Subject
    Contact:Contact[];
}

export class Contact{
    Id:number;
    name:string;
    officePhone:string;
    phone:string;
    email:string;
    companyId:number;
    companyName:string;
}