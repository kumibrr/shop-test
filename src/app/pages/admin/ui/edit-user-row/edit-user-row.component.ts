import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { User } from "src/app/shared/model/user";

@Component({
  selector: "tr[app-edit-user-row]",
  templateUrl: "./edit-user-row.component.html",
  styleUrls: ["./edit-user-row.component.css"],
})
export class EditUserRowComponent implements OnInit {
  @Input("user") user: User;
  @Output("cancel") cancel = new EventEmitter<number>(true);
  @Output("submit") submit = new EventEmitter<User>(true);

  form: FormGroup;

  constructor() {}

  ngOnInit() {
    this.form = new FormGroup({
      id: new FormControl(this.user.id),
      password: new FormControl(this.user.password),
      email: new FormControl(this.user.email, [
        Validators.required,
        Validators.email,
      ]),
      username: new FormControl(this.user.username, Validators.required),
      firstname: new FormControl(this.user.name.firstname, Validators.required),
      lastname: new FormControl(this.user.name.lastname, Validators.required),
      phone: new FormControl(this.user.phone, [
        Validators.required,
        Validators.pattern(
          /(?:([+]\d{1,4})[-.\s]?)?(?:[(](\d{1,3})[)][-.\s]?)?(\d{1,4})[-.\s]?(\d{1,4})[-.\s]?(\d{1,9})/
        ),
      ]),
      address: new FormGroup({
        street: new FormControl(this.user.address.street, Validators.required),
        number: new FormControl(this.user.address.number, Validators.required),
        city: new FormControl(this.user.address.city, Validators.required),
        zipcode: new FormControl(
          this.user.address.zipcode,
          Validators.required
        ),
        latitude: new FormControl(
          this.user.address.geolocation.lat,
          Validators.required
        ),
        longitude: new FormControl(
          this.user.address.geolocation.long,
          Validators.required
        ),
      }),
    });
  }
}
