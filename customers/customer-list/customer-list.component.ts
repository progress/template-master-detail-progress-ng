import { Component, OnInit, ViewChild } from "@angular/core";
import { ObservableArray } from "data/observable-array";
import { RouterExtensions } from "nativescript-angular/router";
import { ListViewEventData } from "nativescript-pro-ui/listview";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-pro-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-pro-ui/sidedrawer/angular";
import { isAndroid, isIOS } from "platform";

import { EventData, View } from "tns-core-modules/ui/core/view/view";
import { alert, confirm } from "tns-core-modules/ui/dialogs";
import { JsdoSettings } from "../../shared/jsdo.settings";
import { Customer } from "../shared/customer.model";
import { CustomerService } from "../shared/customer.service";

const SEARCH_DELAY = 300;

/* ***********************************************************
* This is the master list component in the master-detail structure.
* This component gets the data, passes it to the master view and displays it in a list.
* It also handles the navigation to the details page for each item.
*************************************************************/
@Component({
    selector: "CustomersList",
    moduleId: module.id,
    templateUrl: "./customer-list.component.html",
    styleUrls: ["./customer-list.component.scss"]
})
export class CustomerListComponent implements OnInit {
    @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;

    search: string;

    private _isLoading: boolean = false;
    private _customers: ObservableArray<Customer> = new ObservableArray<Customer>([]);
    private timer;
    private isAndroid: boolean = isAndroid;
    private isIOS: boolean = isIOS;
    private _sideDrawerTransition: DrawerTransitionBase;

    constructor(
        private _customerService: CustomerService,
        private _routerExtensions: RouterExtensions
    ) {
    }

    /* ***********************************************************
    * Use the "ngOnInit" handler to get the data and assign it to the
    * private property that holds it inside the component.
    *************************************************************/
    ngOnInit(): void {
        this._isLoading = true;

        /* ***********************************************************
        * The data is retrieved remotely from a Progress Data Service.
        * The actual data retrieval code is wrapped in a data service.
        * Check out the service in customers/shared/customer.service.ts
        *************************************************************/

        this._customerService.load()
            .finally(() => this._isLoading = false)
            .subscribe((customers: Array<Customer>) => {
                this._customers = new ObservableArray(customers);
                this._isLoading = false;
            }, (error) => {
                console.log("DEBUG, in ngOnIOnit: " + error);
                if (error && error.message) {
                    alert("Error: \n" + error.message);
                } else {
                    alert("Error  reading records.");
                }
            });
    }

    get customers(): ObservableArray<Customer> {
        return this._customers;
    }

    get isLoading(): boolean {
        return this._isLoading;
    }

