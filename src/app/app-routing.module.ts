import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './Core/Guards/logged.guard';
import { LoginComponent } from './Components/login/login.component';
import { HomeComponent } from './Components/home/home.component';
import { ProfileComponent } from './Components/profile/profile.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full' },
  {path: 'login',component: LoginComponent,title: 'Login Page'},
  {
    path: 'dashboard',component: HomeComponent,
    title: 'Homepage',canActivate: [AuthGuard],
    children: [
      {path: '',redirectTo: 'products',pathMatch: 'full'},

      {
        path: 'products',
        loadChildren: () => import('./Features/products/products.module').then(m => m.ProductsModule)
      },

      { path: 'profile', component: ProfileComponent }
    ]
  },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
