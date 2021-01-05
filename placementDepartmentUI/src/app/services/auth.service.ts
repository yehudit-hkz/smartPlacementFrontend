import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../classes/User';
import URL from  '../../assets/apiPath.json' ;

export interface Page {
  uri: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user:User;
  pages:Page[] = [];

  constructor(private http: HttpClient) { 
    this.user = JSON.parse(localStorage.getItem('curr-user'))
  }

  login(username:string, password:string):Observable<User>{
    return this.http.get<User>(`${URL.urlApi}User/Validate?email=${username}&password=${password}`);
  }
  logout(clear:boolean){
    this.user = null;
    this.pages = [];
    localStorage.removeItem('curr-user');
    localStorage.removeItem('expiry-date');
    if(!clear)
      window.location.reload();
  }
  ChangePass(id:number,isInit:boolean,newPassword:string){
    return this.http.put(`${URL.urlApi}User/ChangePass?id=${id}&isInit=${isInit}&password=${newPassword}`,null);
  }
  getPages(){
     this.http.get<any[]>(`${URL.urlApi}List/GetPages`).subscribe(data=>this.pages=data);
  }
}
