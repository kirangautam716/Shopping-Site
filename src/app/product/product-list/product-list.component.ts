import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/shared/services/common.service';
import { ProductService } from 'src/app/shared/services/product.service';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  productImgList: any;
  subscription: any;
  productList: [];


  constructor(private commonApi: CommonService, private product: ProductService) { }

  message: string;
  ngOnInit() {
    this.getProduct();
  }

  AddNewProduct(data) {
    this.commonApi.changeMessage(data);
    this.commonApi.updateCartProduct(data);
    console.log(data)
  }

  getProduct() {
    this.product.getProductList().subscribe(res => {
      console.log("hhh");
      console.log(res);
      if (res && res['data'] && res['data'].length) {
        this.productList = res['data'];
        console.log(this.productList);
      }
    })
  }
}
