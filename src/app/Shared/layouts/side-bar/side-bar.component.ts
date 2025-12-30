import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Load user info from localStorage
    this.firstName = localStorage.getItem('fName') ?? '';
    this.lastName = localStorage.getItem('lName') ?? '';
    this.sideImg = localStorage.getItem('img') ?? '';
    this.sideName = `${this.firstName} ${this.lastName}`.trim();
  }

  signingOut(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
