import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { CustomerDetailEditComponent } from "./customer-detail-edit/customer-detail-edit.component";
import { CustomerDetailComponent } from "./customer-detail/customer-detail.component";
import { CustomerListComponent } from "./customer-list.component";

const routes: Routes = [
    { path: "", component: CustomerListComponent },
    { path: "customer-detail/:id", component: CustomerDetailComponent },
    { path: "customer-detail-edit/:id/:addMode", component: CustomerDetailEditComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class CustomersRoutingModule { }
