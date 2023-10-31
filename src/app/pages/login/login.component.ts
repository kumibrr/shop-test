import { Component } from "@angular/core";

type LoginData = {
  username: string | undefined;
  password: string | undefined;
};

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent {
  login: LoginData = {
    username: "",
    password: "",
  };

  submit(event) {
    console.log(this.login);
  }
}
