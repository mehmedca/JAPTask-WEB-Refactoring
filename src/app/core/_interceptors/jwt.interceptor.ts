import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { JwtService } from '../_services';

@Injectable({
    providedIn: 'root'
})
export class JwtInterceptor implements HttpInterceptor {

    constructor(private jwtService: JwtService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        const token = this.jwtService.getToken();

        let headersConfig = {
          'Accept': 'application/json',
          'Authorization': token != null ? `Bearer ${token}` : ""
        };

        const request = req.clone({ setHeaders:  headersConfig});
        return next.handle(request);
    }
}