import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";

import { ProgressService } from "./progress.service";

@Injectable()
export class LoginGuard implements CanActivate {

    constructor(
        private _routerExtensions: RouterExtensions,
        private progressService: ProgressService
    ) { }

    canActivate() {
        if (!this.progressService.isLoggedIn()) {
            this._routerExtensions.navigate(["/login"], { clearHistory: true });

            return false;
        }

        return true;
    }
}
