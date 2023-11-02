import { Component, OnInit } from "@angular/core";
import { ProductService } from "../../shared/data-access/product/product.service";
import { Observable, Subject } from "rxjs";
import { Product } from "./model/product";
import { AuthService } from "src/app/shared/data-access/auth/auth.service";
import { map } from "rxjs/operators";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"],
})
export class ProductsComponent implements OnInit {
  products$: Observable<Product[]>;
  userId$: Observable<number>;
  showDialog = false;

  constructor(private products: ProductService, private auth: AuthService) {
    this.userId$ = this.auth.loggedUser$.pipe(
      map((user) => {
        if (typeof user !== "boolean") {
          return user.id;
        }
      })
    );
  }

  ngOnInit() {
    this.products$ = this.products.getProducts();
  }

  toggleDialog() {
    this.showDialog = !this.showDialog;
  }

  itemSelected(id: number) {
    console.log(id);
  }
}
