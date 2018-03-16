import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptUIListViewModule } from "nativescript-pro-ui/listview/angular";

import { SharedModule } from "../shared/shared.module";
import { CustomerDetailEditComponent } from "./customer-detail-edit/customer-detail-edit.component";
import { CustomerDetailComponent } from "./customer-detail/customer-detail.component";
import { CustomerListComponent } from "./customer-list/customer-list.component";
import { CustomersRoutingModule } from "./customers-routing.module";
import { CustomerEditService } from "./shared/customer-edit.service";
import { CustomerService } from "./shared/customer.service";
import { StateService } from "./shared/state.service";

@NgModule({
    imports: [
        CustomersRoutingModule,
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        NativeScriptUIListViewModule,
        SharedModule
    ],
    declarations: [
        CustomerListComponent,
        CustomerDetailComponent,
        CustomerDetailEditComponent
    ],
    providers: [
        CustomerService,
        CustomerEditService,
        StateService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class CustomersModule { }
