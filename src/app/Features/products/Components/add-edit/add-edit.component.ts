import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Iproduct } from 'src/app/Core/Interfaces/iproduct';
import { ProductsService } from 'src/app/Services/products.service';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent implements OnInit {
  productForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(2)]),
    category: new FormControl('', [Validators.required]),
    price: new FormControl<number | null>(null, [Validators.required, Validators.min(0)]),
    description: new FormControl('', Validators.required),
  });

  categories: string[] = []; // Array to hold unique categories

  constructor(
    private productsService: ProductsService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.productsService.List().subscribe({
      next: (res: any) => {
        // Extract all unique categories from products
        const allCategories = res.products.map((p: Iproduct) => p.category);
        this.categories = Array.from(new Set(allCategories));

        // Optional: set first category as default
        if (this.categories.length > 0) {
          this.productForm.patchValue({ category: this.categories[0] });
        }
      },
      error: (err) => {
        console.error('Failed to load categories:', err);
        this.snackBar.open('Failed to load categories', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }

  onSubmit(): void {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      this.snackBar.open('Please fill all required fields', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
      return;
    }

    const productData = this.productForm.value as Iproduct;

    this.productsService.Maker(productData).subscribe({
      next: () => {
        this.snackBar.open('Product added successfully', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
        this.productForm.reset();
      },
      error: (err) => {
        console.error('API Error:', err);
        this.snackBar.open('Something went wrong', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }
}
