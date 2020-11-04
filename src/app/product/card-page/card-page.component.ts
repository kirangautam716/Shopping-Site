import { Component, OnInit, ViewChild, TemplateRef } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { CommonService } from 'src/app/shared/services/common.service';
export interface cardData {
  name: string;
  price: number;
  description: string;
  image: string;
  quantity: number;
  id: number;
  subtotal: number;
}
import { MatDialog } from "@angular/material";
import { ProductService } from 'src/app/shared/services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-page',
  templateUrl: './card-page.component.html',
  styleUrls: ['./card-page.component.scss']
})
export class CardPageComponent implements OnInit {
  ProductCardForm: FormGroup;
  Vat: number = 10;
  Discount: number = 10;
  CardList: cardData[] = [];
  message: any;
  subscription: any;
  productList: [];
  product_count: number = 0;

  @ViewChild("myDialog", { static: true }) myDialog: TemplateRef<any>;
  constructor(
    private formBuilder: FormBuilder,
    private commonApi: CommonService,
    public dialog: MatDialog,
    private product: ProductService,
    private router: Router
  ) { }

  ngOnInit() {
    this.subscription = this.commonApi.currentMessage.subscribe(res => {
      this.message = res;
      if (this.message != null) {
        this.AddProductInCard();
      }
    });
    console.log("CardList", this.CardList);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }



  reset_form() {
    this.ProductCardForm = this.formBuilder.group({
      quantity: [1],
      sub_total: [null],
      vat: [null],
      discount: [null],
      total: [null],
    });
  }


  AddProductInCard() {
    if (this.CardList.length > 0) {
      let count: number = 0;
      for (let i = 0; i < this.CardList.length; i++) {
        if (this.message.name == this.CardList[i].name) {
          count++;
          this.CardList[i].quantity = this.CardList[i].quantity + 1;
          this.CardList[i].subtotal = (this.CardList[i].subtotal * this.CardList[i].quantity);
          break;
        }
      }
      if (count == 0) {
        this.saveProduct();
      }
    } else {
      this.saveProduct();
    }
  }

  saveProduct() {
    let obj = {
      id: this.message.id,
      name: this.message.name,
      price: Number(this.message.price),
      description: this.message.description,
      image: this.message.image,
      quantity: 1,
      subtotal: Number(this.message.price)
    }
    this.CardList.push(obj);
    // this.commonApi.updateNoofProduct(this.CardList.length);
  }

  ProcessSales() {
    this.dialog.open(this.myDialog);
  }
  BackToProduct() {
    this.router.navigate(['/admin/product-list']);
  }




  count_product(data, index) {
    for (let i = 0; i <= data.length; i++) {
      if (index == i) {
        this.product_count = data[index].quantity;
      }
    }

  }


  IncreaseQuantity(index) {
    this.CardList[index].quantity = this.CardList[index].quantity + 1;
    this.CardList[index].subtotal = this.CardList[index].price * this.CardList[index].quantity;
    // this.ProductCardForm.controls['quantity'].setValue(this.CardList[index].quantity + 1);
    this.count_product(this.CardList, index);
    // this.commonApi.updateNoofProduct(this.product_count);

  }
  DecreaseQunatity(index) {
    this.CardList[index].quantity = this.CardList[index].quantity - 1;
    this.CardList[index].subtotal = this.CardList[index].price * this.CardList[index].quantity;
    // this.ProductCardForm.controls['quantity'].setValue(this.CardList[index].quantity - 1);
    if (this.CardList[index].quantity == 0) {
      if (index > -1) {
        this.CardList.splice(index, 1);
      }
    }
    this.count_product(this.CardList, index);
    // this.commonApi.updateNoofProduct(this.product_count);
  }
  RemoveProduct(index) {
    this.CardList.splice(index, 1);
    this.ProductCardForm.controls['quantity'].setValue(0);
  }

  getCardSubTotal() {
    var numbers = this.CardList.map(i => i.subtotal);
    var sum = numbers.reduce((a, b) => a + b, 0);
    return sum;
  }

  calculateVat() {
    let subtotal: number = this.getCardSubTotal();
    let vat = (subtotal / 100) * this.Vat;
    return vat;
  }
  calculatedDiscount() {
    let subtotal: number = this.getCardSubTotal();
    let discount = (subtotal / 100) * this.Discount;
    return discount;
  }

  calcualateGrandTotal() {
    let subtotal: number = this.getCardSubTotal();
    let vat: number = this.calculateVat();
    let discount: number = this.calculatedDiscount();
    let grandToral: number = 0;
    if (vat > discount) {
      grandToral = subtotal + vat - discount;
    } else {
      grandToral = subtotal + discount - vat;
    }
    return grandToral;
  }
}