    get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }

    // According to guidelines, if you have a drawer on your page, you should always
    // have a button that opens it. Use the showDrawer() function to open the app drawer section.
    onDrawerButtonTap(): void {
        this.drawerComponent.sideDrawer.showDrawer();
    }

    onAddButtonTap(): void {
        if (!this._customerService.hasEditSupport()) {
            alert("Service does not provide Add functionality.");
        } else {
            this._routerExtensions.navigate(["/customers/customer-detail-edit", -1, true],
                {
                    animated: true,
                    transition: {
                        name: "slideTop",
                        duration: 200,
                        curve: "ease"
                    }
                });
        }
    }

    /* ***********************************************************
    * Use the "itemTap" event handler of the <RadListView> to navigate to the
    * item details page. Retrieve a reference for the data item (the id) and pass it
    * to the item details page, so that it can identify which data item to display.
    * Learn more about navigating with a parameter in this documentation article:
    * http://docs.nativescript.org/angular/core-concepts/angular-navigation.html#passing-parameter
    *************************************************************/
    onCustomerItemTap(args: ListViewEventData): void {
        const tappedCustomerItem = args.view.bindingContext;

        this._routerExtensions.navigate(["/customers/customer-detail", tappedCustomerItem._id],
            {
                animated: true,
                transition: {
                    curve: "ease",
                    duration: 200,
                    name: "slide"

                }
            });
    }

    onSwipeCellStarted(args: ListViewEventData) {
        const swipeLimits = args.data.swipeLimits;
        const swipeView = args.object;
        const leftItem = swipeView.getViewById<View>("delete-view");
        swipeLimits.right = leftItem.getMeasuredWidth();
        swipeLimits.left = 0;
        swipeLimits.threshold = leftItem.getMeasuredWidth();
    }

    onLeftSwipeClick(args: ListViewEventData) {
        // debugger;
        const customerItem = args.view.bindingContext;
        const customerName = customerItem.Name;
        const options = {
            cancelButtonText: "Cancel",
            message: "\"" + customerName + "\" will be deleted forever.",
            okButtonText: "Delete",
            title: "Delete"

        };
        confirm(options)
            .then((result: boolean) => {
                // result can be true/false
                if (result) {
                    this._customerService.delete(customerItem)
                        .then((result1) => {
                            // Delete was successful, so we can accept the changes
                            this._customerService.acceptChanges();
                            this.ngOnInit();
                        }, (error) => {
                            // Delete was not successful, so let's back out the deletion
                            this._customerService.cancelChanges();
                            if (error && error.message) {
                                alert({ title: "Error", message: error.message, okButtonText: "Ok" });
                            } else {
                                alert({ title: "Error", message: "Error deleting record.", okButtonText: "Ok" });
                            }
                        }).catch((e) => {
                            alert({ title: "Error", message: e.message, okButtonText: "Ok" });
                        });
                }
            }, (error) => {
                alert({ title: "Error", message: "Error resolving deleted record.", okButtonText: "Ok" });
            }).catch((e) => {
                alert({ title: "Error", message: e.message, okButtonText: "Ok" });
            });
    }

    onSearchChange(args: EventData) {
        let searchFilter: any = JsdoSettings.searchFilter;
        try {
            if (typeof (searchFilter) === "object") {
                searchFilter = JSON.parse(
                    JSON.stringify(searchFilter).replace("$SEARCH", this.search));
            } else if (typeof (searchFilter) === "string") {
                searchFilter = searchFilter.replace("$SEARCH", this.search);
            } else {
                searchFilter = "";
            }
        } catch (e) {
            searchFilter = "";
        }

        const params = this.search.length === 0 ? {
            filter: JsdoSettings.filter,
            sort: JsdoSettings.sort
        } : {
                filter: searchFilter,
                sort: { field: "Name", dir: "asc" }
            };

        if (this.timer) {
            clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => {
            this._customerService.load(params)
                .finally(() => {
                    this._isLoading = false;
                })
                .subscribe((customers: Array<Customer>) => {
                    this._customers = new ObservableArray(customers);
                    this._isLoading = false;
                }, (error) => {
                    if (error && error.message) {
                        alert("Error: \n" + error.message);
                    } else {
                        alert("Error  reading records.");
                    }
                });
        }, SEARCH_DELAY);
    }

    onSearchBarLoaded(event) {
        if (event.object.android) {
            event.object.android.clearFocus();
        }
    }

    // This gets triggered when refresh (Pull down) operation is performed in the Listview
    // in mobile app. As part of this we perform a read() operation with same filter criteria
    // such that all records are fetched again from server
    onPullToRefreshInitiated(args: ListViewEventData) {
        console.log("In onPullToRefreshInitiated()");       

        // We want to use the same filter criteria while refreshing the listview
        const params = {
            filter: JsdoSettings.filter,
            sort: JsdoSettings.sort
        };

        this._customerService.load(params)
            .finally(() => {
                this._isLoading = false
            })
            .subscribe((customers: Array<Customer>) => {
                this._customers = new ObservableArray(customers);
                this._isLoading = false;
            }, (error) => {
                console.log("In onPullToRefreshInitiated() Error section: " + error);
                if (error && error.message) {
                    alert("Error: \n" + error.message);
                } else {
                    alert("Error reading records.");
                }
            });
        var listView = args.object;
        listView.notifyPullToRefreshFinished();
    }
}
