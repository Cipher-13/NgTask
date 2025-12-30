import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FormRequest, FormResponse } from '../Core/Interfaces/iform';
import { Icontrol } from '../Core/Interfaces/icontrol';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
 constructor(private _http :HttpClient){ }

Login(data:FormRequest):Observable<FormResponse>{
 return this._http.post<FormResponse>('/auth/login', data);
 }

  logout(): void {
     localStorage.clear();
  }


  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  Current(): Observable<Icontrol> { // CurrentUser
    if (!this.isLoggedIn()) {
     console.log('User is not logged in');
    }
    return this._http.get<Icontrol>('/users/me');
  }
}

