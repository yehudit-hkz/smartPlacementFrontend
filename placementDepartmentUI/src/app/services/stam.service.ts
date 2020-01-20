import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams,HttpErrorResponse} from '@angular/common/http';
import {Observable, from } from 'rxjs';
import{Graduate}from '../classes/graduate';

@Injectable({
  providedIn: 'root'
})
export class StamService {

  constructor(private http: HttpClient) { }
  baseURL="http://localhost:50748/api/";

  GetAllGraduates():Observable<Graduate[]>
  {
    return this.http.get<Graduate[]>(this.baseURL+'Graduate');
  }
  getGraduateByID(id){
    return this.http.get<Graduate>(this.baseURL+"Graduate/Get?id="+id) ;
  }
}
