export class User{
    Id:number;
    name:string;
    email:string;
    isInitialPassword:boolean;
    token:string;
    Permission:Permission;
    isActive:boolean;

}

export class Permission{
    Id:number;
    description:string;
}