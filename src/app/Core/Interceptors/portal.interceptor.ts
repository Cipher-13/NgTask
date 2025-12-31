import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { environment } from '../Environment/environment';
import { LoaderService } from 'src/app/Services/loader.service';

@Injectable()
export class PortalInterceptor implements HttpInterceptor {

  constructor(private loader: LoaderService) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
     this.loader.show();


    const isFullUrl = request.url.startsWith('http');
    const apiUrl = isFullUrl
      ? request.url
      : `${environment.baseUrl}${request.url}`;

    const token = localStorage.getItem('token');

    const modifiedRequest = request.clone({
      url: apiUrl,
      setHeaders: token
        ? { Authorization: `Bearer ${token}` }
        : {}
    });

       return next.handle(modifiedRequest).pipe(
      finalize(() => this.loader.hide())
    ); }
}
