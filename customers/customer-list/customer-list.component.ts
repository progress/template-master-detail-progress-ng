import { Component, OnInit, ViewChild, ChangeDetectorRef } from "@angular/core";
import { ObservableArray } from "data/observable-array";
import { RouterExtensions } from "nativescript-angular/router";
import { ListViewEventData, ListViewLinearLayout, RadListView } from "nativescript-ui-listview";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-ui-sidedrawer";
import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular";
import { isAndroid, isIOS } from "platform";

import { EventData, View } from "tns-core-modules/ui/core/view/view";
import { alert, confirm } from "tns-core-modules/ui/dialogs";
import { JsdoSettings } from "../../shared/jsdo.settings";
import { Customer } from "../shared/customer.model";
import { CustomerService } from "../shared/customer.service";
import { progress } from "@progress/jsdo-core";

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
    scrollCount = 0;   // This keeps track of number of times user performed scrolling
    // This would allow us to calculate number of records loaded at client side
    _recCount: number;
    _skipRec: number;
    _pullToRefreshCount = 0;    // We use this to keep track of howmany times refresh performed

    private _isLoading: boolean = false;
    private _customers: ObservableArray<Customer> = new ObservableArray<Customer>([]);
    private timer;
    private isAndroid: boolean = isAndroid;
    private isIOS: boolean = isIOS;
    private _sideDrawerTransition: DrawerTransitionBase;

    constructor(
        private _customerService: CustomerService,
        private _routerExtensions: RouterExtensions,
        private _changeDetectionRef: ChangeDetectorRef
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

        this._fetchCustomers();
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
                            this._fetchCustomers();
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

    onSearchChange(args?: EventData) {
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
            this._fetchCustomers(params);
        }, SEARCH_DELAY);
    }

    onSearchBarLoaded(event) {
        if (event.object.android) {
            event.object.android.clearFocus();
        }
    }

    /**
     * This gets triggered when refresh (Pull down) operation is performed in the Listview
     * in mobile app. As part of this we perform a read() operation with same filter criteria
     * such that all records are fetched again from server
     * @param args - ListViewEventData
     */
    onPullToRefreshInitiated(args: ListViewEventData) {
        // console.log("In onPullToRefreshInitiated()");

        // Check for the value of ngModel's search value. If it is set then perform the read based on search criteria
        // If this not set, then read customer information from server via Data Service directly
        if (this.search === undefined) {
            // We want to use the same filter criteria while refreshing the listview
            const params = {
                filter: JsdoSettings.filter,
                sort: JsdoSettings.sort,
                top: JsdoSettings.pageSize,
                skip: ((JsdoSettings.pageNumber) - 1) * (JsdoSettings.pageSize)
                // mergeMode: JsdoSettings.mergeMode    // We dont need to use mergeMode in case of refreshing
                // In this scenario we want to fetch list based on original filter criteria only
            };

            if (this.timer) {
                clearTimeout(this.timer);
            }
            this.timer = setTimeout(() => {
                this._fetchCustomers(params);
                var listView = args.object;
                listView.notifyPullToRefreshFinished();
            }, 50);

        } else {
            this.onSearchChange();
        }

        this._pullToRefreshCount = this._pullToRefreshCount + 1;
        this._skipRec = 0; // Reset the skiplist once a refresh is performed
    }


    /**
     * Gets triggered when performing 'incremental scrolling' of data in the mobile screen.
     * This method is responsible for fetching more records from backend
     * @param args ListViewEventData
     */
    onLoadMoreItemsRequested(args: ListViewEventData) {
        // console.log("DEBUG: In onLoadMoreItemsRequested()");
        let customerListComponentRef = this;
        var that = new WeakRef(this);
        this.scrollCount = this.scrollCount + 1;

        // Build a params object which then can be passed to DataSource        
        const params = {
            filter: JsdoSettings.filter,
            sort: JsdoSettings.sort,
            top: JsdoSettings.pageSize,
            skip: ((JsdoSettings.pageNumber) - 1) * (JsdoSettings.pageSize),
            pageSize: JsdoSettings.pageSize,
            maxRecCount: JsdoSettings.maxRecCount,
            mergeMode: progress.data.JSDO.MODE_MERGE    // Default value is set to MODE_MERGE for 'Incremental Scrolling'
        };

        if (!this._skipRec) {
            this._skipRec = params.skip
        }

        // Let's modify/increment the skip value considering a read() hasbeen performed
        // by the Incremental Scrolling functionality. 
        params.skip = this._skipRec + params.pageSize;
        this._skipRec = params.skip;
        
        this._recCount = this._customers.length;
        
        // If max record count is available/specified in the settings or if the number of records loaded in client reaches to max count then send an alert
        if (params.maxRecCount && (((this.scrollCount) * (params.pageSize) == params.maxRecCount) && (this._recCount) == (params.maxRecCount))) {
            alert("Reached max size. Increase limit.");
        } else {

            var listView: RadListView = args.object;
            customerListComponentRef._customerService.load(params)
                .finally(() => {
                    customerListComponentRef._isLoading = false
                })
                .subscribe((customers: Array<Customer>) => {
                    customerListComponentRef._customers = new ObservableArray(customers);
                    customerListComponentRef._isLoading = false;
                    var listView = args.object;
                    listView.notifyLoadOnDemandFinished();
                }, (error) => {
                    // console.log("DEBUG, in onLoadMoreItemsRequested() Error section: " + error);
                    if (error && error.message) {
                        alert("Error: \n" + error.message);
                    } else {
                        alert("Error reading records - onLoadMoreItemsRequested() section");
                    }
                });
            args.returnValue = true;
            // listView.scrollToIndex(this._customers.length - params.pageSize);            
        }
    }
    /**
     * This function is responsible for fetching customers remotely via 
     * Progress Data Service
     * @param params - A parameter object which includes filtering and
     * sorting criteria
     */
    private _fetchCustomers(params?: any) {
        this._customerService.load(params)
            .finally(() => {
                this._isLoading = false
            })
            .subscribe((customers: Array<Customer>) => {
                this._customers = new ObservableArray(customers);
                this._isLoading = false;
            }, (error) => {
                console.log("In _fetchCustomers() Error section: " + error);
                if (error && error.message) {
                    alert("Error: \n" + error.message);
                } else {
                    alert("Error reading records.");
                }
            });
    }
}
