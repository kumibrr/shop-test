import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CartComponent } from "./cart.component";
import { RouterModule } from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: ":id",
        component: CartComponent,
      },
    ]),
  ],
  declarations: [CartComponent],
})
export class CartModule {}
