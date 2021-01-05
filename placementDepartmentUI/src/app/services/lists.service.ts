import { Injectable } from '@angular/core';
import {Branch, City, Expertise, Language, Subject} from '../classes/my-enum-list'
import { of, from, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../classes/User';
import { tap } from 'rxjs/operators';
import URL from  '../../assets/apiPath.json';

@Injectable({
  providedIn: 'root'
})
export class ListsService {
  branches:Branch[];
  branchesObs:Observable<Branch[]>;
  expertises:Expertise[];
  expertisesObs:Observable<Expertise[]>;
  subjects:Subject[]; 
  subjectsObs:Observable<Subject[]>;
  languages:Language[]; 
  languagesObs:Observable<Language[]>;
  areas:string[]; 
  cities:City[];
  citiesObs:Observable<City[]>;
  users:User[];
  usersObs:Observable<User[]>;

  constructor(private http: HttpClient) {
    this.RefreshList('Branch');
    this.RefreshList('Expertise');
    this.RefreshList('Subject');
    this.RefreshList('Language');
    this.RefreshList('City');
    this.RefreshList('User');
   }
  
  RefreshList(controller:string){
    switch(controller){
      case 'Branch':
        this.branchesObs = this.GetAllList(controller);
        this.branchesObs.subscribe(res=>{
          this.branches=res;
          this.branchesObs = of(res); 
        });
        return;
      case 'Expertise':
        this.expertisesObs =  this.GetAllList(controller)
        this.expertisesObs.subscribe(res=>{
          this.expertises=res;
          this.expertisesObs = of(res); 
        });
        return;
      case 'Subject':
        this.subjectsObs = this.GetAllList(controller);
        this.subjectsObs.subscribe(res=>{
          this.subjects=res
          this.subjectsObs = of(res); 
        });
        return;
      case 'Language':
        this.languagesObs = this.GetAllList(controller);
        this.languagesObs.subscribe(res=>{
          this.languages=res;
          this.languagesObs = of(res); 
        });
        return;
      case 'City':
        this.citiesObs = this.GetAllList(controller);
        this.citiesObs.subscribe(res=>{
          this.cities=res;
          let set = new Set<string>();
          this.cities.forEach(c=> set.add(c.area));
          this.areas=[...set]; //Array.from(set);
          this.citiesObs = of(res); 

        });
        return;
      case 'User':
        this.usersObs = this.GetAllList(controller);
        this.usersObs.subscribe(res=>{
          this.users=res;
          this.usersObs =  of(res); 
        });
        return;
        
    }
  }
  GetAllList(controller:string):Observable<any[]>
  {
    return this.http.get<any[]>(`${URL.urlApi}${controller}/GetAll`);
  }
  getObsByController(controller:string):Observable<any[]>
  {
    switch(controller){
      case 'Branch':
        return this.branchesObs;
      case 'Expertise':
        return this.expertisesObs;
      case 'Subject':
        return this.subjectsObs;
      case 'Language':
        return this.languagesObs;
      case 'City':
          return this.citiesObs;
    }
  }
  nameExist(controller:string, name:string):boolean{
    switch(controller){
      case 'Branch':
        return this.branches.some(b=> b.name == name);
      case 'Expertise':
        return this.expertises.some(e=> e.name == name);;
      case 'Subject':
        return this.subjects.some(s=> s.name == name);;
      case 'Language':
        return this.languages.some(l=> l.name == name);;
      case 'City':
          return this.cities.some(c=> c.name == name);
    }
  }

  Save(controller:string,newObject):Observable<number>{
    return this.http.post<number>(`${URL.urlApi}${controller}/Save`,newObject)
    .pipe(tap(res=>
      this.RefreshList(controller)
      ));
  }
  edit(controller:string,newObject):Observable<any>{
    return this.http.put<number>(`${URL.urlApi}${controller}/Edit`,newObject)
    .pipe(tap(res=>
      this.RefreshList(controller)
      ));
  }
  Delete(controller:string,id:number):Observable<any>{
    return this.http.delete(`${URL.urlApi}${controller}/Delete?id=${id}`)
    .pipe(tap(res=>
      this.RefreshList(controller)
      ));
  }
  DeleteSubjInExprt(idExpertise:number, idSubject:number){
    return this.http.delete(`${URL.urlApi}ExprtWithSubj/Delete?idExpertise=${idExpertise}&idSubject=${idSubject}`);
  }
  NewUser(password:string,newObject:User):Observable<any>
  {
    return this.http.post(`${URL.urlApi}User/Save?password=${password}`,newObject)
    .pipe(tap(res=>
      this.RefreshList('User')
      ));
  }
}
