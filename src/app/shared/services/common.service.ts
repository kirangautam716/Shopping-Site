import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  card_list = [];
  private messageSource = new BehaviorSubject(null);
  private p_count = new BehaviorSubject(null);
  product_count = this.p_count.asObservable();
  currentMessage = this.messageSource.asObservable();
  constructor() { }



  changeMessage(data: any) {
    this.card_list.push(data);
    this.p_count.next(this.card_list.length);
    this.messageSource.next(this.card_list);
    console.log(this.messageSource, this.card_list);
  }
}