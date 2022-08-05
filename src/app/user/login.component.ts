import { Component } from "@angular/core";
import { Form } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";

@Component({
  templateUrl: './login.component.html',
  styles: [`
    em { float: right; color: #e05c65; padding-left: 10px; }
  `]
})
export class LoginComponent {
  userName: any;
  password: any;
  mouseoverLogin = false;
  loginInvalid = false;

  constructor(private authService: AuthService, private router: Router) {}

  login(formValues: any) {
    // const { userName, password } = formValues;
    // this.authService.loginUser(userName, password);
    // this.router.navigate(['events']);

    this.authService.loginUser(formValues.userName, formValues.password)
      .subscribe(resp => {
        if (!resp) {
          this.loginInvalid = true;
        } else {
          this.router.navigate(['events']);
        }
      })
  }

  cancel() {
    this.router.navigate(['events']);
  }
}