import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  BASE_URL = environment.BASE_URL
  constructor(private http: HttpClient) { }
  login(body: any) {
    return this.http.post(this.BASE_URL + 'auth/login', body)
  }
  getAllCustomer() {
    return this.http.get(this.BASE_URL + 'users')
  }
  createUser(body: any) {
    return this.http.post(this.BASE_URL + 'users', body)
  }

  // CATEGORY
  addCategory(body: any) {
    return this.http.post(this.BASE_URL + 'category', body)
  }
  getAllCategory() {
    return this.http.get(this.BASE_URL + 'category')
  }
  getOneCategory(id: any) {
    return this.http.get(this.BASE_URL + 'category/' + id)
  }
  updateCategory(id: any, body: any) {
    return this.http.patch(this.BASE_URL + 'category/' + id, body)
  }
  deleteCategory(id: any) {
    return this.http.delete(this.BASE_URL + 'category/' + id)
  }

  // TAG
  addTag(body: any) {
    return this.http.post(this.BASE_URL + 'tag', body)
  }
  getTag() {
    return this.http.get(this.BASE_URL + 'tag')
  }
  getOneTag(id: any) {
    return this.http.get(this.BASE_URL + 'tag/' + id)
  }
  updateTag(id: any, body: any) {
    return this.http.patch(this.BASE_URL + 'tag/' + id, body)
  }
  deleteTag(id: any) {
    return this.http.delete(this.BASE_URL + 'tag/' + id)
  }

  // PRODUCT
  addProduct(body: any) {
    return this.http.post(this.BASE_URL + 'product', body)
  }
  getProduct() {
    return this.http.get(this.BASE_URL + 'product')
  }
  getOneProduct(id: any) {
    return this.http.get(this.BASE_URL + 'product/' + id)
  }
  updateProduct(id: any, body: any) {
    return this.http.patch(this.BASE_URL + 'product/' + id, body)
  }
  deleteProduct(id: any) {
    return this.http.delete(this.BASE_URL + 'product/' + id)
  }

  // CART
  addCart(body: any) {
    return this.http.post(this.BASE_URL + 'cart', body)
  }
  getCart() {
    return this.http.get(this.BASE_URL + 'cart')
  }
  getOneCart(id: any) {
    return this.http.get(this.BASE_URL + 'cart/' + id)
  }
  updateCart(id: any, body: any) {
    return this.http.patch(this.BASE_URL + 'cart/' + id, body)
  }
  deleteCart(id: any) {
    return this.http.delete(this.BASE_URL + 'cart/' + id)
  }

  // CART
  addReview(body: any) {
    return this.http.post(this.BASE_URL + 'review', body)
  }
  getReview() {
    return this.http.get(this.BASE_URL + 'review')
  }
  // getOneCart(id: any) {
  //   return this.http.get(this.BASE_URL + 'cart/' + id)
  // }
  // updateCart(id: any, body: any) {
  //   return this.http.patch(this.BASE_URL + 'cart/' + id, body)
  // }
  // deleteCart(id: any) {
  //   return this.http.delete(this.BASE_URL + 'cart/' + id)
  // }
  // CHACKOUT
  createCheckoutSession(body: any) {
    console.log(body);

    return this.http.post(this.BASE_URL + 'payment-gatways/create-checkout-session', body)
  }
  verifySession(id: any) {
    return this.http.get(this.BASE_URL + 'payment-gatways/verify-checkout-session?id=' + id)
  }
  getAllOrders() {
    return this.http.get(this.BASE_URL + 'payment-gatways/get-orders')
  }
  updateOrderStatus(id: any, status: any) {

    return this.http.patch(this.BASE_URL + 'payment-gatways/' + id, { status })
  }
  getMyOrders() {
    return this.http.get(this.BASE_URL + 'payment-gatways/get-my-orders')
  }
  // DASHBOARD

  getDashboard() {
    return this.http.get(this.BASE_URL + 'auth/dashboard')
  }
}

