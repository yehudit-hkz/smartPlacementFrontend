import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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
  GetByID(controller:string,id){
    return this.http.get<any>(`${this.apiURL}${controller}/GetById?id=${id}`) ;
  }
  Save(controller:string,newObject){
    return this.http.post(`${this.apiURL}${controller}/Save`,newObject);
  }
  Edit(controller:string,editingobject){
    return this.http.put(`${this.apiURL}${controller}/Edit`,editingobject);
  }
  UploadCVFile(file){
      return this.http.post(`${this.apiURL}Graduate/UploadCVFile`, file);
  }
  Delete(controller:string,id){
      return this.http.delete(`${this.apiURL}${controller}/Delete?id=${id}`);
  }
}
