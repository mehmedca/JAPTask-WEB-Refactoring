import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private toastrService: ToastrService) {}
  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(req).pipe(
      tap((evt) => {}),
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          try {
            // Check if server returns more that 1 error, if so do not display toastr msg, instead handle it on component (example in: register.component.ts)
            // if (err.error.length < 2) {
              this.toastrService.error(err.statusText, err.status.toString(), {
                positionClass: 'toast-top-right',
                timeOut: 3000,
                closeButton: true,
                progressBar: true,
                progressAnimation: 'increasing',
              });
            // }
          } catch (e) {
            this.toastrService.error('Unexpected error', '500', {
              positionClass: 'toast-bottom-center',
              timeOut: 3000,
              closeButton: true,
              progressBar: true,
              progressAnimation: 'increasing',
            });
          }
        }
        return throwError(err);
      })
    );
  }
}
