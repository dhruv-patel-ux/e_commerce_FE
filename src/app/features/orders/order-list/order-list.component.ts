import { Component } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { ApiService } from '../../../core/services/api.service';
import { MatTableModule } from '@angular/material/table';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { MatDivider } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [
    MatExpansionModule,
    MatTableModule,
    DatePipe,
    MatDivider,
    CurrencyPipe,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.scss'
})
export class OrderListComponent {
  orders: any[] = [];
  loading = true;
  error: string | null = null;

  constructor(private orderService: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.loadOrders();
  }
  review(id: any) {
    this.router.navigate(['/review'], {
      queryParams: { id }
    })
  }
  loadOrders(): void {
    this.loading = true;
    this.orderService.getMyOrders().subscribe(
      (res: any) => {
        this.orders = res.data;
        this.loading = false;
      },
      (error) => {
        this.error = 'Failed to load orders. Please try again later.';
        this.loading = false;
        console.error('Error loading orders:', error);
      }
    );
  }
}
