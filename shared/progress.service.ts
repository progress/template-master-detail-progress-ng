import { progress } from "@progress/jsdo-core";

import { JsdoSettings } from "./jsdo.settings";

import { Component, Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

// All this class does is bridge the JSDOSession from the login page
// to the NOT login page.

@Injectable()
export class ProgressService {

  isLoggedin$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  private jsdosession: progress.data.JSDOSession;

  isLoggedIn() {
    if (this.jsdosession) {
      return true;
    }

    return false;
  }

  login(username: string, password: string) {
    return progress.data.getSession({
        name: "myAppSession",
        authenticationModel: JsdoSettings.authenticationModel,
        serviceURI: JsdoSettings.serviceURI,
        catalogURI: JsdoSettings.catalogURI,
        username: (JsdoSettings.authenticationModel === "Anonymous") ? "" : username,
        password: (JsdoSettings.authenticationModel === "Anonymous") ? "" : password
    })
    .then((result) => {
      this.jsdosession = result.jsdosession;
      this.isLoggedin$.next(true);

      return result;
    });
  }

  logout() {
    const promise = this.jsdosession.invalidate();

    this.jsdosession = undefined;
    this.isLoggedin$.next(false);

    return promise;
  }

}
