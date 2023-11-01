import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { map, switchMap, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { User } from "../../model/user";
import { jwtDecode } from "jwt-decode";
import { UserService } from "../user/user.service";

type LogInResponse = { token: string };

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private loggedUser$: BehaviorSubject<User> = new BehaviorSubject(null);

  constructor(private http: HttpClient, private user: UserService) {}

  logIn(username: string, password: string): Observable<any> {
    return this.http
      .post<LogInResponse>(`${environment.apiUrl}/auth/login`, {
        username,
        password,
      })
      .pipe(
        map(({ token }) =>
          jwtDecode<{ sub: number; user: string; iat: number }>(token)
        ),
        switchMap((payload) => this.user.getUserById(payload.sub)),
        tap((user) => this.loggedUser$.next(user))
      );
  }

  getLoggedUser(): Observable<User> {
    return this.loggedUser$.asObservable();
  }
}
