import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthenticationService } from './Services/authentication.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
loginForm: FormGroup;
  IsHide: boolean = true;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private myService: AuthenticationService,
    private routeTo: Router,
  ) {
    this.loginForm = this.fb.group({
      username: [null, [Validators.required]], //emilys
      password: [null, [Validators.required, Validators.minLength(5)]] //emilyspass
    });
  }

  onSubmit(form: FormGroup) {
    if (form.valid) {

      this.myService.Login(form.value).subscribe({  //form.value = inputs
        next: (response) => {
          localStorage.setItem('token', response.accessToken) // storing token first of all - remove on logout later (34an el guard matboz4)
          localStorage.setItem('fName', response.firstName)
          localStorage.setItem('lName', response.lastName)
          localStorage.setItem('img', response.image)
          this.routeTo.navigate(['auth/dashboard']);
          this.snackBar.open('Login successful ', 'Close', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['success-snackbar']
          });
          //console.log(response);
        },
        error: (err) => {
          this.snackBar.open('Login failed ', 'Close', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['error-snackbar']
          });
          //console.error(err);
        },
        complete: () => {
            this.loginForm.reset();
        },
      });

    } else {
      form.markAllAsTouched();
      this.snackBar.open('Please fill all required fields ', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      });
    }
  }
}
