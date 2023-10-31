import { Component } from "@angular/core";

type LoginData = {
  email: string | undefined;
  password: string | undefined;
};

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent {
  login: LoginData = {
    email: "",
    password: "",
  };

  submit(event) {
    console.log(this.login);
  }
}
