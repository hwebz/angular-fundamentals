import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, first, Observable, of, tap } from "rxjs";
import { IUser } from "./user.model";

@Injectable()
export class AuthService {
  currentUser?: IUser;

  constructor(private http: HttpClient) {}

  loginUser(userName: string, password: string): Observable<any> {

    const loginInfo = {
      username: userName,
      password: password,
    };
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    };

    return this.http.post('/api/login', loginInfo, options)
      .pipe(tap((data: any) => {
        this.currentUser = <IUser> data['user'];
      }))
      .pipe(catchError((err: any) => {
        return of(false);
      }))

    // this.currentUser = {
    //   id: 1,
    //   userName: userName,
    //   firstName: 'John',
    //   lastName: 'Doe'
    // };
  }

  isAuthenticated() {
    return !!this.currentUser;
  }

  checkAuthenticationStatus() {
    this.http.get('/api/currentIdentity')
      .pipe(tap((data: any) => {
        if (data instanceof Object) {
          this.currentUser = <IUser> data;
        }
      }))
    // subscribe inside the service already
    .subscribe()

    // OR return Observable for component to subscribe
    // return this.http.get('/api/currentIdentity')
    // .pipe(tap((data: any) => {
    //   if (data instanceof Object) {
    //     this.currentUser = <IUser> data;
    //   }
    // }))
  }

  updateCurrentUser(firstName: string, lastName: string) {
    // this.currentUser = {
    //   ...this.currentUser,
    //   firstName,
    //   lastName,
    // } as IUser;

    if (this.currentUser) {
      this.currentUser.firstName = firstName;
      this.currentUser.lastName = lastName;
    }

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    };

    return this.http.post('/api/users/${this.currentUser.id}', this.currentUser, options);
  }

  logout() {
    this.currentUser = undefined;
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    };

    this.http.post('/api/logout', {}, options);
  }
}