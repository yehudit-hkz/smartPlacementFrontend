import{Subject,JobCoordinationStatus} from './my-enum-list'

export class JobsCoordination{
    Id:number;
    candidateId:string;
    candidateName:string;
    linkToCV:string;
    jobId:number;
    jobSubject:Subject;
    companyName:string;
    Status:JobCoordinationStatus;
    dateReceived:Date;
    lastUpdateDate:Date; 
}