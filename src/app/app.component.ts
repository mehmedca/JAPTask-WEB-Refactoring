import { Component, ChangeDetectorRef } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { NgbModalConfig } from "@ng-bootstrap/ng-bootstrap";
import { LoaderService } from "./core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  shouldShowContent: boolean = true;

  constructor(
    private config: NgbModalConfig,
    private http: HttpClient,
    private ref: ChangeDetectorRef
  ) {
    //forbid modal close on backdrop click(application-wide)
    config.backdrop = "static";
    config.keyboard = false;
  }

  onVisibilityChanged(loaderShown: boolean) {
    this.shouldShowContent = !loaderShown;
  }

  ngAfterContentChecked() {
    this.ref.detectChanges();
  }
}