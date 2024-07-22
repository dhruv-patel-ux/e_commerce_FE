import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CurrencyPipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../../../core/services/api.service';
import { Router } from '@angular/router';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  imageUrl: string;
  inStock: boolean;
}
@Component({
  selector: 'app-product-management',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatCheckboxModule,
    CurrencyPipe
  ],
  templateUrl: './product-management.component.html',
  styleUrl: './product-management.component.scss'
})
export class ProductManagementComponent {
  displayedColumns: string[] = ['id', 'name', 'price', 'category', 'inStock', 'actions'];
  dataSource!: MatTableDataSource<Product>;


  products: Product[] = [
  ];

  categories: string[] = ['Electronics', 'Clothing', 'Books', 'Home & Garden', 'Toys'];
  tags: string[] = ['computer', 'tech', 'apparel', 'casual', 'fiction', 'paperback'];

  constructor(private apiService: ApiService, private _snackBar: MatSnackBar, private router: Router) {
    this.getProduct()
  }

  getProduct() {
    this.apiService.getProduct().subscribe((res: any) => {
      this.dataSource = new MatTableDataSource(res.data);
      console.log(res);
    })
  }
  AddEdit() {
    this.router.navigate(['./admin/products/add'])
  }
  editProduct(id: any): void {
    this.router.navigate(['./admin/products/add'], {
      queryParams: { id }
    })
  }

  deleteProduct(id: any): void {
    this.apiService.deleteProduct(id).subscribe((res: any) => {
      this.openSnackBar(res.message);
      this.getProduct()
    }, (e: any) => {
      this.openSnackBar(e);
    })
  }

  openSnackBar(message: any) {
    this._snackBar.open(message, '', { duration: 3000 });
  }
}
