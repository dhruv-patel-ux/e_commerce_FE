import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CurrencyPipe } from '@angular/common';
import { environment } from '../../../environments/environment.development';
import { ApiService } from '../../core/services/api.service';
import { Router, RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatBadgeModule,
    MatMenuModule,
    MatListModule,
    MatSelectModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    CurrencyPipe,
    RouterLink
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  // products: any[] = [];
  products: any[] = [
    // Add sample products here
  ];

  categories: any[] = [];

  selectedCategory: string = 'all';
  cartItems: any[] = [];
  user: any;
  CartToggle: boolean = false;
  constructor(private apiService: ApiService, private _snackBar: MatSnackBar, private router: Router) {
    const localUser = localStorage.getItem('user');
    this.user = localUser && JSON.parse(localUser)
  }
  getImage(src: any) {
    return environment.IMAGE_URL + src
  }
  ngOnInit(): void {
    this.apiService.getProduct().subscribe((res: any) => {
      this.products = res.data;
    })
    this.apiService.getAllCategory().subscribe((res: any) => {
      this.categories = res.data;
    });

  }

  onCategoryChange(category: string): void {
    this.selectedCategory = category;
  }

  filteredProducts(): any[] {
    return this.selectedCategory === 'all'
      ? this.products
      : this.products.filter(p => p.category === this.selectedCategory);
  }

  addToCart(product: any): void {
    console.log(this.user);

    if (this.user) {
      this.apiService.addCart({ productId: product.id, quantity: 1 }).subscribe((res: any) => {
        this.openSnackBar(res.message);
        this.router.navigate(['/cart'])
      }, (e: any) => {
        this.openSnackBar(e.message)
      })
      this.cartItems.push(product);
    } else {
      this.openSnackBar("Please Login!")
    }
  }

  openSnackBar(message: any) {
    this._snackBar.open(message, '', { duration: 3000 });
  }
  
  logout() {
    localStorage.setItem('user', '');
    localStorage.setItem('access_token', '');
    this.router.navigate(['/login'])
  }
}
