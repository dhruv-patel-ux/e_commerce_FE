import { Component } from '@angular/core';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ApiService } from '../../../core/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

interface Tag {
  id: number;
  name: string;
  color: string;
}

@Component({
  selector: 'app-tag',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './tag.component.html',
  styleUrl: './tag.component.scss'
})
export class TagComponent {
  displayedColumns: string[] = ['id', 'name', 'color', 'actions'];
  dataSource!: MatTableDataSource<Tag>;
  tags: Tag[] = [];

  constructor(private fb: FormBuilder, private apiService: ApiService, private _snackBar: MatSnackBar, private router: Router) {
    this.getTag();
  }
  getTag() {
    this.apiService.getTag().subscribe((res: any) => {
      this.dataSource = new MatTableDataSource(res.data);
      console.log(res);
    })
  }
  AddEdit() {
    this.router.navigate(['./admin/tag/add'])
  }
  editTag(id: any): void {
    this.router.navigate(['./admin/tag/add'], {
      queryParams: { id }
    })
  }

  deleteTag(id: any): void {
    this.apiService.deleteTag(id).subscribe((res: any) => {
      this.openSnackBar(res.message);
      this.getTag()
    }, (e: any) => {
      this.openSnackBar(e);
    })
  }

  openSnackBar(message: any) {
    this._snackBar.open(message, '', { duration: 3000 });
  }

}
