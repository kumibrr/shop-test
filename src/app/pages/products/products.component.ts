import { Component, OnInit } from "@angular/core";
import { ProductsService } from "./data-access/products.service";
import { Observable } from "rxjs";
import { Product } from "./model/product";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"],
})
export class ProductsComponent implements OnInit {
  products$: Observable<Product[]>;

  constructor(private products: ProductsService) {}

  ngOnInit() {
    this.products$ = this.products.getProducts();
  }
}
