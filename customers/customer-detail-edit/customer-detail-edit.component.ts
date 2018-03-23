import { Component, OnInit } from "@angular/core";
import { ObservableArray } from "data/observable-array";
import { PageRoute, RouterExtensions } from "nativescript-angular/router";
import { alert, confirm } from "ui/dialogs";
import { ListPicker } from "ui/list-picker";

import { CustomerEditService } from "../shared/customer-edit.service";
import { Customer } from "../shared/customer.model";
import { CustomerService } from "../shared/customer.service";
import { State } from "../shared/state.model";
import { StateService } from "../shared/state.service";

/* ***********************************************************
* This is the item detail edit component.
* This component gets the selected data item, provides options to edit the item and saves the changes.
*************************************************************/
@Component({
    moduleId: module.id,
    selector: "CustomerDetailEdit",
    templateUrl: "./customer-detail-edit.component.html",
    styleUrls: ["./customer-detail-edit.component.scss"]
})
export class CustomerDetailEditComponent implements OnInit {
    private _customer: Customer = new Customer({});
    private _isBusy: boolean = false;
    private _stateNameList: Array<string> = [];
    private _stateList: Array<string> = [];
    private _addMode: boolean = false;
    private _stateIndexValue: number = 0;
    private _editDetailTitle: string;

    constructor(
        private _customerService: CustomerService,
        private _customerEditService: CustomerEditService,
        private _pageRoute: PageRoute,
        private _routerExtensions: RouterExtensions,
        private _stateService: StateService
    ) { }

    /* ***********************************************************
    * Use the "ngOnInit" handler to get the data item id parameter passed through navigation.
    * Get the data item details from the data service using this id and assign it to the
    * private property that holds it inside the component.
    *************************************************************/
    ngOnInit(): void {
        this.initializeEditOptions();

        /* ***********************************************************
        * Learn more about how to get navigation parameters in this documentation article:
        * http://docs.nativescript.org/angular/core-concepts/angular-navigation.html#passing-parameter
        *************************************************************/
        this._pageRoute.activatedRoute
            .switchMap((activatedRoute) => activatedRoute.params)
            .forEach((params) => {
                const customerId = params.id;
                this._addMode = (params.addMode === "true" ? true : false);
                this.editDetailTitle = ((this._addMode === true) ? "Create Customer" : "Edit Details");

                // Note: startCreate() will create record client-side. This allows us to retreive initial values
                this._customer = ((this._addMode === true) ? this._customerEditService.startCreate()
                    : this._customerEditService.startEdit(customerId));
                const stateIndex = this._stateList.indexOf(this._customer.State);
                this.stateIndexValue = (stateIndex >= 0) ? stateIndex : 0;
            });
    }

    get isBusy(): boolean {
        return this._isBusy;
    }

    get editDetailTitle(): string {
        return this._editDetailTitle;
    }
    set editDetailTitle(value: string) {
        this._editDetailTitle = value;
    }
    get customer(): Customer {
        return this._customer;
    }
    get stateNames(): Array<string> {
        if (this._stateNameList.length > 0) {
            return this._stateNameList;
        } else {
            return null;
        }
    }
    get stateIndexValue(): number {
        return this._stateIndexValue;
    }
    set stateIndexValue(value: number) {
        this._stateIndexValue = value;
    }

    get creditLimitValue(): number {
        return this._customer.CreditLimit;
    }

    set creditLimitValue(value: number) {
        // force iOS UISlider to work with discrete steps
        this._customer.CreditLimit = Math.round(value);
    }

