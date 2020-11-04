import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) { }
  url = "https://www.mocky.io/v2/5eda4003330000740079ea60";


  getProductList() {
    return this.http.get(this.url);
  }
}



