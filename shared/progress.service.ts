import { progress } from "@progress/jsdo-core";

import { JsdoSettings } from "./jsdo.settings";

import { Component } from "@angular/core";
import { Injectable } from "@angular/core";

// All this class does is bridge the JSDOSession from the login page
// to the NOT login page. 

@Injectable()
export class ProgressService {
  
  private jsdosession: progress.data.JSDOSession;

  constructor() {
  }

  ngOnInit() {
    this.jsdosession = undefined;
  }

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
        username: (JsdoSettings.authenticationModel === 'Anonymous') ? '' : username, 
        password: (JsdoSettings.authenticationModel === 'Anonymous') ? '' : password
    })
    .then((result) => {
      this.jsdosession = result.jsdosession;
      return result;
    });
  }

  logout() {
    var promise = this.jsdosession.invalidate();

    this.jsdosession = undefined;

    return promise;
  }

}