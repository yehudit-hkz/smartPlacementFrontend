import{Subject,JobCoordinationStatus} from './my-enum-list'

export class JobsCoordination{
    Id:number;
    dateReceived:Date;
    lastUpdateDate:Date; 
    candidateId:string;
    candidateName:string;
    jobId:number;
    jobSubject:Subject;
    status:JobCoordinationStatus;
}