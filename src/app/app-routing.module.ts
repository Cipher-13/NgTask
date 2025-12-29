import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './Core/Guards/logged.guard';

const routes: Routes = [
  {path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'auth',
    loadChildren: () => import('./Features/auth/auth.module').then(m => m.AuthModule)
  },
  { path: 'products',
    loadChildren: () => import('./Features/products/products.module').then(m => m.ProductsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
