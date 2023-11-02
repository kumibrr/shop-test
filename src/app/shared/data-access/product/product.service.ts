import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { environment } from "src/environments/environment";
import { Product } from "../../../pages/products/model/product";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  cachedProducts = new Map<number, Product>();
  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http
      .get<Product[]>(`${environment.apiUrl}/products`)
      .pipe(
        tap((products) =>
          products.forEach((p) => this.cachedProducts.set(p.id, p))
        )
      );
  }

  getProductById(id: number): Observable<Product> {
    if (this.cachedProducts.has(id)) {
      return of(this.cachedProducts.get(id));
    }
    return this.http
      .get<Product>(`${environment.apiUrl}/products/${id}`)
      .pipe(tap((product) => this.cachedProducts.set(product.id, product)));
  }
}
