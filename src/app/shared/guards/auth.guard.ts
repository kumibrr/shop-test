import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../data-access/auth/auth.service";
import { map, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.auth.getLoggedUser().pipe(
      map((user) => (user ? true : false)),
      tap((loggedIn) => {
        if (!loggedIn) {
          this.router.navigate(["/login"]);
        }
      })
    );
  }
}
