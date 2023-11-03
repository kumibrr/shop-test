import { Component, EventEmitter, Input, Output } from "@angular/core";
import { User } from "src/app/shared/model/user";

@Component({
  selector: "tr[app-user-row]",
  templateUrl: "./user-row.component.html",
  styleUrls: ["./user-row.component.css"],
})
export class UserRowComponent {
  @Input("user") user: User;
  @Output("delete") delete = new EventEmitter<number>(true);
  @Output("edit") edit = new EventEmitter<number>(true);
  @Output("viewCart") viewCart = new EventEmitter<number>(true);
}
