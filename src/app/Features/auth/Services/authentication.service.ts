import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormRequest, FormResponse } from 'src/app/Core/Interfaces/iform';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private _http :HttpClient){ }

  Login(data:FormRequest):Observable<FormResponse>{
    return this._http.post<FormResponse>('/auth/login', data);
  }
}
