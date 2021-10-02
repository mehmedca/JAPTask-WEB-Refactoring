import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from './../../../environments/environment';

import { configuration } from '../config';
import { TokenModel } from '../models/tokenmodel';
import { LoginModel } from '../models/auth/login';
import { RegisterModel } from '../models/auth/register';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject: BehaviorSubject<TokenModel | null>;
  public currentUser: Observable<TokenModel | null>;

  constructor(private http: HttpClient) {
    //Get current user from local storage if any
    const currentUser = localStorage.getItem('currentUser');
    let parsedVal;
    if (typeof currentUser === 'string') {
      parsedVal = JSON.parse(currentUser); // ok
    }

    this.currentUserSubject = new BehaviorSubject<TokenModel | null>(parsedVal);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): TokenModel | null {
    return this.currentUserSubject?.value;
  }

  login(model: LoginModel) {
    return this.http
      .post<TokenModel>(
        `${environment.baseAuthUrl}${configuration.endpoints.auth.login}`,
        model
      )
      .pipe(
        map((user) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          this.setCurrentUser(user);
          return user;
        })
      );
  }

  register(model: RegisterModel) {
    return this.http
      .post<TokenModel>(
        `${environment.baseAuthUrl}${configuration.endpoints.auth.register}`,
        model
      )
      .pipe(
        map((user) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          this.setCurrentUser(user);
          return user;
        })
      );
  }

  setCurrentUser(user: TokenModel) {
    user.roles = [];
    const roles = this.getDecodedToken(user.token).role;
    Array.isArray(roles) ? (user.roles = roles) : user.roles.push(roles);
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  getDecodedToken(token: any) {
    return JSON.parse(atob(token.split('.')[1]));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
