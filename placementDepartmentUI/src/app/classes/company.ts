import{City,Subject} from './my-enum-list'
import { Contact } from './contact';

export class Company{

    Id:number;
    name:string;
    address:string;
    descriptiovOfActivity:string
    City:City; 
    Subject: Subject
    Contact:Contact[];
}
