import { Component, ElementRef, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../../core/services/api.service';
import { environment } from '../../../../../environments/environment.development'
@Component({
  selector: 'app-add-product',
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
  ],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent {
  productForm: FormGroup;
  ProductId!: any
  categories!: Array<any>;
  tag!: Array<any>;
  constructor(private fb: FormBuilder, private apiService: ApiService, private _snackBar: MatSnackBar, private route: ActivatedRoute, private router: Router) {
    this.ProductId = this.route.snapshot.queryParamMap.get('id');
    if (this.ProductId) {
      this.editProduct()
    }
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      tag: [],
      category: [],
      imageUrl: [''],
      image: [''],
      inStock: []
    });
    apiService.getAllCategory().subscribe((res: any) => {
      this.categories = res.data;
    })
    apiService.getTag().subscribe((res: any) => {
      this.tag = res.data;
    })
  }
  editProduct(): void {
    this.apiService.getOneProduct(this.ProductId).subscribe((res: any) => {
      this.productForm.patchValue(res.data);
      this.previewUrl = environment.IMAGE_URL + res.data.image;
      this.selectedFile = res.data.image;
    }, (e: any) => {
      this.openSnackBar(e.message);
    })
  }
  updateProduct(formValue: any) {
    this.apiService.updateProduct(this.ProductId, formValue).subscribe((res: any) => {
      this.openSnackBar(res.message)
      this.router.navigate(['./admin/products'])
    }, (e: any) => {
      this.openSnackBar(e.message);
    })
  }
  onSubmit(): void {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched()
      return;
    }
    const formValue = this.getFormValue();
    if (this.ProductId) {
      this.updateProduct(formValue)
    } else {
      this.apiService.addProduct(formValue).subscribe((res: any) => {
        this.productForm.reset();
        this.router.navigate(['./admin/products'])
        this.openSnackBar(res.message)
      }, (e: any) => {
        console.log(e);
        this.openSnackBar(e)
      })
    }
  }
  selectedFile: any;
  previewUrl: string | ArrayBuffer | null = null;
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.createImagePreview(this.selectedFile);
    } else {
      this.selectedFile = null;
      this.previewUrl = null;
    }
  }
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  createImagePreview(file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl = reader.result;
    };
    reader.readAsDataURL(file);
  }
  getFormValue() {
    const formValue = this.productForm.getRawValue();
    formValue['image'] = this.selectedFile;
    const formData = new FormData();
    for (let data of Object.keys(formValue)) {
      if (data == 'inStock') {
        const value = formValue[data] == true ? 1 : 0
        formData.append(data, value.toString());
      } else {
        formData.append(data, formValue[data]);
      }
    }
    return formData
  }
  openSnackBar(message: any) {
    this._snackBar.open(message, '', { duration: 3000 });
  }
}
