import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { JobsCoordination } from '../classes/jobsCoordination';
import { Graduate, ImportRes } from '../classes/graduate';
import { ChartDataSets } from 'chart.js';
import URL from  '../../assets/apiPath.json' ;

//interface for api with lazy louding
export interface ApiRes {
  items: any[];
  totalCount: number;
}

@Injectable({
  providedIn: 'root'
})
export class MainService {
  
  constructor(private http: HttpClient)
  { 
  } 
  GetLazyList(controller:string,sort:string, page:number, size:number,filters):Observable<ApiRes>
  {
    return this.http.get<ApiRes>(`${URL.urlApi}${controller}/GetLazyList?page=${page}&size=${size}&sort=${sort}`,{params: filters});
  }
  GetAllList(controller:string):Observable<any[]>
  {
    return this.http.get<any[]>(`${URL.urlApi}${controller}/GetAll`);
  }
  GetListByFilters(controller:string,filters):Observable<any[]>
  {
    return this.http.get<any[]>(`${URL.urlApi}${controller}/GetByFilters`,{params: filters});
  }
  GetByID(controller:string,id):Observable<any>
  {
    return this.http.get<any>(`${URL.urlApi}${controller}/GetById?id=${id}`) ;
  }
  Save(controller:string,newObject):Observable<any>
  {
    return this.http.post(`${URL.urlApi}${controller}/Save`,newObject);
  }
  Edit(controller:string,editingobject):Observable<any>
  {
    return this.http.put(`${URL.urlApi}${controller}/Edit`,editingobject);
  }
  Delete(controller:string,id):Observable<any>
  {
    return this.http.delete(`${URL.urlApi}${controller}/Delete?id=${id}`);
  }
  GetGraduateForJob(idSubject:number,idJob:number):Observable<Graduate[]>{
    return this.http.get<any>(`${URL.urlApi}Graduate/GetForJob?idSubject=${idSubject}&idJob=${idJob}`) ;
  }
  getCVFile(fileName:string):Observable<any>
  {
    return this.http.get(`${URL.urlApi}Graduate/GetCVFile?fileName=${fileName}`,{responseType: 'arraybuffer'});
  }
  UploadCVFile(file:FormData):Observable<any>
  {
    return this.http.post(`${URL.urlApi}Graduate/UploadCVFile`, file);
  }
  ImportGraduateFromExcel(formData:FormData):Observable<ImportRes>
  {
    return this.http.post<ImportRes>(`${URL.urlApi}Graduate/importFromExcel`, formData );
  }
  SendActiveMessage(graduates:Graduate[]):Observable<string[]>
  {
    return this.http.post<string[]>(`${URL.urlApi}Graduate/sendActiveMSG`, graduates );
  }
  GetCoordinationByGraduate(idGraduate:string):Observable<JobsCoordination[]>
  {
    return this.http.get<JobsCoordination[]>(`${URL.urlApi}JobsCoordination/GetByGraduate?idGraduate=${idGraduate}`);
  }
  GetCoordinationByJob(idJob:number):Observable<JobsCoordination[]>
  {
    return this.http.get<JobsCoordination[]>(`${URL.urlApi}JobsCoordination/GetByJob?idJob=${idJob}`);
  }
  SaveCoordinations(idJob:number,graduates:Graduate[]):Observable<string[]>
  {
    return this.http.post<string[]>(`${URL.urlApi}JobsCoordination/Save?idJob=${idJob}`,graduates);
  }
  sendCoordinations(massege:string,coordinatings:JobsCoordination[]):Observable<any>
  {
    return this.http.put<any>(`${URL.urlApi}JobsCoordination/sendCV?&massege=${massege}`,coordinatings);
  }
  GetChart(chartsDetails):Observable<ChartDataSets[]>
  {
    return this.http.get<ChartDataSets[]>(`${URL.urlApi}Chart`,{params: chartsDetails});
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
