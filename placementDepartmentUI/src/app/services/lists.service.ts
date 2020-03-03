import { Injectable } from '@angular/core';
import {Branch, Expertise, Subject} from '../classes/my-enum-list'
import { from, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ListsService {
 private   apiURL="http://localhost:55968/api/";
  branches:Branch[]
  expertise:Expertise[];
  subjects:Subject[];
  constructor(private http: HttpClient) {
     this.GetAllList('Branch').subscribe(
       res=>this.branches=res,
       err=>console.log(err));
    this.GetAllList('Expertise').subscribe(
        res=>this.expertise=res,
        err=>console.log(err));
    this.GetAllList('Subject').subscribe(
          res=>this.subjects  =res,
          err=>console.log(err));
   }
  GetAllList(controller:string):Observable<any[]>
  {
    return this.http.get<any[]>(`${this.apiURL}${controller}/GetAll`);
  }
  RefreshList(controller:string){
    switch(controller){
      case 'Branch':this.GetAllList(controller).subscribe(res=>this.branches=res);return;
      case 'Expertise':this.GetAllList(controller).subscribe(res=>this.expertise=res);return;
      case 'Subject':this.GetAllList(controller).subscribe(res=>this.subjects=res);return;
    }
  }
  Save(controller:string,newObject){
    this.RefreshList(controller);
    return this.http.post(`${this.apiURL}${controller}/Save`,newObject);
  }
  Delete(controller:string,id){
    this.RefreshList(controller);
    return this.http.delete(`${this.apiURL}${controller}/Delete?id=${id}`);
  }
}
