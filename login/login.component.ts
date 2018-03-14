import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";

import { Page } from "ui/page";
import { Color } from "color";
import { View } from "ui/core/view";

import { progress } from "@progress/jsdo-core";
import { JsdoSettings } from "../shared/jsdo.settings";
import { AppComponent } from "../app.component";
import { ProgressService } from "../shared/progress.service";



@Component({
    // The selector property defines how a component can be used within
    // another components template 
    selector: "my-app",
    templateUrl: "login/login.html",
    styleUrls: ["login/login-common.css", "login/login.css"],

    //providers: [UserService],
    providers: [AppComponent],
})
export class LoginComponent implements OnInit {
    username: string;
    password: string;
    private _isNotAnonymous: boolean = (JsdoSettings.authenticationModel !== "Anonymous");

    @ViewChild("container") container: ElementRef;
    constructor(
        private page: Page,
        private _routerExtensions: RouterExtensions,
        private progressService: ProgressService
    ) {
        
    }

    // Runs after the constructor, all injected dependencies are resolved
    // and all class members are defined 
    ngOnInit() {
        // this.page.actionBarHidden = true;
        // this.page.backgroundImage = "res://bg_login";
        if (JsdoSettings.authenticationModel === "Anonymous") {
            this.login();
        }
    }


    login() {
        try {
            debugger;
            this.progressService.login(this.username, this.password)
                .then((result) => {
                    console.log("Success on login()");
                    
                    this._routerExtensions.navigate(["/customers"], { clearHistory: true });
                })
                .catch(function (object) {
                    alert("Login failed.");
                });
        }
        catch (ex) {
            alert("Error logging in");
        }
    }

}