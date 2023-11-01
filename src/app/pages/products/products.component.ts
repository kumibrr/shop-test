import { Component, OnInit } from "@angular/core";
import { ProductService } from "../../shared/data-access/product/product.service";
import { Observable } from "rxjs";
import { Product } from "./model/product";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"],
})
export class ProductsComponent implements OnInit {
  products$: Observable<Product[]>;

  constructor(private products: ProductService) {}

  ngOnInit() {
    this.products$ = this.products.getProducts();
  }

  itemSelected(id: number) {
    console.log(id);
  }
}
