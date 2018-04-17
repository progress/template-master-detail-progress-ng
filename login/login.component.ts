import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";

import { Color } from "color";
import { View } from "ui/core/view";
import { Page } from "ui/page";

import { progress } from "@progress/jsdo-core";
import { AppComponent } from "../app.component";
import { JsdoSettings } from "../shared/jsdo.settings";

import { ProgressService } from "../shared/progress.service";

@Component({
    // The selector property defines how a component can be used within
    // another components template
    selector: "my-app",
    templateUrl: "login/login.html",
    styleUrls: ["login/login-common.css", "login/login.css"],
    providers: [AppComponent]
})
export class LoginComponent implements OnInit {

    @ViewChild("container") container: ElementRef;

    isAuthenticating: boolean = false;

    private username: string;
    private password: string;
    private _isNotAnonymous: boolean = (JsdoSettings.authenticationModel !== "Anonymous");

    constructor(
        private page: Page,
        private _routerExtensions: RouterExtensions,
        private progressService: ProgressService
    ) {

    }

    // Runs after the constructor, all injected dependencies are resolved
    // and all class members are defined
    ngOnInit() {
        if (JsdoSettings.authenticationModel === "Anonymous") {
            this.login();
        }
    }

    login() {
        this.isAuthenticating = true;
        try {
            this.progressService.login(this.username, this.password)
                .then((result) => {
                    this._routerExtensions.navigate(["/customers"], { clearHistory: true });
                    this.isAuthenticating = false;
                })
                .catch((object) => {
                    this.isAuthenticating = false;
                    alert("Login failed.");
                });
        } catch (ex) {
            this.isAuthenticating = false;
            alert("Error logging in");
        }
    }

}
