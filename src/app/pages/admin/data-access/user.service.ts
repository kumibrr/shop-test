import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { map, mergeMap, tap } from "rxjs/operators";
import { User } from "src/app/shared/model/user";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class UserService {
  users$ = new BehaviorSubject<User[]>(null);

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<User[]>(`${environment.apiUrl}/users`).pipe(
      tap((users) => this.users$.next(users)),
      map(() => this.users$.asObservable()),
      mergeMap((r) => r)
    );
  }
}
