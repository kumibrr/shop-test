import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable, forkJoin } from "rxjs";
import { Cart } from "./model/cart";
import { CartService } from "./data-access/cart.service";
import { map, mergeMap, switchMap } from "rxjs/operators";
import { Product } from "src/app/pages/products/model/product";
import { ProductService } from "../../data-access/product/product.service";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"],
})
export class CartComponent implements OnInit {
  cart$: Observable<Cart>;
  products$: Observable<Product[]>;
  constructor(
    private route: ActivatedRoute,
    private carts: CartService,
    private products: ProductService
  ) {}

  ngOnInit() {
    this.cart$ = this.route.params.pipe(
      switchMap(({ id }) => this.carts.getCartByUserId(id))
    );
    this.products$ = this.cart$.pipe(
      map((cart) =>
        forkJoin([
          ...cart.products.map(({ productId }) =>
            this.products.getProductById(productId)
          ),
        ])
      ),
      mergeMap((r) => r)
    );
    // this.cart$.subscribe((r) => console.log(r));
    this.products$.subscribe((r) => console.log(r));
  }
}
