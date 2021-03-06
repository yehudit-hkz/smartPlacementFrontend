    import { City, Branch, Expertise } from './my-enum-list';

    export class Graduate{
    Id:string;
    gender:string;
    lastName:string;
    firstName:string;
    dateOfBirth:Date;
    address:string;
    City:City;
    zipCode:string;
    phone:string;
    email:string;
    Languages:GraduateLanguages[];
    Branch:Branch;
    Expertise:Expertise
    startYear:string;
    endYear:string;
    dateOfRegistration:Date;
    lastUpdate:Date;
    didGraduate:boolean;
    hasDiploma:boolean;
    isWorkerInProfession:boolean;
    companyName:string;
    role:string;
    placedByThePlacementDepartment:boolean;
    hasExperience:boolean;
    isActive:boolean;
    linkToCV:string;
 }
export class GraduateLanguages{
    graduateId:string;
    languageId:number;
    languageName:string;
    level:number;
}


export class MainGraduate{
    Id:string;
    Name:string;
    branchName:string;
    expertiseName:string;
    endYear:string;
    isActive:boolean;
 }

 export class ImportRes{
    errLine:number[];
    readLine:Graduate[];
 }