import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { AddEditComponent } from './Components/add-edit/add-edit.component';
import { SharedModule } from 'src/app/Shared/shared/shared.module';


@NgModule({
  declarations: [
    ProductsComponent,
    AddEditComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProductsRoutingModule
  ]
})
export class ProductsModule { }
