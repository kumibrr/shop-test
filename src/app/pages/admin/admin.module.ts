import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminComponent } from "./admin.component";
import { RouterModule } from "@angular/router";
import { CartModule } from "src/app/shared/feature/cart/cart.module";

@NgModule({
  imports: [
    CommonModule,
    CartModule,
    RouterModule.forChild([
      {
        path: "",
        component: AdminComponent,
      },
    ]),
  ],
  declarations: [AdminComponent],
})
export class AdminModule {}
