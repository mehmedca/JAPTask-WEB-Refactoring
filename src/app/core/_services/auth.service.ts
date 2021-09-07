import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from './../../../environments/environment';

import { configuration } from '../config';
import { TokenModel } from '../_models/tokenmodel';
import { LoginModel } from '../_models/auth/login';


@Injectable({ providedIn: 'root' })
export class AuthService {
    private currentUserSubject: BehaviorSubject<TokenModel | null>;
    public currentUser: Observable<TokenModel | null>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<TokenModel | null>(JSON.parse(localStorage.getItem('currentUser') || "{}"));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): TokenModel | null {
        if(Object.keys(this.currentUserSubject.getValue).length > 0)
            return this.currentUserSubject?.value;

        return null;
    }

    login(model: LoginModel) {
        return this.http.post<TokenModel>(`${environment.baseUrl}${configuration.endpoints.auth.login}`, model)
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}
