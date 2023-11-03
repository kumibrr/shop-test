import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../data-access/auth/auth.service";
import { map, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AdminGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.auth.loggedUser$.pipe(
      map((user) => {
        if (typeof user !== "boolean") {
          return user.id === 1;
        }
      }),
      tap((isAdmin) => {
        if (!isAdmin) {
          this.router.navigate(["/"]);
        }
      })
    );
  }
}
