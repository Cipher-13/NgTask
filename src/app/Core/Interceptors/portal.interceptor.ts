import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../Environment/environment';

@Injectable()
export class PortalInterceptor implements HttpInterceptor {

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

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

    return next.handle(modifiedRequest);
  }
}
