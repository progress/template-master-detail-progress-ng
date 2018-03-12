import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptUIListViewModule } from "nativescript-pro-ui/listview/angular";

import { CustomerDetailEditComponent } from "./customer-detail-edit/customer-detail-edit.component";
import { MyImageAddRemoveComponent } from "./customer-detail-edit/my-image-add-remove/my-image-add-remove.component";
import { MyListSelectorModalViewComponent } from "./customer-detail-edit/my-list-selector/my-list-selector-modal-view.component"; // tslint:disable-line:max-line-length
import { MyListSelectorComponent } from "./customer-detail-edit/my-list-selector/my-list-selector.component";
import { CustomerDetailComponent } from "./customer-detail/customer-detail.component";
import { CustomerListComponent } from "./customer-list.component";
import { CustomersRoutingModule } from "./customers-routing.module";
import { CustomerEditService } from "./shared/customer-edit.service";
import { CustomerService } from "./shared/customer.service";
import { StateService } from "./shared/state.service";

@NgModule({
    imports: [
        CustomersRoutingModule,
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        NativeScriptUIListViewModule
    ],
    declarations: [
        CustomerListComponent,
        CustomerDetailComponent,
        CustomerDetailEditComponent,
        MyListSelectorComponent,
        MyListSelectorModalViewComponent,
        MyImageAddRemoveComponent
    ],
    entryComponents: [
        MyListSelectorModalViewComponent
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
