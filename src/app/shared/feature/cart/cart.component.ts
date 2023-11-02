import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { BehaviorSubject, Observable, Subject, noop } from "rxjs";
import { Cart } from "./model/cart";
import { CartService } from "./data-access/cart.service";
import { switchMap, takeUntil, tap } from "rxjs/operators";
import { Product } from "src/app/pages/products/model/product";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"],
})
export class CartComponent implements OnInit, OnDestroy {
  @Input("userId") id;
  cart$: Observable<Cart>;
  total$ = new BehaviorSubject<number>(null);
  private readonly destroy$ = new Subject<boolean>();

  constructor(private carts: CartService) {}

  ngOnInit(): void {
    this.cart$ = this.carts
      .getCartByUserId(this.id)
      .pipe(
        tap(({ products }) =>
          this.total$.next(
            products.reduce(
              (acc, { price, quantity }) => acc + price * quantity,
              0
            )
          )
        )
      );
  }

  updateQuantity(product: Product, quantity: string) {
    this.carts
      .updateItemQuantity(product.id, Number(quantity))
      .pipe(takeUntil(this.destroy$))
      .subscribe(noop);
  }

  removeItem(id: number) {
    this.carts
      .removeItemFromCart(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(noop);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
