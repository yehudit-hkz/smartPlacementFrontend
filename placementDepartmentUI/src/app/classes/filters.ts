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