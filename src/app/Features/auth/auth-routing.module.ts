import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { HomeComponent } from './Components/home/home.component';
import { AuthGuard } from 'src/app/Core/Guards/logged.guard';

const routes: Routes = [
  { path: '', component: AuthComponent, pathMatch: 'full' },
  {
    path: 'dashboard',
    component: HomeComponent,
   // canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
