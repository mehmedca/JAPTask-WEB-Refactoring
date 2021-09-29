import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class LoaderService {
  private loaderSubject = new Subject<boolean>();

  loaderState = this.loaderSubject.asObservable();

  constructor() {}

  updateLoaderState(newState: boolean) {
    this.loaderSubject.next(newState);
  }
}