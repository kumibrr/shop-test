import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { Cart } from "./model/cart";
import { CartService } from "./data-access/cart.service";
import { switchMap } from "rxjs/operators";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"],
})
export class CartComponent implements OnInit {
  carts$: Observable<Cart[]>;
  constructor(private route: ActivatedRoute, private carts: CartService) {}

  ngOnInit() {
    this.carts$ = this.route.params.pipe(
      switchMap(({ id }) => this.carts.getCartByUserId(id))
    );
    this.carts$.subscribe((r) => console.log(r));
  }
}
