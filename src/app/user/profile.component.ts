import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const { currentUser } = this.authService;
    let firstName = new FormControl(currentUser?.firstName);
    let lastName = new FormControl(currentUser?.lastName);
    this.profileForm = new FormGroup({
      firstName,
      lastName,
    })
  }

  saveProfile(formValues: any) {
    const { firstName, lastName } = formValues;
    this.authService.updateCurrentUser(firstName, lastName);
    this.router.navigate(['events']);
  }

  cancel() {
    this.router.navigate(['events']);
  }
}