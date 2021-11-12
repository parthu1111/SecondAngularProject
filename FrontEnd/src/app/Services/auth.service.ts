import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable,Subject  } from 'rxjs';


const AUTH_API = 'http://localhost:3000/auth/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  signInChange: Subject<boolean> = new Subject<boolean>();
  isSignedIn: boolean;
  constructor(private http:HttpClient) {
    this.isSignedIn=false;
   }

  login(email:String,password:String): Observable<any>{
    return this.http.post(AUTH_API+'login',{email,password},httpOptions);
  }

  signup(name:String,email:String,password:String){
    return this.http.post(AUTH_API+'signup',{name,email,password},httpOptions);
  }
}
