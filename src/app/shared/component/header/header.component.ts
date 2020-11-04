import { Component, OnInit } from '@angular/core';
import { ResolveEnd, Router } from '@angular/router';
import { CommonService } from '../../services/common.service';
export interface cardData {
  name: string;
  price: number;
  description: string;
  image: string;
  quantity: number;
  id: number;
}
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  product_count: any;
  subscription: any;
  constructor(private router: Router,
    private commonApi: CommonService,
  ) { }

  ngOnInit(): void {
    this.subscription = this.commonApi.product_count.subscribe(res => {

      console.log('product_count', res);
      this.product_count = res;
    });
    console.log("subscription", this.subscription);
  }
  show_card() {
    this.router.navigate(['/admin/card-page']);
  }



}
