import { Component } from "@angular/core";
import { Form } from "@angular/forms";

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent {
  userName: any;
  password: any;

  login(loginForm: any) {
    console.log(loginForm);
  }
}