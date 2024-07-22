import { Component } from '@angular/core';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ApiService } from '../../../core/services/api.service';
import {
  MatSnackBar,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';

interface Category {
  id: number;
  name: string;
  description: string;
}
@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
  displayedColumns: string[] = ['id', 'name', 'description', 'actions'];
  dataSource!: MatTableDataSource<Category>;
  categoryForm!: FormGroup;
  categories: Category[] = [];
  constructor(private apiService: ApiService, private _snackBar: MatSnackBar, private router: Router) {
    this.getCategory()
  }

  getCategory() {
    this.apiService.getAllCategory().subscribe((res: any) => {
      this.dataSource = new MatTableDataSource(res.data);
      console.log(res);
    })
  }
  AddEdit() {
    this.router.navigate(['./admin/category/add'])
  }
  editCategory(id: any): void {
    this.router.navigate(['./admin/category/add'], {
      queryParams: { id }
    })
  }

  deleteCategory(id: any): void {
    this.apiService.deleteCategory(id).subscribe((res: any) => {
      this.openSnackBar(res.message);
      this.getCategory()
    }, (e: any) => {
      this.openSnackBar(e);
    })
  }

  openSnackBar(message: any) {
    this._snackBar.open(message, '', { duration: 3000 });
  }
}
