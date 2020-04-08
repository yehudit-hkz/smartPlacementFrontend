import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JobsCoordination } from '../classes/jobsCoordination';
import { Contact } from '../classes/contact';
import { Subject } from '../classes/my-enum-list';
import { Graduate } from '../classes/graduate';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  URL="http://localhost:55968/"
  apiURL;
  constructor(private http: HttpClient) { 
    this.apiURL=this.URL+"api/"
  }

  GetAllList(controller:string):Observable<any[]>
  {
    return this.http.get<any[]>(`${this.apiURL}${controller}/GetAll`);
  }
  GetListByFilters(controller:string,filters):Observable<any[]>
  {
    return this.http.get<any[]>(`${this.apiURL}${controller}/GetByFilters`,{params: filters});
  }
  GetByID(controller:string,id):Observable<any>
  {
    return this.http.get<any>(`${this.apiURL}${controller}/GetById?id=${id}`) ;
  }
  Save(controller:string,newObject):Observable<any>
  {
    return this.http.post(`${this.apiURL}${controller}/Save`,newObject);
  }
  Edit(controller:string,editingobject):Observable<any>
  {
    return this.http.put(`${this.apiURL}${controller}/Edit`,editingobject);
  }
  Delete(controller:string,id):Observable<any>
  {
      return this.http.delete(`${this.apiURL}${controller}/Delete?id=${id}`);
  }
  UploadCVFile(file):Observable<any>
  {
    return this.http.post(`${this.apiURL}Graduate/UploadCVFile`, file);
  }
  gggg(subject:Subject):Observable<Graduate[]>
  {
    return this.http.get<Graduate[]>(`${this.apiURL}Graduate/GetBySubject?subject=${subject}`);
  }
  GetContactsByCompany(idCompany:number):Observable<Contact[]>
  {
    return this.http.get<Contact[]>(`${this.apiURL}Contact/GetByCompany?idCompany=${idCompany}`) ;
  }
  GetCoordinationByGraduate(idGraduate:string):Observable<JobsCoordination[]>
  {
    return this.http.get<JobsCoordination[]>(`${this.apiURL}JobsCoordination/GetByGraduate?idGraduate=${idGraduate}`);
  }
  GetCoordinationByJob(idJob:number):Observable<JobsCoordination[]>
  {
    return this.http.get<JobsCoordination[]>(`${this.apiURL}JobsCoordination/GetByJob?idJob=${idJob}`);
  }



  //for translate paginator label
    dutchRangeLabel = (page: number, pageSize: number, length: number) => {
      if (length == 0 || pageSize == 0) { return `0 מתוך ${length}`; }
      
      length = Math.max(length, 0);

      const startIndex = page * pageSize;

      // If the start index exceeds the list length, do not try and fix the end index to the end.
      const endIndex = startIndex < length ?
          Math.min(startIndex + pageSize, length) :
          startIndex + pageSize;

      return `${startIndex + 1} - ${endIndex} מתוך ${length}`;
    }
}
