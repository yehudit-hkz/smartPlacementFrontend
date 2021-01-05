import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { City, Language, ReasonForClosingThePosition, JobCoordinationStatus } from '../classes/my-enum-list';
import { Permission } from '../classes/User';
import URL from  '../../assets/apiPath.json' ;

@Injectable({
  providedIn: 'root'
})
export class EnumListsService {
  apiURL= URL.urlApi + "List";
  reasonsForClosing:ReasonForClosingThePosition[];
  jobCoordinationStatuses:JobCoordinationStatus[];
  permissions:Permission[];
  
  constructor(private http: HttpClient) {
    this.http.get<ReasonForClosingThePosition[]>(`${this.apiURL}/GetReasonForClosing`).subscribe(res=>{this.reasonsForClosing=res});
    this.http.get<JobCoordinationStatus[]>(`${this.apiURL}/GetJobCoordinationStatus`).subscribe(res=>{this.jobCoordinationStatuses=res});
    this.http.get<Permission[]>(`${this.apiURL}/GetPermissions`).subscribe(res=>{this.permissions=res});
   }
  }
