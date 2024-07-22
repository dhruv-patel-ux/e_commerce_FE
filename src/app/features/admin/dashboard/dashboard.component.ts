import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    CurrencyPipe,
    RouterLink
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  orders: any;
  users: any;
  revenue: any;
  product: any;
  recentOrders = [];
  constructor(private apiService: ApiService) {
    apiService.getAllOrders().subscribe((res: any) => {
      this.recentOrders = res.data
    });
    apiService.getDashboard().subscribe((res: any) => {
      console.log(res);
      this.orders = res.data.orders
      this.users = res.data.users;
      this.revenue = res.data.revenue;
      this.product = res.data.product;
    })
  }
}
