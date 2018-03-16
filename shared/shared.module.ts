import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptUISideDrawerModule } from "nativescript-pro-ui/sidedrawer/angular";

import { SideDrawerComponent } from "./side-drawer/side-drawer.component";

@NgModule({
    imports: [
        NativeScriptModule,
        NativeScriptUISideDrawerModule
    ],
    declarations: [
        SideDrawerComponent
    ],
    exports: [
        SideDrawerComponent,
        NativeScriptUISideDrawerModule
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class SharedModule { }
