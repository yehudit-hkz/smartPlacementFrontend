export class JobFilters
{
        //public string title { get; set; }
        sendCV:boolean[];
        active:boolean[];
        ReasonClosing:number[];
        period:number;
        startDate:string;
        endDate:string;
        subjects:number[];
        user:number[];
}
export class CompanyFilters
{
    mainSubject:number;
    subjectByJobs:number;
}
export class GraduateFilters
{
    name:string;
    gender:string[];
    active:boolean[];
    didGraduate:boolean[];
    hasDiploma:boolean[];
    isWork:boolean[];
    period:number;
    startDate:string;
    endDate:string;
    expertise:number[];
    branch:number[];
}

export class JobCoordinationFilters
{
    status:number[];
    gender:string[];
    branch:number[];
    subject:number[];
    user:number[];
    period:number;
    startDate:string;
    endDate:string;
}