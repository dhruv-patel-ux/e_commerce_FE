import { CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ApiService } from '../../../core/services/api.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
interface Order {
  id: number;
  customerName: string;
  orderDate: Date;
  total: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered';
}
@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CurrencyPipe, DatePipe, NgClass, MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatMenuModule,
    MatSelectModule,
    FormsModule
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {
  orderStatus = [{ name: 'Pending', value: "pending" }, { name: 'Processing', value: "processing" }, { name: 'Shipped', value: "shipped" }, { name: 'Delivered', value: "delivered" },]
  displayedColumns: string[] = ['id', 'customerName', 'orderDate', 'total', 'status', 'actions'];
  dataSource!: MatTableDataSource<Order>;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private apiservice: ApiService, private _snackBar: MatSnackBar,) {
    this.getOrders()
  }
  getOrders() {
    this.apiservice.getAllOrders().subscribe((res: any) => {
      this.dataSource = new MatTableDataSource(res.data);
    }, (e: any) => {
      console.log(e);
      this.openSnackBar(e.message)
    })
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'pending': return 'status-pending';
      case 'processing': return 'status-processing';
      case 'shipped': return 'status-shipped';
      case 'complete': return 'status-delivered';
      default: return '';
    }
  }
  editStatus(id: any,event:any) {
    this.apiservice.updateOrderStatus(id, event).subscribe((res: any) => {
      this.getOrders();
      this.openSnackBar(res.message);
    }, (e: any) => { 
      this.openSnackBar(e.message);
    })
  }
  openSnackBar(message: any) {
    this._snackBar.open(message, '', { duration: 3000 });
  }
}
