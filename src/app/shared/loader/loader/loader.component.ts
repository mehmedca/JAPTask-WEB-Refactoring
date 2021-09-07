import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { Subscription } from "rxjs";

import { LoaderService } from "src/app/core";


@Component({
  selector: "app-loader",
  templateUrl: "./loader.component.html",
  styleUrls: ["./loader.component.css"]
})
export class LoaderComponent implements OnInit {
  show: boolean = false;
  @Output() visibilityChanged: EventEmitter<boolean> = new EventEmitter();
  private subscription: Subscription = new Subscription();

  constructor(private loaderService: LoaderService) {}

  ngOnInit() {
    this.subscription = this.loaderService.loaderState.subscribe(
      (state: boolean) => {
        this.show = state;
        this.visibilityChanged.emit(this.show);
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}