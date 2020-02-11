import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams,HttpErrorResponse} from '@angular/common/http';
import {Observable, from } from 'rxjs';
import{Graduate}from '../classes/graduate';
import{Company}from '../classes/company';


@Injectable({
  providedIn: 'root'
})
export class StamService {

  constructor(private http: HttpClient) { }
ssss="http://localhost:55968/"
  baseURL="http://localhost:50748/api/";

  GetAllGraduates():Observable<Graduate[]>
  {
    return this.http.get<Graduate[]>(this.baseURL+'Graduate');
  }
  getGraduateByID(id){
    return this.http.get<Graduate>(this.baseURL+"Graduate/Get?id="+id) ;
  }
  getFile(id): Observable<Blob> {   
      //const options = { responseType: 'blob' }; there is no use of this
      // this.http refers to HttpClient. Note here that you cannot use the generic get<Blob> as it does not compile: instead you "choose" the appropriate API in this way.
    return this.http.get(this.baseURL+"File/Get?id="+id, { responseType: 'blob' }) ;
  }
  getURLFile(): Observable<string> {   
    //const options = { responseType: 'blob' }; there is no use of this
    // this.http refers to HttpClient. Note here that you cannot use the generic get<Blob> as it does not compile: instead you "choose" the appropriate API in this way.
  return this.http.get<string>(this.baseURL+"File");
}
getstr(): Observable<string> {   
  return this.http.get<string>(this.ssss+"api/Graduate");
}
getCMPN():Observable<Company[]>{
  return null;
}
}
