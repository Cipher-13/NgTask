import { Component, OnInit, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProductsService } from 'src/app/Services/products.service';
import { Iproduct } from 'src/app/Core/Interfaces/iproduct';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns: string[] = ['id','title','description','category','price','actions'];
  dataSource = new MatTableDataSource<Iproduct>();
  subscription!: Subscription;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private productsService: ProductsService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator; // ربط paginator بالـ table
  }

  loadProducts() {
    this.subscription = this.productsService.List().subscribe({
      next: (res: any) => {
        console.log('API Response:', res);
        this.dataSource.data = res.products; // bind data
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

  onDelete(product: Iproduct): void {
  if (!product?.id) return;

  this.productsService.Eraser(product.id).subscribe({
    next: () => {
      // SnackBar success
      this.snackBar.open(
        'Product deleted successfully',
        'Close',
        {
          duration: 3000,
          panelClass: ['success-snackbar']
        }
      );

      this.dataSource.data = this.dataSource.data.filter(
        p => p.id !== product.id
      );
    },
    error: (error) => {
      console.error('Delete failed:', error);

      this.snackBar.open(
        'Failed to delete product',
        'Close',
        {
          duration: 3000,
          panelClass: ['error-snackbar']
        }
      );
    }
  });
}


  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
