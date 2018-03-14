"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var observable_array_1 = require("data/observable-array");
var router_1 = require("nativescript-angular/router");
var platform_1 = require("platform");
var dialogs_1 = require("tns-core-modules/ui/dialogs");
var jsdo_settings_1 = require("../../shared/jsdo.settings");
var customer_service_1 = require("../shared/customer.service");
var progress_service_1 = require("../../shared/progress.service");
var SEARCH_DELAY = 300;
/* ***********************************************************
* This is the master list component in the master-detail structure.
* This component gets the data, passes it to the master view and displays it in a list.
* It also handles the navigation to the details page for each item.
*************************************************************/
var CustomerListComponent = (function () {
    function CustomerListComponent(_customerService, _routerExtensions, progressService) {
        this._customerService = _customerService;
        this._routerExtensions = _routerExtensions;
        this.progressService = progressService;
        this._isLoading = false;
        this._customers = new observable_array_1.ObservableArray([]);
        this._isNotAnonymous = (jsdo_settings_1.JsdoSettings.authenticationModel !== "Anonymous");
        this.isAndroid = platform_1.isAndroid;
        this.isIOS = platform_1.isIOS;
    }
    /* ***********************************************************
    * Use the "ngOnInit" handler to get the data and assign it to the
    * private property that holds it inside the component.
    *************************************************************/
    CustomerListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._isLoading = true;
        /* ***********************************************************
        * The data is retrieved remotely from a Progress Data Service.
        * The actual data retrieval code is wrapped in a data service.
        * Check out the service in customers/shared/customer.service.ts
        *************************************************************/
        this._customerService.load()
            .finally(function () { return _this._isLoading = false; })
            .subscribe(function (customers) {
            _this._customers = new observable_array_1.ObservableArray(customers);
            _this._isLoading = false;
        }, function (error) {
            console.log("DEBUG, in ngOnIOnit: " + error);
            if (error && error.message) {
                dialogs_1.alert("Error: \n" + error.message);
            }
            else {
                dialogs_1.alert("Error  reading records.");
            }
        });
    };
    Object.defineProperty(CustomerListComponent.prototype, "customers", {
        get: function () {
            return this._customers;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CustomerListComponent.prototype, "isLoading", {
        get: function () {
            return this._isLoading;
        },
        enumerable: true,
        configurable: true
    });
    CustomerListComponent.prototype.onLogout = function () {
        var _this = this;
        dialogs_1.confirm("Are you sure you want to log out?")
            .then(function (result) {
            if (result) {
                return _this.progressService.logout()
                    .then(function (result) {
                    _this._routerExtensions.navigate(["/login"], { clearHistory: true });
                });
            }
        });
    };
    CustomerListComponent.prototype.onAddButtonTap = function () {
        if (!this._customerService.hasEditSupport()) {
            dialogs_1.alert("Service does not provide Add functionality.");
        }
        else {
            this._routerExtensions.navigate(["/customers/customer-detail-edit", -1, true], {
                animated: true,
                transition: {
                    name: "slideTop",
                    duration: 200,
                    curve: "ease"
                }
            });
        }
    };
    /* ***********************************************************
    * Use the "itemTap" event handler of the <RadListView> to navigate to the
    * item details page. Retrieve a reference for the data item (the id) and pass it
    * to the item details page, so that it can identify which data item to display.
    * Learn more about navigating with a parameter in this documentation article:
    * http://docs.nativescript.org/angular/core-concepts/angular-navigation.html#passing-parameter
    *************************************************************/
    CustomerListComponent.prototype.onCustomerItemTap = function (args) {
        var tappedCustomerItem = args.view.bindingContext;
        this._routerExtensions.navigate(["/customers/customer-detail", tappedCustomerItem._id], {
            animated: true,
            transition: {
                curve: "ease",
                duration: 200,
                name: "slide"
            }
        });
    };
    CustomerListComponent.prototype.onSwipeCellStarted = function (args) {
        var swipeLimits = args.data.swipeLimits;
        var swipeView = args.object;
        var rightItem = swipeView.getViewById("delete-view");
        swipeLimits.right = rightItem.getMeasuredWidth();
        swipeLimits.threshold = rightItem.getMeasuredWidth() / 4;
    };
    CustomerListComponent.prototype.onRightSwipeClick = function (args) {
        var _this = this;
        // debugger;
        var customerItem = args.view.bindingContext;
        var customerName = customerItem.Name;
        var options = {
            cancelButtonText: "Cancel",
            message: "\"" + customerName + "\" will be deleted forever.",
            okButtonText: "Delete",
            title: "Delete"
        };
        dialogs_1.confirm(options)
            .then(function (result) {
            // result can be true/false
            if (result) {
                _this._customerService.delete(customerItem)
                    .then(function (result1) {
                    // Delete was successful, so we can accept the changes
                    _this._customerService.acceptChanges();
                    _this.ngOnInit();
                }, function (error) {
                    // Delete was not successful, so let's back out the deletion
                    _this._customerService.cancelChanges();
                    if (error && error.message) {
                        dialogs_1.alert({ title: "Error", message: error.message, okButtonText: "Ok" });
                    }
                    else {
                        dialogs_1.alert({ title: "Error", message: "Error deleting record.", okButtonText: "Ok" });
                    }
                }).catch(function (e) {
                    dialogs_1.alert({ title: "Error", message: e.message, okButtonText: "Ok" });
                });
            }
        }, function (error) {
            dialogs_1.alert({ title: "Error", message: "Error resolving deleted record.", okButtonText: "Ok" });
        }).catch(function (e) {
            dialogs_1.alert({ title: "Error", message: e.message, okButtonText: "Ok" });
        });
    };
    CustomerListComponent.prototype.onSearchChange = function (args) {
        var _this = this;
        var searchFilter = jsdo_settings_1.JsdoSettings.searchFilter;
        try {
            if (typeof (searchFilter) === "object") {
                searchFilter = JSON.parse(JSON.stringify(searchFilter).replace("$SEARCH", this.search));
            }
            else if (typeof (searchFilter) === "string") {
                searchFilter = searchFilter.replace("$SEARCH", this.search);
            }
            else {
                searchFilter = "";
            }
        }
        catch (e) {
            searchFilter = "";
        }
        var params = this.search.length === 0 ? {
            filter: jsdo_settings_1.JsdoSettings.filter,
            sort: jsdo_settings_1.JsdoSettings.sort
        } : {
            filter: searchFilter,
            sort: { field: "Name", dir: "asc" }
        };
        if (this.timer) {
            clearTimeout(this.timer);
        }
        this.timer = setTimeout(function () {
            _this._customerService.load(params)
                .finally(function () {
                _this._isLoading = false;
            })
                .subscribe(function (customers) {
                _this._customers = new observable_array_1.ObservableArray(customers);
                _this._isLoading = false;
            }, function (error) {
                if (error && error.message) {
                    dialogs_1.alert("Error: \n" + error.message);
                }
                else {
                    dialogs_1.alert("Error  reading records.");
                }
            });
        }, SEARCH_DELAY);
    };
    CustomerListComponent.prototype.onSearchBarLoaded = function (event) {
        if (event.object.android) {
            event.object.android.clearFocus();
        }
    };
    CustomerListComponent = __decorate([
        core_1.Component({
            selector: "CustomersList",
            moduleId: module.id,
            templateUrl: "./customer-list.component.html",
            styleUrls: ["./customer-list.component.scss"]
        }),
        __metadata("design:paramtypes", [customer_service_1.CustomerService,
            router_1.RouterExtensions,
            progress_service_1.ProgressService])
    ], CustomerListComponent);
    return CustomerListComponent;
}());
exports.CustomerListComponent = CustomerListComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tZXItbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjdXN0b21lci1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUNsRCwwREFBd0Q7QUFDeEQsc0RBQStEO0FBRy9ELHFDQUE0QztBQUc1Qyx1REFBNkQ7QUFDN0QsNERBQTBEO0FBRTFELCtEQUE2RDtBQUM3RCxrRUFBZ0U7QUFFaEUsSUFBTSxZQUFZLEdBQUcsR0FBRyxDQUFDO0FBRXpCOzs7OzhEQUk4RDtBQU85RDtJQVVJLCtCQUNZLGdCQUFpQyxFQUNqQyxpQkFBbUMsRUFDbkMsZUFBZ0M7UUFGaEMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFpQjtRQUNqQyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO1FBQ25DLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQVZwQyxlQUFVLEdBQVksS0FBSyxDQUFDO1FBQzVCLGVBQVUsR0FBOEIsSUFBSSxrQ0FBZSxDQUFXLEVBQUUsQ0FBQyxDQUFDO1FBRTFFLG9CQUFlLEdBQVksQ0FBQyw0QkFBWSxDQUFDLG1CQUFtQixLQUFLLFdBQVcsQ0FBQyxDQUFDO1FBQzlFLGNBQVMsR0FBWSxvQkFBUyxDQUFDO1FBQy9CLFVBQUssR0FBWSxnQkFBSyxDQUFDO0lBTy9CLENBQUM7SUFFRDs7O2tFQUc4RDtJQUM5RCx3Q0FBUSxHQUFSO1FBQUEsaUJBc0JDO1FBckJHLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1FBRXZCOzs7O3NFQUk4RDtRQUU5RCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFO2FBQ3ZCLE9BQU8sQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLEVBQXZCLENBQXVCLENBQUM7YUFDdEMsU0FBUyxDQUFDLFVBQUMsU0FBMEI7WUFDbEMsS0FBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLGtDQUFlLENBQUMsU0FBUyxDQUFD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QUMsT0FBTyxDQUFDLENBQUMsQ0FBQztvQkFDekIsZUFBSyxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ3ZDLENBQUM7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ0osZUFBSyxDQUFDLHlCQUF5QixDQUFDLENBQUM7Z0JBQ3JDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNYLENBQUMsRUFBRSxZQUFZLENBQUMsQ0FBQztJQUNyQixDQUFDO0lBRUQsaURBQWlCLEdBQWpCLFVBQWtCLEtBQUs7UUFDbkIsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ3RDLENBQUM7SUFDTCxDQUFDO0lBdE1RLHFCQUFxQjtRQU5qQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGVBQWU7WUFDekIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSxnQ0FBZ0M7WUFDN0MsU0FBUyxFQUFFLENBQUMsZ0NBQWdDLENBQUM7U0FDaEQsQ0FBQzt5Q0FZZ0Msa0NBQWU7WUFDZCx5QkFBZ0I7WUFDbEIsa0NBQWU7T0FibkMscUJBQXFCLENBdU1qQztJQUFELDRCQUFDO0NBQUEsQUF2TUQsSUF1TUM7QUF2TVksc0RBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlQXJyYXkgfSBmcm9tIFwiZGF0YS9vYnNlcnZhYmxlLWFycmF5XCI7XHJcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IExpc3RWaWV3RXZlbnREYXRhIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1wcm8tdWkvbGlzdHZpZXdcIjtcclxuXHJcbmltcG9ydCB7IGlzQW5kcm9pZCwgaXNJT1MgfSBmcm9tIFwicGxhdGZvcm1cIjtcclxuXHJcbmltcG9ydCB7IEV2ZW50RGF0YSwgVmlldyB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2NvcmUvdmlldy92aWV3XCI7XHJcbmltcG9ydCB7IGFsZXJ0LCBjb25maXJtIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvZGlhbG9nc1wiO1xyXG5pbXBvcnQgeyBKc2RvU2V0dGluZ3MgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL2pzZG8uc2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgQ3VzdG9tZXIgfSBmcm9tIFwiLi4vc2hhcmVkL2N1c3RvbWVyLm1vZGVsXCI7XHJcbmltcG9ydCB7IEN1c3RvbWVyU2VydmljZSB9IGZyb20gXCIuLi9zaGFyZWQvY3VzdG9tZXIuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBQcm9ncmVzc1NlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL3Byb2dyZXNzLnNlcnZpY2VcIjtcclxuXHJcbmNvbnN0IFNFQVJDSF9ERUxBWSA9IDMwMDtcclxuXHJcbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiogVGhpcyBpcyB0aGUgbWFzdGVyIGxpc3QgY29tcG9uZW50IGluIHRoZSBtYXN0ZXItZGV0YWlsIHN0cnVjdHVyZS5cclxuKiBUaGlzIGNvbXBvbmVudCBnZXRzIHRoZSBkYXRhLCBwYXNzZXMgaXQgdG8gdGhlIG1hc3RlciB2aWV3IGFuZCBkaXNwbGF5cyBpdCBpbiBhIGxpc3QuXHJcbiogSXQgYWxzbyBoYW5kbGVzIHRoZSBuYXZpZ2F0aW9uIHRvIHRoZSBkZXRhaWxzIHBhZ2UgZm9yIGVhY2ggaXRlbS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJDdXN0b21lcnNMaXN0XCIsXHJcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9jdXN0b21lci1saXN0LmNvbXBvbmVudC5odG1sXCIsXHJcbiAgICBzdHlsZVVybHM6IFtcIi4vY3VzdG9tZXItbGlzdC5jb21wb25lbnQuc2Nzc1wiXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQ3VzdG9tZXJMaXN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIHNlYXJjaDogc3RyaW5nO1xyXG5cclxuICAgIHByaXZhdGUgX2lzTG9hZGluZzogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBfY3VzdG9tZXJzOiBPYnNlcnZhYmxlQXJyYXk8Q3VzdG9tZXI+ID0gbmV3IE9ic2VydmFibGVBcnJheTxDdXN0b21lcj4oW10pO1xyXG4gICAgcHJpdmF0ZSB0aW1lcjtcclxuICAgIHByaXZhdGUgX2lzTm90QW5vbnltb3VzOiBib29sZWFuID0gKEpzZG9TZXR0aW5ncy5hdXRoZW50aWNhdGlvbk1vZGVsICE9PSBcIkFub255bW91c1wiKTtcclxuICAgIHByaXZhdGUgaXNBbmRyb2lkOiBib29sZWFuID0gaXNBbmRyb2lkO1xyXG4gICAgcHJpdmF0ZSBpc0lPUzogYm9vbGVhbiA9IGlzSU9TO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgX2N1c3RvbWVyU2VydmljZTogQ3VzdG9tZXJTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgX3JvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsXHJcbiAgICAgICAgcHJpdmF0ZSBwcm9ncmVzc1NlcnZpY2U6IFByb2dyZXNzU2VydmljZVxyXG4gICAgKSB7XHJcbiAgICB9XHJcblxyXG4gICAgLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAgICogVXNlIHRoZSBcIm5nT25Jbml0XCIgaGFuZGxlciB0byBnZXQgdGhlIGRhdGEgYW5kIGFzc2lnbiBpdCB0byB0aGVcclxuICAgICogcHJpdmF0ZSBwcm9wZXJ0eSB0aGF0IGhvbGRzIGl0IGluc2lkZSB0aGUgY29tcG9uZW50LiBcclxuICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9pc0xvYWRpbmcgPSB0cnVlO1xyXG5cclxuICAgICAgICAvKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gICAgICAgICogVGhlIGRhdGEgaXMgcmV0cmlldmVkIHJlbW90ZWx5IGZyb20gYSBQcm9ncmVzcyBEYXRhIFNlcnZpY2UuXHJcbiAgICAgICAgKiBUaGUgYWN0dWFsIGRhdGEgcmV0cmlldmFsIGNvZGUgaXMgd3JhcHBlZCBpbiBhIGRhdGEgc2VydmljZS5cclxuICAgICAgICAqIENoZWNrIG91dCB0aGUgc2VydmljZSBpbiBjdXN0b21lcnMvc2hhcmVkL2N1c3RvbWVyLnNlcnZpY2UudHNcclxuICAgICAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuICAgICAgICB0aGlzLl9jdXN0b21lclNlcnZpY2UubG9hZCgpXHJcbiAgICAgICAgICAgIC5maW5hbGx5KCgpID0+IHRoaXMuX2lzTG9hZGluZyA9IGZhbHNlKVxyXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChjdXN0b21lcnM6IEFycmF5PEN1c3RvbWVyPikgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fY3VzdG9tZXJzID0gbmV3IE9ic2VydmFibGVBcnJheShjdXN0b21lcnMpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5faXNMb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0sIChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJERUJVRywgaW4gbmdPbklPbml0OiBcIiArIGVycm9yKTtcclxuICAgICAgICAgICAgICAgIGlmIChlcnJvciAmJiBlcnJvci5tZXNzYWdlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCJFcnJvcjogXFxuXCIgKyBlcnJvci5tZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCJFcnJvciAgcmVhZGluZyByZWNvcmRzLlwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGN1c3RvbWVycygpOiBPYnNlcnZhYmxlQXJyYXk8Q3VzdG9tZXI+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY3VzdG9tZXJzO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBpc0xvYWRpbmcoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzTG9hZGluZztcclxuICAgIH1cclxuXHJcbiAgICBvbkxvZ291dCAoKTogdm9pZCB7XHJcbiAgICAgICAgY29uZmlybShcIkFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBsb2cgb3V0P1wiKVxyXG4gICAgICAgICAgICAudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvZ3Jlc3NTZXJ2aWNlLmxvZ291dCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL2xvZ2luXCJdLCB7IGNsZWFySGlzdG9yeTogdHJ1ZSB9KTsgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgb25BZGRCdXR0b25UYXAoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9jdXN0b21lclNlcnZpY2UuaGFzRWRpdFN1cHBvcnQoKSkge1xyXG4gICAgICAgICAgICBhbGVydChcIlNlcnZpY2UgZG9lcyBub3QgcHJvdmlkZSBBZGQgZnVuY3Rpb25hbGl0eS5cIik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLl9yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9jdXN0b21lcnMvY3VzdG9tZXItZGV0YWlsLWVkaXRcIiwgLTEsIHRydWVdLFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBhbmltYXRlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHRyYW5zaXRpb246IHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInNsaWRlVG9wXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDIwMCxcclxuICAgICAgICAgICAgICAgICAgICBjdXJ2ZTogXCJlYXNlXCJcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAgICAqIFVzZSB0aGUgXCJpdGVtVGFwXCIgZXZlbnQgaGFuZGxlciBvZiB0aGUgPFJhZExpc3RWaWV3PiB0byBuYXZpZ2F0ZSB0byB0aGVcclxuICAgICogaXRlbSBkZXRhaWxzIHBhZ2UuIFJldHJpZXZlIGEgcmVmZXJlbmNlIGZvciB0aGUgZGF0YSBpdGVtICh0aGUgaWQpIGFuZCBwYXNzIGl0XHJcbiAgICAqIHRvIHRoZSBpdGVtIGRldGFpbHMgcGFnZSwgc28gdGhhdCBpdCBjYW4gaWRlbnRpZnkgd2hpY2ggZGF0YSBpdGVtIHRvIGRpc3BsYXkuXHJcbiAgICAqIExlYXJuIG1vcmUgYWJvdXQgbmF2aWdhdGluZyB3aXRoIGEgcGFyYW1ldGVyIGluIHRoaXMgZG9jdW1lbnRhdGlvbiBhcnRpY2xlOlxyXG4gICAgKiBodHRwOi8vZG9jcy5uYXRpdmVzY3JpcHQub3JnL2FuZ3VsYXIvY29yZS1jb25jZXB0cy9hbmd1bGFyLW5hdmlnYXRpb24uaHRtbCNwYXNzaW5nLXBhcmFtZXRlclxyXG4gICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuICAgIG9uQ3VzdG9tZXJJdGVtVGFwKGFyZ3M6IExpc3RWaWV3RXZlbnREYXRhKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgdGFwcGVkQ3VzdG9tZXJJdGVtID0gYXJncy52aWV3LmJpbmRpbmdDb250ZXh0O1xyXG5cclxuICAgICAgICB0aGlzLl9yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9jdXN0b21lcnMvY3VzdG9tZXItZGV0YWlsXCIsIHRhcHBlZEN1c3RvbWVySXRlbS5faWRdLFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBhbmltYXRlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHRyYW5zaXRpb246IHtcclxuICAgICAgICAgICAgICAgICAgICBjdXJ2ZTogXCJlYXNlXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDIwMCxcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInNsaWRlXCJcclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIG9uU3dpcGVDZWxsU3RhcnRlZChhcmdzOiBMaXN0Vmlld0V2ZW50RGF0YSkge1xyXG4gICAgICAgIGNvbnN0IHN3aXBlTGltaXRzID0gYXJncy5kYXRhLnN3aXBlTGltaXRzO1xyXG4gICAgICAgIGNvbnN0IHN3aXBlVmlldyA9IGFyZ3Mub2JqZWN0O1xyXG4gICAgICAgIGNvbnN0IHJpZ2h0SXRlbSA9IHN3aXBlVmlldy5nZXRWaWV3QnlJZDxWaWV3PihcImRlbGV0ZS12aWV3XCIpO1xyXG4gICAgICAgIHN3aXBlTGltaXRzLnJpZ2h0ID0gcmlnaHRJdGVtLmdldE1lYXN1cmVkV2lkdGgoKTtcclxuICAgICAgICBzd2lwZUxpbWl0cy50aHJlc2hvbGQgPSByaWdodEl0ZW0uZ2V0TWVhc3VyZWRXaWR0aCgpIC8gNDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgb25SaWdodFN3aXBlQ2xpY2soYXJnczogTGlzdFZpZXdFdmVudERhdGEpIHtcclxuICAgICAgICAvLyBkZWJ1Z2dlcjtcclxuICAgICAgICBjb25zdCBjdXN0b21lckl0ZW0gPSBhcmdzLnZpZXcuYmluZGluZ0NvbnRleHQ7XHJcbiAgICAgICAgY29uc3QgY3VzdG9tZXJOYW1lID0gY3VzdG9tZXJJdGVtLk5hbWU7XHJcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgY2FuY2VsQnV0dG9uVGV4dDogXCJDYW5jZWxcIixcclxuICAgICAgICAgICAgbWVzc2FnZTogXCJcXFwiXCIgKyBjdXN0b21lck5hbWUgKyBcIlxcXCIgd2lsbCBiZSBkZWxldGVkIGZvcmV2ZXIuXCIsXHJcbiAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogXCJEZWxldGVcIixcclxuICAgICAgICAgICAgdGl0bGU6IFwiRGVsZXRlXCJcclxuXHJcbiAgICAgICAgfTtcclxuICAgICAgICBjb25maXJtKG9wdGlvbnMpXHJcbiAgICAgICAgICAgIC50aGVuKChyZXN1bHQ6IGJvb2xlYW4pID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIHJlc3VsdCBjYW4gYmUgdHJ1ZS9mYWxzZVxyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2N1c3RvbWVyU2VydmljZS5kZWxldGUoY3VzdG9tZXJJdGVtKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbigocmVzdWx0MSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gRGVsZXRlIHdhcyBzdWNjZXNzZnVsLCBzbyB3ZSBjYW4gYWNjZXB0IHRoZSBjaGFuZ2VzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jdXN0b21lclNlcnZpY2UuYWNjZXB0Q2hhbmdlcygpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uZ09uSW5pdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIERlbGV0ZSB3YXMgbm90IHN1Y2Nlc3NmdWwsIHNvIGxldCdzIGJhY2sgb3V0IHRoZSBkZWxldGlvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3VzdG9tZXJTZXJ2aWNlLmNhbmNlbENoYW5nZXMoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlcnJvciAmJiBlcnJvci5tZXNzYWdlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoeyB0aXRsZTogXCJFcnJvclwiLCBtZXNzYWdlOiBlcnJvci5tZXNzYWdlLCBva0J1dHRvblRleHQ6IFwiT2tcIiB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoeyB0aXRsZTogXCJFcnJvclwiLCBtZXNzYWdlOiBcIkVycm9yIGRlbGV0aW5nIHJlY29yZC5cIiwgb2tCdXR0b25UZXh0OiBcIk9rXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGVydCh7IHRpdGxlOiBcIkVycm9yXCIsIG1lc3NhZ2U6IGUubWVzc2FnZSwgb2tCdXR0b25UZXh0OiBcIk9rXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCAoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KHsgdGl0bGU6IFwiRXJyb3JcIiwgbWVzc2FnZTogXCJFcnJvciByZXNvbHZpbmcgZGVsZXRlZCByZWNvcmQuXCIsIG9rQnV0dG9uVGV4dDogXCJPa1wiIH0pO1xyXG4gICAgICAgICAgICB9KS5jYXRjaCgoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoeyB0aXRsZTogXCJFcnJvclwiLCBtZXNzYWdlOiBlLm1lc3NhZ2UsIG9rQnV0dG9uVGV4dDogXCJPa1wiIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBvblNlYXJjaENoYW5nZShhcmdzOiBFdmVudERhdGEpIHtcclxuICAgICAgICBsZXQgc2VhcmNoRmlsdGVyOiBhbnkgPSBKc2RvU2V0dGluZ3Muc2VhcmNoRmlsdGVyO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2Yoc2VhcmNoRmlsdGVyKSA9PT0gXCJvYmplY3RcIikge1xyXG4gICAgICAgICAgICAgICAgc2VhcmNoRmlsdGVyID0gSlNPTi5wYXJzZShcclxuICAgICAgICAgICAgICAgICAgICBKU09OLnN0cmluZ2lmeShzZWFyY2hGaWx0ZXIpLnJlcGxhY2UoXCIkU0VBUkNIXCIsIHRoaXMuc2VhcmNoKSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mKHNlYXJjaEZpbHRlcikgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgICAgIHNlYXJjaEZpbHRlciA9IHNlYXJjaEZpbHRlci5yZXBsYWNlKFwiJFNFQVJDSFwiLCB0aGlzLnNlYXJjaCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzZWFyY2hGaWx0ZXIgPSBcIlwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICBzZWFyY2hGaWx0ZXIgPSBcIlwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgcGFyYW1zID0gdGhpcy5zZWFyY2gubGVuZ3RoID09PSAwID8ge1xyXG4gICAgICAgICAgICBmaWx0ZXI6IEpzZG9TZXR0aW5ncy5maWx0ZXIsXHJcbiAgICAgICAgICAgIHNvcnQ6IEpzZG9TZXR0aW5ncy5zb3J0XHJcbiAgICAgICAgfSA6IHtcclxuICAgICAgICAgICAgICAgIGZpbHRlcjogc2VhcmNoRmlsdGVyLFxyXG4gICAgICAgICAgICAgICAgc29ydDogeyBmaWVsZDogXCJOYW1lXCIsIGRpcjogXCJhc2NcIiB9XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnRpbWVyKSB7XHJcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy50aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9jdXN0b21lclNlcnZpY2UubG9hZChwYXJhbXMpXHJcbiAgICAgICAgICAgICAgICAuZmluYWxseSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faXNMb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZSgoY3VzdG9tZXJzOiBBcnJheTxDdXN0b21lcj4pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jdXN0b21lcnMgPSBuZXcgT2JzZXJ2YWJsZUFycmF5KGN1c3RvbWVycyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faXNMb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9LCAoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IgJiYgZXJyb3IubWVzc2FnZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydChcIkVycm9yOiBcXG5cIiArIGVycm9yLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KFwiRXJyb3IgIHJlYWRpbmcgcmVjb3Jkcy5cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSwgU0VBUkNIX0RFTEFZKTtcclxuICAgIH1cclxuXHJcbiAgICBvblNlYXJjaEJhckxvYWRlZChldmVudCkge1xyXG4gICAgICAgIGlmIChldmVudC5vYmplY3QuYW5kcm9pZCkge1xyXG4gICAgICAgICAgICBldmVudC5vYmplY3QuYW5kcm9pZC5jbGVhckZvY3VzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==