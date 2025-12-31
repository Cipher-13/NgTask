import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductsService } from 'src/app/Services/products.service';
import { Iproduct } from 'src/app/Core/Interfaces/iproduct';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  productList: Iproduct[] = [];
  displayedColumns: string[] = [
    'id',
    'title',
    'description',
    'category',
    'price',
    'actions',
  ];
  subscription!: Subscription;

  constructor(
    private productsService: ProductsService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.subscription = this.productsService.List().subscribe({
      next: (res: any) => {
      //console.log('API Response:', res);
        this.productList = res.products;
      },
      error: (err) => {
        this.snackBar.open('Network Error', 'Close', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['error-snackbar'],
        });
      },
    });
  }

  onDelete(product: Iproduct) {
    console.log('Delete clicked for:', product);
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
