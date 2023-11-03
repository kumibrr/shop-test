import { Component, OnDestroy, OnInit } from "@angular/core";
import { UserService } from "./data-access/user.service";
import { BehaviorSubject, Observable, Subject, noop } from "rxjs";
import { User } from "src/app/shared/model/user";
import { takeUntil, tap } from "rxjs/operators";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"],
})
export class AdminComponent implements OnInit, OnDestroy {
  users$: Observable<User[]>;
  selectedUserCart$ = new BehaviorSubject<User["id"]>(1);
  dialog$ = new BehaviorSubject<boolean>(false);
  private readonly destroy$ = new Subject<boolean>();
  usersBeingEdited$ = new BehaviorSubject<Array<User["id"]>>([]);
  //TODO: user filter
  //TODO: user sort

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.users$ = this.userService.getUsers();
    this.selectedUserCart$.pipe(takeUntil(this.destroy$)).subscribe(noop);
  }

  editUser(id: number) {
    this.usersBeingEdited$.next([...this.usersBeingEdited$.value, id]);
  }

  stopEditUser(id: User["id"]) {
    this.usersBeingEdited$.next(
      this.usersBeingEdited$.value.filter((user) => user !== id)
    );
  }

  applyEditUser(user: User) {
    console.log(user);
    this.stopEditUser(user.id);
  }

  createUser() {
    this.userService.createEmptyUser();
  }

  deleteUser(id: number) {
    this.userService
      .deleteUser(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(noop);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
