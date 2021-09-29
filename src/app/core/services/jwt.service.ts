import { Injectable } from "@angular/core";

@Injectable()
export class JwtService {
  getToken(): String {
    return window.localStorage["currentUser"]
      ? JSON.parse(window.localStorage["currentUser"]).token
      : null;
  }

  saveToken(token: String) {
    window.localStorage["jwtToken"] = token;
  }

  destroyToken() {
    window.localStorage.removeItem("jwtToken");
  }
}