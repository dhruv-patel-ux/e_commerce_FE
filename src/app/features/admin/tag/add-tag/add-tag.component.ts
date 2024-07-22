import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { ApiService } from '../../../../core/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-tag',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './add-tag.component.html',
  styleUrl: './add-tag.component.scss'
})
export class AddTagComponent {
  tagForm: FormGroup;
 
  tagId!:any;
  constructor(private fb: FormBuilder, private apiService: ApiService, private _snackBar: MatSnackBar, private route: ActivatedRoute, private router: Router) {
    this.tagId = this.route.snapshot.queryParamMap.get('id');
    if (this.tagId) {
      this.editTag()
    }
    this.tagForm = this.fb.group({
        name: ['', Validators.required],
        colour: ['#000000', Validators.required]
      });
  }
  editTag(): void {
    this.apiService.getOneTag(this.tagId).subscribe((res: any) => {
      this.tagForm.patchValue(res.data)
    }, (e: any) => {
      this.openSnackBar(e);
    })
  }
  updateTag() {
    const formValue = this.tagForm.getRawValue();
    this.apiService.updateTag(this.tagId, formValue).subscribe((res: any) => {
      this.openSnackBar(res.message)
      console.log(res);
      
      this.apiService.getTag().subscribe()
      this.router.navigate(['./admin/tag'])
    }, (e: any) => {
      console.log(e);
      this.openSnackBar(e.message);
    })
  }
  onSubmit(): void {
    console.log(this.tagForm);
    if (this.tagForm.invalid) {
      this.tagForm.markAllAsTouched()
      return;
    }
    if (this.tagId) {
      this.updateTag()
    } else {
      const formValue = this.tagForm.getRawValue()
      this.apiService.addTag(formValue).subscribe((res: any) => {
        this.openSnackBar(res.message)
        this.tagForm.reset();
        this.router.navigate(['./admin/tag'])
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
