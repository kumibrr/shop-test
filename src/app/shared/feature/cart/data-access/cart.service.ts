import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Cart } from "../model/cart";
import { map } from "rxjs/operators";
import { Omit } from "src/app/shared/utils/omit";

type CartResponse = Omit<Cart, "products"> & {
  products: Array<{
    productId: number;
    quantity: number;
  }>;
};
@Injectable({
  providedIn: "root",
})
export class CartService {
  constructor(private http: HttpClient) {}

  getCartByUserId(id: number): Observable<CartResponse> {
    return this.http
      .get<CartResponse[]>(`${environment.apiUrl}/carts/user/${id}`)
      .pipe(map((carts) => carts[0]));
  }
}
