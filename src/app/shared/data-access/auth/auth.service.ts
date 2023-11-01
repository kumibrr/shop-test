import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { User } from "../../model/user";
import { jwtDecode } from "jwt-decode";
import { UserService } from "../user/user.service";

type LogInResponse = { token: string };
type Token = { sub: number; user: string; iat: number };

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private token$: BehaviorSubject<string> = new BehaviorSubject(
    (function () {
      const token = localStorage.getItem("auth");
      if (!token) {
        return null;
      }
      return token;
    })()
  );

  loggedUser$: Observable<User | boolean> = this.token$.pipe(
    map((token) => jwtDecode<Token>(token)),
    switchMap((payload) => this.user.getUserById(payload.sub)),
    catchError(() => {
      return of(false);
    })
  );

  constructor(private http: HttpClient, private user: UserService) {}

  logIn(username: string, password: string): Observable<LogInResponse> {
    return this.http
      .post<LogInResponse>(`${environment.apiUrl}/auth/login`, {
        username,
        password,
      })
      .pipe(
        tap(({ token }) => localStorage.setItem("auth", token)),
        tap(({ token }) => this.token$.next(token))
      );
  }
}
