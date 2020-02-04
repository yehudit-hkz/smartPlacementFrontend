export class Graduate{
    Id:string;
    Gender:string;
    Name:string;
    City:string;
    Phone:string;
    Email:string;
    subject:string;
    IsWorking:boolean;
    IsInterested:boolean;
    LinkToCV:string ;
    myDate:Date
}
export class GraduateLanguages{
    graduateId:string;
    languageId:number;
    languageName:string;
    level:number;
}