    get toggleAdd(): string {
        if (!this._addMode) {
            return "item-list-even text-red";
        } else {
            return " item-list-hidden text-white";
        }
    }
    get toggleOdd(): string {
        if (!this._addMode) {
            return "item-list-odd";
        } else {
            return " item-list-hidden";
        }
    }
    /* ***********************************************************
     * The edit cancel button navigates back to:
     *  - the item details page for an edit
     *  - the list page for a create
    *************************************************************/
    onCancelButtonTap(): void {
        // Remove new record or updates to record from client memory
        this._customerService.cancelChanges();
        
        if (this._addMode) {
            this._routerExtensions.navigate(["/customers"], {
                clearHistory: true,
                animated: true,
                transition: {
                    name: "slideBottom",
                    duration: 200,
                    curve: "ease"
                }
            });
        } else {
            this._routerExtensions.backToPreviousPage();
        }
    }
    /* ***********************************************************
     * The edit done button uses the data service to save the updated values
     * of the data item details. An existing record is being updated, or
     * a new record will be added.
     * Check out the data service as customers/shared/customer.service.ts
     *************************************************************/
    onDoneButtonTap(): void {
        this._isBusy = true;
        // Update service with changes
        this._customerService.update(this._customer)
            .then((result) => {
                this.successOnDone(result);
            })
            .catch((error) => {
                this.failureOnDone(error);
            });
    }
    successOnDone(result): void {
        this._isBusy = false;
        this._customerService.acceptChanges();

        this._routerExtensions.navigate(["/customers"], {
            clearHistory: true,
            animated: true,
            transition: {
                name: "slideBottom",
                duration: 200,
                curve: "ease"
            }
        });
    }

    failureOnDone(error): void {
        const errorMessage = ((error && error.message) ? error.message : "Unknown Error when changes sent to server");
        this._isBusy = false;

        alert({ title: "Error", message: errorMessage, okButtonText: "Ok" });
    }

    selectedIndexChanged(args) {
        const picker = <ListPicker>args.object;

        // List is displayed with State.StateNames, but Customer.State maps to State.State property
        this._customer.State = this._stateList[picker.selectedIndex];
    }
    onDeleteButtonTap(): void {
        if (!this._addMode) {
            const customerItem = this._customer;
            const customerName = customerItem.Name;
            const options = {
                title: "Delete",
                message: "\"" + customerName + "\" will be deleted forever.",
                okButtonText: "Delete",
                cancelButtonText: "Cancel"
            };
            confirm(options)
                .then((result: boolean) => {
                    // result can be true/false
                    if (result) {
                        this._isBusy = true;

                        this._customerService.delete(customerItem)
                            .then((result1) => {
                                this._customerService.acceptChanges();
                                this._isBusy = false;
                                this._routerExtensions.navigate(["/customers"], {
                                    clearHistory: true,
                                    animated: true,
                                    transition: {
                                        name: "slideBottom",
                                        duration: 200,
                                        curve: "ease"
                                    }
                                });
                            }, (error) => {
                                this._customerService.cancelChanges();
                                this._isBusy = false;
                                if (error && error.message) {
                                    alert({ title: "Error", message: error.message, okButtonText: "Ok" });
                                } else {
                                    alert({
                                        title: "Error", message: "Error deleting record.",
                                        okButtonText: "Ok"
                                    });
                                }
                            }).catch((e) => {
                                alert({ title: "Error", message: e.message, okButtonText: "Ok" });
                                this._isBusy = false;
                            });
                    }
                }, (error) => {
                    this._isBusy = false;
                    alert({ title: "Error", message: "Error resolving deleted record.", okButtonText: "Ok" });
                }).catch((e) => {
                    this._isBusy = false;
                    alert({ title: "Error", message: e.message, okButtonText: "Ok" });
                });
        }
    }
    private initializeEditOptions(): void {
        // Get state data to be used by State ListPicker
        this._stateService.load()
        .finally(() =>  {
            this._isBusy = false;
        })
        .subscribe((stateRecords: Array<State>) => {
            for (const state of stateRecords) {
                this._stateNameList.push(state.StateName);
                this._stateList.push(state.State);
        }

            // Want to initialize ListPicker to current customer's state
            const stateIndex = this._stateList.indexOf(this._customer.State);
            this.stateIndexValue = (stateIndex >= 0) ? stateIndex : 0;
        }, (error) => {
            console.log("Error: " + error.message);
        });
    }
}
