import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ApiService } from '../../../core/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../../../environments/environment.development';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { loadStripe } from '@stripe/stripe-js';
import { FormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddressModelComponent } from '../address-model/address-model/address-model.component';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatDividerModule,
    MatToolbarModule,
    MatDialogModule
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  cartItems: any[] = [];
  readonly dialog = inject(MatDialog);
  constructor(private apiService: ApiService, private _snackBar: MatSnackBar) { }
  ngOnInit() {
    // In a real application, you would fetch this data from a service
    this.getCart()
  };
  getCart() {
    this.apiService.getCart().subscribe((res: any) => {
      this.cartItems = res.data;
    }, (e: any) => {
      this.openSnackBar(e.message)
    })

  }
  openSnackBar(message: any) {
    this._snackBar.open(message, '', { duration: 3000 });
  }
  updateQuantity(item: any, change: number): void {
    const newQuantity = +item.quantity + change;
    console.log("new quantity", newQuantity);

    if (newQuantity > 0) {
      item.quantity = newQuantity;
      this.apiService.updateCart(item.id, item).subscribe((res: any) => {
        console.log(res);

        this.openSnackBar(res.messgae)
      }, (e: any) => {
        this.openSnackBar(e.message)
      })
    } else {
      this.removeItem(item);
    }
  }
  getImage(src: any) {
    return environment.IMAGE_URL + src
  }
  address: any;
  removeItem(item: any): void {
    this.apiService.deleteCart(item.id).subscribe((res: any) => {
      this.getCart()
      this.openSnackBar(res.message);

    }, (e: any) => {
      this.openSnackBar(e.message)
    })
  }

  getSubtotal(): number {
    return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }
  private stripePromise = loadStripe(
    'pk_test_51PeCmwBOql4w7Rm7h7XtWu3OwTDDfLUjSGgG34SGk34Hl6PXZ2zu918DBON9PZgxsZvTIPGfc5EcgQtMYtHCVqwe00PWLIjUBX'
  );
  async checkout() {
    // Implement checkout logic here
    if (!this.address) {
      this.openSnackBar("Please Enter Address");
      return
    }
    this.getCart();
    const cartItems = this.cartItems.map((res: any) => {
      return { price: res.price, quantity: res.quantity, productId: res.productId }
    })
    const stripe = await this.stripePromise;
    this.apiService.createCheckoutSession({ shippingAddress: this.address, cartItems: cartItems }).subscribe(async (res: any) => {
      const response = await stripe?.redirectToCheckout({
        sessionId: res.id,
      });
    }, (e: any) => { })
    console.log('Proceeding to checkout');
  }
  addAddress() {
    this.dialog.open(AddressModelComponent);
  }
}
