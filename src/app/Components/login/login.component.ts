import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/Services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  isHide = true;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.snackBar.open('Please fill all required fields', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      });
      return;
    }

    this.authService.Login(this.loginForm.value).subscribe({
      next: (response: any) => {
        localStorage.setItem('token', response.accessToken);
        localStorage.setItem('fName', response.firstName);
        localStorage.setItem('lName', response.lastName);
        localStorage.setItem('img', response.image);
       
        this.router.navigate(['/dashboard']);

        this.snackBar.open('Login successful', 'Close', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['success-snackbar']
        });
      },

      error: () => {
        this.snackBar.open('Login failed', 'Close', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        });
      }
    });
  }
}
