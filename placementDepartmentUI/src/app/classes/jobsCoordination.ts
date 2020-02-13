import{Subject,JobCoordinationStatus} from './my-enum-list'

export class JobsCoordination{
    Id:number;
    dateReceived:Date;
    lastUpdateDate:Date; 
    candidateFName:string;
    candidateLName:string;
    jobSubject:Subject;
    status:JobCoordinationStatus;
}