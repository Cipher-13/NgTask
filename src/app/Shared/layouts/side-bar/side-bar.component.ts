import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/Services/authentication.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  firstName: string = '';
  lastName: string = '';
  sideImg: string = '';
  sideName: string = '';

  constructor(private router: Router, private myService: AuthenticationService) {}

  ngOnInit(): void {
    // Load user info from localStorage
    this.firstName = localStorage.getItem('fName') ?? '';
    this.lastName = localStorage.getItem('lName') ?? '';
    this.sideImg = localStorage.getItem('img') ?? '';
    this.sideName = `${this.firstName} ${this.lastName}`.trim();
  }

  signingOut(): void {
    this.myService.logout();
    this.router.navigate(['/login']);
  }
}
