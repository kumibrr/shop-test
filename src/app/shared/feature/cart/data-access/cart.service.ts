import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Cart } from "../model/cart";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class CartService {
  constructor(private http: HttpClient) {}

  getCartByUserId(id: number): Observable<Cart> {
    return this.http
      .get<Cart[]>(`${environment.apiUrl}/carts/user/${id}`)
      .pipe(map((carts) => carts[0]));
  }
}
