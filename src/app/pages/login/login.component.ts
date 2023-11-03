import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/shared/data-access/auth/auth.service";

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

  constructor(private auth: AuthService, private router: Router) {}

  submit() {
    const { username, password } = this.login;
    const subscription = this.auth.logIn(username, password).subscribe({
      next: () => {
        this.router.navigate(["/"]).then(() => {
          subscription.unsubscribe();
        });
      },
      error: () => {
        this.login.password = "";
      },
    });
  }
}
