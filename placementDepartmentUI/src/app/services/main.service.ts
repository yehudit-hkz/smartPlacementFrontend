import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JobsCoordination } from '../classes/jobsCoordination';
import { Contact } from '../classes/contact';
import { Subject } from '../classes/my-enum-list';
import { Graduate } from '../classes/graduate';
import { ChartDataSets } from 'chart.js';
import { ChartsDetails } from '../classes/chartDetails';

//interface for api with lazy louding
export interface ApiRes {
  items: any[];
  totalCount: number;
}


@Injectable({
  providedIn: 'root'
})
export class MainService {
  URL="http://localhost:55968/"
  apiURL;
  constructor(private http: HttpClient) { 
    this.apiURL=this.URL+"api/"
  } 
  GetLazyList(controller:string,sort:string, page:number, size:number,filters):Observable<ApiRes>
  {
    return this.http.get<ApiRes>(`${this.apiURL}${controller}/GetLazyList?page=${page}&size=${size}&sort=${sort}`,{params: filters});
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
  gggg()
  {
    let map1 = new Map()
    .set("A",1)
    .set("B",2)
    .set("C",3);
    
    var map: { [field: string]: string; } = { };
    map['name'] = "A"; // OK
    map['address'] = "B"; // OK
    map['phone'] = "C"; // OK
    map['branch'] = "D"; // OK
    // map[14] = new Customer(); // Not OK, 14 is not a string
    // map['bar@hotmail.com'] = 'x'; // Not OK, 'x' is not a customer
    return this.http.post(`${this.apiURL}Graduate/importFromExcel`, map);
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
  GetChart(chartsDetails):Observable<ChartDataSets[]>
  {
    return this.http.get<ChartDataSets[]>(`${this.apiURL}Chart`,{params: chartsDetails});
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
