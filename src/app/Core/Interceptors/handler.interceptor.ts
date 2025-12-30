import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class HandlerInterceptor implements HttpInterceptor {

  constructor(private snackBar: MatSnackBar) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An unknown error occurred';

        if (error.error instanceof ErrorEvent) {
          errorMessage = `Client Error: ${error.error.message}`;
        } else {
          switch (error.status) {
            case 0:
              errorMessage = 'No connection. Please check your network.';
              break;
            case 400:
              errorMessage = 'Bad Request. Please check your input.';
              break;
            case 401:
              errorMessage = 'Unauthorized. Please log in again.';
              break;
            case 403:
              errorMessage = 'Forbidden. You don’t have permission.';
              break;
            case 404:
              errorMessage = 'Not Found. The resource doesn’t exist.';
              break;
            case 500:
              errorMessage = 'Server Error. Please try again later.';
              break;
            default:
              errorMessage = `Error ${error.status}: ${error.statusText}`;
              break;
          }
        }

        this.snackBar.open(errorMessage, 'Close', {
          duration: 4000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        });

        return throwError(() => new Error(errorMessage));
      })
    );
  }
}
