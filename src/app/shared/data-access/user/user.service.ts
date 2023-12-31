import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { User } from "../../model/user";
import { environment } from "src/environments/environment";
import { map, mergeMap, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private users$ = new BehaviorSubject<User[]>(null);

  constructor(private http: HttpClient) {}

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
  }

  getUsers() {
    return this.http.get<User[]>(`${environment.apiUrl}/users`).pipe(
      tap((users) => this.users$.next(users)),
      map(() => this.users$.asObservable()),
      mergeMap((r) => r)
    );
  }

  deleteUser(id: number) {
    return this.http.delete(`${environment.apiUrl}/users/${id}`).pipe(
      tap(() => {
        this.users$.next(this.users$.value.filter((user) => user.id !== id));
      })
    );
  }

  submitNewUser({ id, ...user }: User) {
    // The API seems to only return id 1 or 11. Weird behaviour but it's fine I guess.
    return this.http
      .post<{ id: number }>(`${environment.apiUrl}/users`, user)
      .pipe(
        tap((newUserId) => {
          this.users$.next([
            ...this.users$.value.filter((user) => user.id !== id),
            { ...user, id: newUserId.id },
          ]);
        })
      );
  }

  updateUser(user: User) {
    return this.http
      .put<User>(`${environment.apiUrl}/users/${user.id}`, user)
      .pipe(
        tap((user) =>
          this.users$.next([
            ...this.users$.value.filter((u) => u.id !== user.id),
            user,
          ])
        )
      );
  }

  createEmptyUser() {
    //THIS IS UNDOUBTEDLY WRONG, THIS RANDOM ID SHOULD BE GIVEN BY THE SERVER
    //AND IS A MASSIVE EXPLOIT IN ITS CURRENT FORM.
    let randomId;
    do {
      randomId = Math.floor(Math.random() * 999);
    } while (this.users$.value.includes(randomId));

    const emptyUser: User = {
      id: randomId,
      name: {
        firstname: "",
        lastname: "",
      },
      email: "",
      password: "",
      phone: "",
      username: "",
      address: {
        city: "",
        geolocation: {
          lat: null,
          long: null,
        },
        number: null,
        street: "",
        zipcode: null,
      },
    };
    this.users$.next([...this.users$.value, emptyUser]);
    return emptyUser.id;
  }
}
