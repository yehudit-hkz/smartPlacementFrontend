export class JobFilters
{
        //public string title { get; set; }
        sendCV:boolean[];
        active:boolean[];
        period:number;
        startDate:string;
        endDate:string;
        subjects:number[];
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
    expertise:number[];
    branch:number[];
}