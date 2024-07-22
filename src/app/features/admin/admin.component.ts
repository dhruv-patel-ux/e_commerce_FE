import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    RouterLink,
    MatButtonModule,
    RouterOutlet,
    MatButtonModule, MatMenuModule
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {

  navItems = [
    { name: 'Dashboard', icon: 'dashboard', route: '/admin' },
    { name: 'Category', icon: 'inventory_2', route: '/admin/category' },
    { name: 'Tags', icon: 'inventory_2', route: '/admin/tag' },
    { name: 'Products', icon: 'inventory_2', route: '/admin/products' },
    { name: 'Orders', icon: 'shopping_cart', route: '/admin/orders' },
    { name: 'Customers', icon: 'people', route: '/admin/customers' },
    // { name: 'Analytics', icon: 'bar_chart', route: '/admin/analytics' },
    { name: 'Settings', icon: 'settings', route: '/admin/settings' },
  ];
  constructor(private router: Router) { }
  logout() {
    localStorage.setItem('user', '')
    localStorage.setItem('access_token', '');
    this.router.navigate(['./'])
  }
}
