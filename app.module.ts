import { NgModule, NgModuleFactoryLoader, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import {NativeScriptFormsModule} from "nativescript-angular/forms"

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";

import { ProgressService } from "./shared/progress.service";
import { LoginGuard } from "./shared/login-guard.service";

/* ************************************************************************
* Importing all rxjs operators increases build output and duration
* so it is better to import the operators in use only;
* also, due to the polyfill-ish nature of the RxJS modules,
* it is enough to import an operator once at a single, centralized location.
**************************************************************************/
import "./rxjs.imports";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        NativeScriptFormsModule
    ],
    declarations: [
        AppComponent,
        LoginComponent
    ],
    providers: [
        ProgressService,
        LoginGuard
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
