import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Iproduct } from '../Core/Interfaces/iproduct';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _http: HttpClient) { }

   List(): Observable<Iproduct[]> {
    return this._http.get<Iproduct[]>('/products');
  }


  Maker(data: Iproduct): Observable<Iproduct> { // single product
    return this._http.post<Iproduct>('/products/add', data);
  }



}
