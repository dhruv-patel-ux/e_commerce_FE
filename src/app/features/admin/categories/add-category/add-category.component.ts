import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { ApiService } from '../../../../core/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.scss'
})
export class AddCategoryComponent {
  categoryForm!: FormGroup;
  categoryId!: any
  constructor(private fb: FormBuilder, private apiService: ApiService, private _snackBar: MatSnackBar, private route: ActivatedRoute, private router: Router) {
    this.categoryId = this.route.snapshot.queryParamMap.get('id');
    if (this.categoryId) {
      this.editCategory()
    }
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }
  editCategory(): void {
    this.apiService.getOneCategory(this.categoryId).subscribe((res: any) => {
      this.categoryForm.patchValue(res.data)
    }, (e: any) => {
      this.openSnackBar(e);
    })
  }
  updateCategory() {
    const formValue = this.categoryForm.getRawValue()
    this.apiService.updateCategory(this.categoryId, formValue).subscribe((res: any) => {
      this.openSnackBar(res.message)
      this.router.navigate(['./admin/category'])
    }, (e: any) => {
      this.openSnackBar(e);
    })
  }
  onSubmit(): void {
    if (this.categoryForm.invalid) {
      this.categoryForm.markAllAsTouched()
      return;
    }
    if (this.categoryId) {
      this.updateCategory()
    } else {
      const formValue = this.categoryForm.getRawValue()
      this.apiService.addCategory(formValue).subscribe((res: any) => {
        this.openSnackBar(res.message)
        this.categoryForm.reset();
        this.router.navigate(['./admin/category'])
      }, (e: any) => {
        console.log(e);
        this.openSnackBar(e)
      })
    }
  }
  openSnackBar(message: any) {
    this._snackBar.open(message, '', { duration: 3000 });
  }
}
