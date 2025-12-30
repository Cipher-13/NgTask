import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Icontrol } from 'src/app/Core/Interfaces/icontrol';
import { AuthenticationService } from 'src/app/Services/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    age: new FormControl<number | null>(null, Validators.required),
    phone: new FormControl('', Validators.required),
    birthDate: new FormControl('', Validators.required),
  });

  info: Icontrol = {} as Icontrol;
  userImage: string = '';
  isLoading: boolean = true;

  constructor(
    private myService: AuthenticationService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadCurrentUser();
  }

  loadCurrentUser(): void {
    this.isLoading = true;
    this.userForm.disable();

    this.myService.Current().subscribe({
      next: (res) => {
        if (res) {
          console.log('Current User Data:', res);

          this.info = res;
          this.userForm.patchValue({
            firstName: res.firstName || '',
            lastName: res.lastName || '',
            email: res.email || '',
            age: Number(res.age) || null,
            phone: res.phone || '',
            birthDate: res.birthDate || '',
          });

          this.userImage = res.image || 'https://i.pravatar.cc/150?img=3';
        }

        this.isLoading = false;
        this.userForm.enable();
      },
      error: (err) => {
        console.error('Error loading user:', err);

        this.snackBar.open('Something went wrong', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });

        this.isLoading = false;
        this.userForm.enable();
      }
    });
  }
}
