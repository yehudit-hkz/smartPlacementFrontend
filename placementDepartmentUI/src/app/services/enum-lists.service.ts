import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { City, Language, ReasonForClosingThePosition, JobCoordinationStatus } from '../classes/my-enum-list';

@Injectable({
  providedIn: 'root'
})
export class EnumListsService {
  apiURL="http://localhost:55968/api/List"
  cities:City[];
  languages:Language[];
  reasonsForClosing:ReasonForClosingThePosition[];
  jobCoordinationStatuses:JobCoordinationStatus[];
  constructor(private http: HttpClient) {
    this.http.get<City[]>(`${this.apiURL}/GetCities`).subscribe(res=>{this.cities=res});
    this.http.get<Language[]>(`${this.apiURL}/GetLanguages`).subscribe(res=>{this.languages=res});
    this.http.get<ReasonForClosingThePosition[]>(`${this.apiURL}/GetReasonForClosing`).subscribe(res=>{this.reasonsForClosing=res});
    this.http.get<JobCoordinationStatus[]>(`${this.apiURL}/GetJobCoordinationStatus`).subscribe(res=>{this.jobCoordinationStatuses=res});

   }
}
