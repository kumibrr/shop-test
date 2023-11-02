import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProductsComponent } from "./products.component";
import { RouterModule } from "@angular/router";
import { CartModule } from "src/app/shared/feature/cart/cart.module";

@NgModule({
  imports: [
    CommonModule,
    CartModule,
    RouterModule.forChild([
      {
        path: "",
        component: ProductsComponent,
      },
    ]),
  ],
  declarations: [ProductsComponent],
})
export class ProductsModule {}
