import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, forkJoin, of } from "rxjs";
import { environment } from "src/environments/environment";
import { Cart } from "../model/cart";
import { map, mergeMap, switchMap, tap } from "rxjs/operators";
import { Omit } from "src/app/shared/utils/omit";
import { ProductService } from "src/app/shared/data-access/product/product.service";

export type CartResponse = Omit<Cart, "products"> & {
  products: Array<{
    productId: number;
    quantity: number;
  }>;
};
@Injectable({
  providedIn: "root",
})
export class CartService {
  private cartBehaviorSubject = new BehaviorSubject<CartResponse>(null);

  private cart$: Observable<Cart> = this.cartBehaviorSubject.pipe(
    mergeMap((cart) => {
      const productObservables = cart.products.map(({ productId, quantity }) =>
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
    })
  );

  constructor(private http: HttpClient, private products: ProductService) {}

  getCartByUserId(id: number): Observable<Cart> {
    return this.http
      .get<CartResponse[]>(`${environment.apiUrl}/carts/user/${id}`)
      .pipe(
        map((carts) => carts[0]),
        switchMap((cart) => {
          if (!cart) {
            return this.createCart(id);
          }
          return of(cart);
        }),
        tap((cart) => this.cartBehaviorSubject.next(cart)),
        map(() => this.cart$),
        mergeMap((r) => r)
      );
  }

  updateItemQuantity(
    id: number,
    newQuantity: number
  ): Observable<CartResponse> {
    const { products, ...cart } = this.cartBehaviorSubject.value;
    const updatedCart = {
      ...cart,
      products: products.map((product) =>
        product.productId === id
          ? { productId: id, quantity: newQuantity }
          : product
      ),
    };
    return this.http
      .put<CartResponse>(`${environment.apiUrl}/carts/${cart.id}`, {
        ...updatedCart,
      })
      .pipe(tap((cart) => this.cartBehaviorSubject.next(cart)));
  }

  removeItemFromCart(id: number): Observable<CartResponse> {
    const { products, ...cart } = this.cartBehaviorSubject.value;
    return this.http
      .put<CartResponse>(`${environment.apiUrl}/carts/${cart.id}`, {
        ...cart,
        products: products.filter((i) => i.productId !== id),
      })
      .pipe(tap((cart) => this.cartBehaviorSubject.next(cart)));
  }

  createCart(id: number): Observable<CartResponse> {
    return this.http.post<CartResponse>(`${environment.apiUrl}/carts/`, {
      date: new Date(),
      products: [],
      userId: id,
    });
  }
}
