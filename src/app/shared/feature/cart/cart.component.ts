import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BehaviorSubject, Observable, forkJoin } from "rxjs";
import { Cart } from "./model/cart";
import { CartService } from "./data-access/cart.service";
import { map, mergeMap, switchMap, tap } from "rxjs/operators";
import { ProductService } from "../../data-access/product/product.service";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"],
})
export class CartComponent implements OnInit {
  cart$: Observable<Cart>;
  total$: BehaviorSubject<number> = new BehaviorSubject(null);
  constructor(
    private route: ActivatedRoute,
    private carts: CartService,
    private products: ProductService
  ) {}

  ngOnInit() {
    this.cart$ = this.route.params.pipe(
      switchMap(({ id }) => this.carts.getCartByUserId(id)),
      mergeMap((cart) => {
        const productObservables = cart.products.map(
          ({ productId, quantity }) =>
            this.products
              .getProductById(productId)
              .pipe(map((product) => ({ ...product, quantity })))
        );

        return forkJoin(productObservables).pipe(
          map((products) => ({
            ...cart,
            products: products,
          }))
        );
      }),
      tap((cart) =>
        this.total$.next(
          cart.products.reduce((acc, { price }) => acc + price, 0)
        )
      )
    );
  }
}
