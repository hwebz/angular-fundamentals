import { Component } from "@angular/core";
import { Form } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent {
  userName: any;
  password: any;

  constructor(private authService: AuthService, private router: Router) {}

  login(formValues: any) {
    const { userName, password } = formValues;
    this.authService.loginUser(userName, password);
    this.router.navigate(['events']);
  }

  cancel() {
    this.router.navigate(['events']);
  }
}