import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminComponent } from "./admin.component";
import { RouterModule } from "@angular/router";
import { CartModule } from "src/app/shared/feature/cart/cart.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UserRowComponent } from "./ui/user-row/user-row.component";
import { EditUserRowComponent } from "./ui/edit-user-row/edit-user-row.component";

@NgModule({
  imports: [
    CommonModule,
    CartModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: "",
        component: AdminComponent,
      },
    ]),
  ],
  declarations: [AdminComponent, UserRowComponent, EditUserRowComponent],
})
export class AdminModule {}
