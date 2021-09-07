import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from './../../../environments/environment';

import { configuration } from '../config';
import { TokenModel } from '../_models/tokenmodel';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private currentUserSubject: BehaviorSubject<TokenModel | null>;
    public currentUser: Observable<TokenModel | null>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<TokenModel | null>(JSON.parse(localStorage.getItem('currentUser') || ""));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): TokenModel | null {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
        return this.http.post<any>(`${environment.baseUrl}${configuration.endpoints.auth.login}`, { username, password })
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