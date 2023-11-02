import {
  Component,
  ElementRef,
  OnInit,
  TemplateRef,
  ViewChild,
} from "@angular/core";
import { UserService } from "./data-access/user.service";
import { BehaviorSubject, Observable, Subject, noop } from "rxjs";
import { User } from "src/app/shared/model/user";
import { tap } from "rxjs/operators";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"],
})
export class AdminComponent implements OnInit {
  @ViewChild("dialog") dialog: ElementRef<HTMLDialogElement>;

  users$: Observable<User[]>;
  selectedUserId$ = new BehaviorSubject<number>(1);
  dialog$ = new BehaviorSubject<boolean>(false);

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.users$ = this.userService.getUsers();
    this.users$.pipe(tap(console.log)).subscribe(noop);
    this.selectedUserId$.pipe(tap(console.log)).subscribe(noop);

    console.log(this.dialog.nativeElement);
  }
}
