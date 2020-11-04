import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  count: number = 0;
  cart_list = [];
  private messageSource = new BehaviorSubject(null);
  private p_count = new BehaviorSubject(null);
  product_count = this.p_count.asObservable();
  currentMessage = this.messageSource.asObservable();
  constructor() { }

  changeMessage(data: any) {
    this.messageSource.next(data);
    console.log(data);
  }
  // updateNoofProduct(data: any) {
  //   this.p_count.next(data);
  //   console.log(this.p_count);
  // }

  updateCartProduct(data: any) {
    this.cart_list.push({ id: data.id, qty: 1 });
    this.countCartProduct(this.cart_list);
  }
  countCartProduct(data: any) {
    debugger
    let count = 0;
    for (let i = 0; i < data.length; i++) {
      count = count + data[i].qty;
    }
    this.p_count.next(count);
    console.log(count);
  }


}