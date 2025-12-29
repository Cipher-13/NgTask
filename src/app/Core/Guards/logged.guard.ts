import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');

    if (token) {
      return true;
    } else {
      this.snackBar.open('Unauthorized access!', 'Close', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['error-snackbar']
      });

      this.router.navigate(['/auth']);
      return false;
    }
  }
}
