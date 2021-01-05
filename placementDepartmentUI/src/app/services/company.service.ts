import { InteractivityChecker } from '@angular/cdk/a11y';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import URL from  '../../assets/apiPath.json' ;
import { Company, Contact } from '../classes/company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  companies:Company[];
  companiesObs:Observable<Company[]>;
  constructor(private http: HttpClient) { 
    this.init();
  }
  init(){
    this.companiesObs = this.http.get<any[]>(`${URL.urlApi}/Company/GetAll`);
    this.companiesObs.subscribe(
      res=>{
        this.companies=res;
        this.companiesObs = of(res); 
      },
      err=>console.log(err));
  }
  Save(controller:string,newObject):Observable<any>
  {
    return this.http.post(`${URL.urlApi}${controller}/Save`,newObject)
    .pipe(tap(res=>
      this.init()
      ));
  }
  Edit(controller:string,editingobject):Observable<any>
  {
    return this.http.put(`${URL.urlApi}${controller}/Edit`,editingobject)
    .pipe(tap(res=>
      this.init()
      ));
  }
  Delete(controller:string,id):Observable<any>
  {
    return this.http.delete(`${URL.urlApi}${controller}/Delete?id=${id}`)
    .pipe(tap(res=>
      this.init()
      ));
  }
  GetCompanyByID(idCompany:number):Observable<Company>
  {
    return this.companiesObs.pipe(
      map(compenies =>
        compenies.find(c => c.Id == idCompany)
      ));
  }
  GetContactsByCompany(idCompany:number):Observable<Contact[]>//neaded????
  {
    return this.companiesObs.pipe(
      map(compenies =>
        compenies.find(c => c.Id == idCompany).Contact
      ));
  }
  GetContactsByID(idContact):Observable<Contact>
  {
    return this.companiesObs.pipe(
      map(compenies =>
        compenies.find(
                  c=> c.Contact.find(cn=> cn.Id == idContact) != undefined
                  ).Contact.find(cn=> cn.Id == idContact)
      ));
  }
}
