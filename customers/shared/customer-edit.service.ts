import { Injectable } from "@angular/core";

import { Customer } from "./customer.model";
import { CustomerService } from "./customer.service";

@Injectable()
export class CustomerEditService {
    private _editModel: Customer;

    constructor(private _customerService: CustomerService) {
        console.log("DEBUG: customer-edit.service.ts constructor");
    }

    startEdit(id: string): Customer {
        this._editModel = null;

        return this.getEditableCustomerById(id);
    }

    startCreate(): Customer {
        this._editModel = this._customerService.createNewRecord();
        return this._editModel;
    }
    getEditableCustomerById(id: string): Customer {
        if (!this._editModel || this._editModel.id !== id) {


            this._editModel = this._customerService.getCustomerById(id);
        }

        return this._editModel;
    }

}
