import { progress } from "@progress/jsdo-core";

import { JsdoSettings } from "./jsdo.settings";

import { Component } from "@angular/core";
import { Injectable } from "@angular/core";

/* *************************************************************************************
 * The ProgressService provides access to Progress Data Object resources.
 * It contains login and logout functionality.
 *
 * When login is performed:
 *      - A progress.data.JSDOSession instance is created.
 *      - The login is established.
 *      - The specified Data Service catalog is loaded.
 * 
 * After login, the progress.data.JSDOSession instance is then ready to support the creation
 * of DataSources for any resource specified in the Data Service catalog.
 *
 * When logout is performed:
 *      - The login session is terminated.
 *      - The progress.data.JSDOSession instance is disabled, rendering it unable to start 
 *        a new login session.
***************************************************************************************/



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