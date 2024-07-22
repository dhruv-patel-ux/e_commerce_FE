import { Component, EventEmitter, Input, Output } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DatePipe } from '@angular/common';
import { ApiService } from '../../../core/services/api.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    DatePipe,
    MatIconModule,
    MatSnackBarModule
  ],
  templateUrl: './review.component.html',
  styleUrl: './review.component.scss'
})
export class ReviewComponent {
  reviews: any[] = [];
  newReview: any = {
    rating: 0,
    comment: '',
  };
  orderId: any;
  constructor(
    private apiService: ApiService,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {
    this.orderId = this.route.snapshot.queryParamMap.get('id');
    console.log(this.orderId);
    
    this.getReview()
  }

  getReview() {
    this.apiService.getReview().subscribe((res: any) => {
      this.reviews = res.data;
    }, (e) => {
      this.openSnackBar(e.message)
    })
  }
  @Input() rating: number = 0;
  @Output() ratingChange = new EventEmitter<number>();

  hoverRating = 0;
  stars = [1, 2, 3, 4, 5];

  rate(value: number) {
    this.rating = value;
    this.ratingChange.emit(value);
  }
  submitReview() {
    if (this.rating && this.newReview.comment && this.orderId) {
      this.apiService.addReview({ rating: this.rating, comment: this.newReview.comment, orderId: this.orderId }).subscribe((res: any) => {
        this.rating = 0;
        this.newReview.comment = ''
        this.getReview();

        this.openSnackBar(res.message)
      }, (e) => {
        this.openSnackBar(e.message)
      })
    }else{
      this.openSnackBar('Something Wrong!')
    }
  }

  resetNewReview() {
    this.newReview = {
      id: 0,
      username: '',
      rating: 0,
      comment: '',
      date: new Date()
    };
  }

  getStarArray(rating: number): number[] {
    return Array(rating).fill(0);
  }
  openSnackBar(message: any) {
    this._snackBar.open(message, '', { duration: 3000 });
  }
}
