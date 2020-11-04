import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from "./product.component";
import { ProductListComponent } from "./product-list/product-list.component";
import { CardPageComponent } from "./card-page/card-page.component";
const routes: Routes = [
  {
    path: '', component: ProductComponent,
    children: [
      { path: "", pathMatch: "full", redirectTo: "product-list" },
      {
        path: "product-list",
        pathMatch: "full",
        component: ProductListComponent
      },
      {
        path: "card-page",
        pathMatch: "full",
        component: CardPageComponent
      }
    ]
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }