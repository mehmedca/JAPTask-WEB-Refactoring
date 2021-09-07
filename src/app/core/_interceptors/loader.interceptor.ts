import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse
} from "@angular/common/http";
import { Observable } from "rxjs";

import { LoaderService } from "../_services/loader.service";

@Injectable({
  providedIn: "root"
})
export class LoaderInterceptor implements HttpInterceptor {
  timer: any;
  counterWhenTimeoutMethodStarted: number = 0;
  private requestsCounter: number = 0;

  constructor(private loaderService: LoaderService) { }

  removeRequest() {
    this.requestsCounter--;
    this.loaderService.updateLoaderState(this.requestsCounter > 0);
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.counterWhenTimeoutMethodStarted = ++this.requestsCounter;

    this.timer = setTimeout(() => { if (this.counterWhenTimeoutMethodStarted === this.requestsCounter) this.loaderService.updateLoaderState(true) }, 1000);

    return new Observable((observer: any) => {
      const subscription = next.handle(req).subscribe(
        event => {
          if (event instanceof HttpResponse) {
            this.removeRequest();
            clearTimeout(this.timer);
            observer.next(event);
          }
        },
        err => {
          this.removeRequest();
          clearTimeout(this.timer);
          observer.error(err);
        },
        () => {
          this.removeRequest();
          clearTimeout(this.timer);
          observer.complete();
        }
      );
      return () => {
        this.removeRequest();
        subscription.unsubscribe();
      };
    });
  }
}