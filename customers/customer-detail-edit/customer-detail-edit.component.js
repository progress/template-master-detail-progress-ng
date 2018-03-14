"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var dialogs_1 = require("ui/dialogs");
var customer_edit_service_1 = require("../shared/customer-edit.service");
var customer_model_1 = require("../shared/customer.model");
var customer_service_1 = require("../shared/customer.service");
var state_service_1 = require("../shared/state.service");
/* ***********************************************************
* This is the item detail edit component.
* This component gets the selected data item, provides options to edit the item and saves the changes.
*************************************************************/
var CustomerDetailEditComponent = (function () {
    function CustomerDetailEditComponent(_customerService, _customerEditService, _pageRoute, _routerExtensions, _stateService) {
        this._customerService = _customerService;
        this._customerEditService = _customerEditService;
        this._pageRoute = _pageRoute;
        this._routerExtensions = _routerExtensions;
        this._stateService = _stateService;
        this._customer = new customer_model_1.Customer({});
        this._isBusy = false;
        this._stateNameList = [];
        this._stateList = [];
        this._addMode = false;
        this._stateIndexValue = 0;
    }
    /* ***********************************************************
    * Use the "ngOnInit" handler to get the data item id parameter passed through navigation.
    * Get the data item details from the data service using this id and assign it to the
    * private property that holds it inside the component.
    *************************************************************/
    CustomerDetailEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.initializeEditOptions();
        /* ***********************************************************
        * Learn more about how to get navigation parameters in this documentation article:
        * http://docs.nativescript.org/angular/core-concepts/angular-navigation.html#passing-parameter
        *************************************************************/
        this._pageRoute.activatedRoute
            .switchMap(function (activatedRoute) { return activatedRoute.params; })
            .forEach(function (params) {
            var customerId = params.id;
            _this._addMode = (params.addMode === "true" ? true : false);
            _this.editDetailTitle = ((_this._addMode === true) ? "Create Customer" : "Edit Details");
            // Note: startCreate() will create record client-side. This allows us to retreive initial values
            _this._customer = ((_this._addMode === true) ? _this._customerEditService.startCreate()
                : _this._customerEditService.startEdit(customerId));
            var stateIndex = _this._stateList.indexOf(_this._customer.State);
            _this.stateIndexValue = (stateIndex >= 0) ? stateIndex : 0;
        });
    };
    Object.defineProperty(CustomerDetailEditComponent.prototype, "isBusy", {
        get: function () {
            return this._isBusy;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CustomerDetailEditComponent.prototype, "editDetailTitle", {
        get: function () {
            return this._editDetailTitle;
        },
        set: function (value) {
            this._editDetailTitle = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CustomerDetailEditComponent.prototype, "customer", {
        get: function () {
            return this._customer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CustomerDetailEditComponent.prototype, "stateNames", {
        get: function () {
            if (this._stateNameList.length > 0) {
                return this._stateNameList;
            }
            else {
                return null;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CustomerDetailEditComponent.prototype, "stateIndexValue", {
        get: function () {
            return this._stateIndexValue;
        },
        set: function (value) {
            this._stateIndexValue = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CustomerDetailEditComponent.prototype, "creditLimitValue", {
        get: function () {
            return this._customer.CreditLimit;
        },
        set: function (value) {
            // force iOS UISlider to work with discrete steps
            this._customer.CreditLimit = Math.round(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CustomerDetailEditComponent.prototype, "toggleAdd", {
        get: function () {
            if (!this._addMode) {
                return "item-list-even text-red";
            }
            else {
                return " item-list-hidden text-white";
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CustomerDetailEditComponent.prototype, "toggleOdd", {
        get: function () {
            if (!this._addMode) {
                return "item-list-odd";
            }
            else {
                return " item-list-hidden";
            }
        },
        enumerable: true,
        configurable: true
    });
    /* ***********************************************************
     * The edit cancel button navigates back to:
     *  - the item details page for an edit
     *  - the list page for a create
    *************************************************************/
    CustomerDetailEditComponent.prototype.onCancelButtonTap = function () {
        if (this._addMode) {
            // Remove newly created record from client memory
            this._customerService.cancelChanges();
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
        else {
            this._routerExtensions.backToPreviousPage();
        }
    };
    /* ***********************************************************
     * The edit done button uses the data service to save the updated values
     * of the data item details. An existing record is being updated, or
     * a new record will be added.
     * Check out the data service as customers/shared/customer.service.ts
     *************************************************************/
    CustomerDetailEditComponent.prototype.onDoneButtonTap = function () {
        var _this = this;
        this._isBusy = true;
        // Update service with changes
        this._customerService.update(this._customer)
            .then(function (result) {
            _this.successOnDone(result);
        })
            .catch(function (error) {
            _this.failureOnDone(error);
        });
    };
    CustomerDetailEditComponent.prototype.successOnDone = function (result) {
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
    };
    CustomerDetailEditComponent.prototype.failureOnDone = function (error) {
        var errorMessage = ((error && error.message) ? error.message : "Unknown Error when changes sent to server");
        this._isBusy = false;
        dialogs_1.alert({ title: "Error", message: errorMessage, okButtonText: "Ok" });
    };
    CustomerDetailEditComponent.prototype.selectedIndexChanged = function (args) {
        var picker = args.object;
        // List is displayed with State.StateNames, but Customer.State maps to State.State property
        this._customer.State = this._stateList[picker.selectedIndex];
    };
    CustomerDetailEditComponent.prototype.onDeleteButtonTap = function () {
        var _this = this;
        if (!this._addMode) {
            var customerItem_1 = this._customer;
            var customerName = customerItem_1.Name;
            var options = {
                title: "Delete",
                message: "\"" + customerName + "\" will be deleted forever.",
                okButtonText: "Delete",
                cancelButtonText: "Cancel"
            };
            dialogs_1.confirm(options)
                .then(function (result) {
                // result can be true/false
                if (result) {
                    _this._isBusy = true;
                    _this._customerService.delete(customerItem_1)
                        .then(function (result1) {
                        _this._customerService.acceptChanges();
                        _this._isBusy = false;
                        _this._routerExtensions.navigate(["/customers"], {
                            clearHistory: true,
                            animated: true,
                            transition: {
                                name: "slideBottom",
                                duration: 200,
                                curve: "ease"
                            }
                        });
                    }, function (error) {
                        _this._customerService.cancelChanges();
                        _this._isBusy = false;
                        if (error && error.message) {
                            dialogs_1.alert({ title: "Error", message: error.message, okButtonText: "Ok" });
                        }
                        else {
                            dialogs_1.alert({
                                title: "Error", message: "Error deleting record.",
                                okButtonText: "Ok"
                            });
                        }
                    }).catch(function (e) {
                        dialogs_1.alert({ title: "Error", message: e.message, okButtonText: "Ok" });
                        _this._isBusy = false;
                    });
                }
            }, function (error) {
                _this._isBusy = false;
                dialogs_1.alert({ title: "Error", message: "Error resolving deleted record.", okButtonText: "Ok" });
            }).catch(function (e) {
                _this._isBusy = false;
                dialogs_1.alert({ title: "Error", message: e.message, okButtonText: "Ok" });
            });
        }
    };
    CustomerDetailEditComponent.prototype.initializeEditOptions = function () {
        var _this = this;
        // Get state data to be used by State ListPicker
        this._stateService.load()
            .finally(function () {
            _this._isBusy = false;
        })
            .subscribe(function (stateRecords) {
            for (var _i = 0, stateRecords_1 = stateRecords; _i < stateRecords_1.length; _i++) {
                var state = stateRecords_1[_i];
                _this._stateNameList.push(state.StateName);
                _this._stateList.push(state.State);
            }
            // Want to initialize ListPicker to current customer's state
            var stateIndex = _this._stateList.indexOf(_this._customer.State);
            _this.stateIndexValue = (stateIndex >= 0) ? stateIndex : 0;
        }, function (error) {
            console.log("Error: " + error.message);
        });
    };
    CustomerDetailEditComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "CustomerDetailEdit",
            templateUrl: "./customer-detail-edit.component.html",
            styleUrls: ["./customer-detail-edit.component.scss"]
        }),
        __metadata("design:paramtypes", [customer_service_1.CustomerService,
            customer_edit_service_1.CustomerEditService,
            router_1.PageRoute,
            router_1.RouterExtensions,
            state_service_1.StateService])
    ], CustomerDetailEditComponent);
    return CustomerDetailEditComponent;
}());
exports.CustomerDetailEditComponent = CustomerDetailEditComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tZXItZGV0YWlsLWVkaXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY3VzdG9tZXItZGV0YWlsLWVkaXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBRWxELHNEQUEwRTtBQUMxRSxzQ0FBNEM7QUFHNUMseUVBQXNFO0FBQ3RFLDJEQUFvRDtBQUNwRCwrREFBNkQ7QUFFN0QseURBQXVEO0FBRXZEOzs7OERBRzhEO0FBTzlEO0lBU0kscUNBQ1ksZ0JBQWlDLEVBQ2pDLG9CQUF5QyxFQUN6QyxVQUFxQixFQUNyQixpQkFBbUMsRUFDbkMsYUFBMkI7UUFKM0IscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFpQjtRQUNqQyx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXFCO1FBQ3pDLGVBQVUsR0FBVixVQUFVLENBQVc7UUFDckIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUNuQyxrQkFBYSxHQUFiLGFBQWEsQ0FBYztRQWIvQixjQUFTLEdBQWEsSUFBSSx5QkFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZDLFlBQU8sR0FBWSxLQUFLLENBQUM7UUFDekIsbUJBQWMsR0FBa0IsRUFBRSxDQUFDO1FBQ25DLGVBQVUsR0FBa0IsRUFBRSxDQUFDO1FBQy9CLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFDMUIscUJBQWdCLEdBQVcsQ0FBQyxDQUFDO0lBU2pDLENBQUM7SUFFTDs7OztrRUFJOEQ7SUFDOUQsOENBQVEsR0FBUjtRQUFBLGlCQW9CQztRQW5CRyxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUU3Qjs7O3NFQUc4RDtRQUM5RCxJQUFJLENBQUMsVUFBVSxDQUFDLGNBQWM7YUFDekIsU0FBUyxDQUFDLFVBQUMsY0FBYyxJQUFLLE9BQUEsY0FBYyxDQUFDLE1BQU0sRUFBckIsQ0FBcUIsQ0FBQzthQUNwRCxPQUFPLENBQUMsVUFBQyxNQUFNO1lBQ1osSUFBTSxVQUFVLEdB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QkFDWixLQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQzFDLEtBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUN6QztZQUVHLDREQUE0RDtZQUM1RCxJQUFNLFVBQVUsR0FBRyxLQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxLQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2pFLEtBQUksQ0FBQyxlQUFlLEdBQUcsQ0FBQyxVQUFVLElBQUksQ0FBQyxDQUFDLEdBQUcsVUFBVSxHQUFHLENBQUMsQ0FBQztRQUM5RCxDQUFDLEVBQUUsVUFBQyxLQUFLO1lBQ0wsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzNDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQXpPUSwyQkFBMkI7UUFOdkMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsb0JBQW9CO1lBQzlCLFdBQVcsRUFBRSx1Q0FBdUM7WUFDcEQsU0FBUyxFQUFFLENBQUMsdUNBQXVDLENBQUM7U0FDdkQsQ0FBQzt5Q0FXZ0Msa0NBQWU7WUFDWCwyQ0FBbUI7WUFDN0Isa0JBQVM7WUFDRix5QkFBZ0I7WUFDcEIsNEJBQVk7T0FkOUIsMkJBQTJCLENBME92QztJQUFELGtDQUFDO0NBQUEsQUExT0QsSUEwT0M7QUExT1ksa0VBQTJCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlQXJyYXkgfSBmcm9tIFwiZGF0YS9vYnNlcnZhYmxlLWFycmF5XCI7XHJcbmltcG9ydCB7IFBhZ2VSb3V0ZSwgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgYWxlcnQsIGNvbmZpcm0gfSBmcm9tIFwidWkvZGlhbG9nc1wiO1xyXG5pbXBvcnQgeyBMaXN0UGlja2VyIH0gZnJvbSBcInVpL2xpc3QtcGlja2VyXCI7XHJcblxyXG5pbXBvcnQgeyBDdXN0b21lckVkaXRTZXJ2aWNlIH0gZnJvbSBcIi4uL3NoYXJlZC9jdXN0b21lci1lZGl0LnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgQ3VzdG9tZXIgfSBmcm9tIFwiLi4vc2hhcmVkL2N1c3RvbWVyLm1vZGVsXCI7XHJcbmltcG9ydCB7IEN1c3RvbWVyU2VydmljZSB9IGZyb20gXCIuLi9zaGFyZWQvY3VzdG9tZXIuc2VydmljZVwiO1xyXG5pbXBvcnQgeyBTdGF0ZSB9IGZyb20gXCIuLi9zaGFyZWQvc3RhdGUubW9kZWxcIjtcclxuaW1wb3J0IHsgU3RhdGVTZXJ2aWNlIH0gZnJvbSBcIi4uL3NoYXJlZC9zdGF0ZS5zZXJ2aWNlXCI7XHJcblxyXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4qIFRoaXMgaXMgdGhlIGl0ZW0gZGV0YWlsIGVkaXQgY29tcG9uZW50LlxyXG4qIFRoaXMgY29tcG9uZW50IGdldHMgdGhlIHNlbGVjdGVkIGRhdGEgaXRlbSwgcHJvdmlkZXMgb3B0aW9ucyB0byBlZGl0IHRoZSBpdGVtIGFuZCBzYXZlcyB0aGUgY2hhbmdlcy5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuQENvbXBvbmVudCh7XHJcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgc2VsZWN0b3I6IFwiQ3VzdG9tZXJEZXRhaWxFZGl0XCIsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2N1c3RvbWVyLWRldGFpbC1lZGl0LmNvbXBvbmVudC5odG1sXCIsXHJcbiAgICBzdHlsZVVybHM6IFtcIi4vY3VzdG9tZXItZGV0YWlsLWVkaXQuY29tcG9uZW50LnNjc3NcIl1cclxufSlcclxuZXhwb3J0IGNsYXNzIEN1c3RvbWVyRGV0YWlsRWRpdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICBwcml2YXRlIF9jdXN0b21lcjogQ3VzdG9tZXIgPSBuZXcgQ3VzdG9tZXIoe30pO1xyXG4gICAgcHJpdmF0ZSBfaXNCdXN5OiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIF9zdGF0ZU5hbWVMaXN0OiBBcnJheTxzdHJpbmc+ID0gW107XHJcbiAgICBwcml2YXRlIF9zdGF0ZUxpc3Q6IEFycmF5PHN0cmluZz4gPSBbXTtcclxuICAgIHByaXZhdGUgX2FkZE1vZGU6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHByaXZhdGUgX3N0YXRlSW5kZXhWYWx1ZTogbnVtYmVyID0gMDtcclxuICAgIHByaXZhdGUgX2VkaXREZXRhaWxUaXRsZTogc3RyaW5nO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgX2N1c3RvbWVyU2VydmljZTogQ3VzdG9tZXJTZXJ2aWNlLFxyXG4gICAgICAgIHByaXZhdGUgX2N1c3RvbWVyRWRpdFNlcnZpY2U6IEN1c3RvbWVyRWRpdFNlcnZpY2UsXHJcbiAgICAgICAgcHJpdmF0ZSBfcGFnZVJvdXRlOiBQYWdlUm91dGUsXHJcbiAgICAgICAgcHJpdmF0ZSBfcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucyxcclxuICAgICAgICBwcml2YXRlIF9zdGF0ZVNlcnZpY2U6IFN0YXRlU2VydmljZVxyXG4gICAgKSB7IH1cclxuXHJcbiAgICAvKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gICAgKiBVc2UgdGhlIFwibmdPbkluaXRcIiBoYW5kbGVyIHRvIGdldCB0aGUgZGF0YSBpdGVtIGlkIHBhcmFtZXRlciBwYXNzZWQgdGhyb3VnaCBuYXZpZ2F0aW9uLlxyXG4gICAgKiBHZXQgdGhlIGRhdGEgaXRlbSBkZXRhaWxzIGZyb20gdGhlIGRhdGEgc2VydmljZSB1c2luZyB0aGlzIGlkIGFuZCBhc3NpZ24gaXQgdG8gdGhlXHJcbiAgICAqIHByaXZhdGUgcHJvcGVydHkgdGhhdCBob2xkcyBpdCBpbnNpZGUgdGhlIGNvbXBvbmVudC5cclxuICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmluaXRpYWxpemVFZGl0T3B0aW9ucygpO1xyXG5cclxuICAgICAgICAvKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gICAgICAgICogTGVhcm4gbW9yZSBhYm91dCBob3cgdG8gZ2V0IG5hdmlnYXRpb24gcGFyYW1ldGVycyBpbiB0aGlzIGRvY3VtZW50YXRpb24gYXJ0aWNsZTpcclxuICAgICAgICAqIGh0dHA6Ly9kb2NzLm5hdGl2ZXNjcmlwdC5vcmcvYW5ndWxhci9jb3JlLWNvbmNlcHRzL2FuZ3VsYXItbmF2aWdhdGlvbi5odG1sI3Bhc3NpbmctcGFyYW1ldGVyXHJcbiAgICAgICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuICAgICAgICB0aGlzLl9wYWdlUm91dGUuYWN0aXZhdGVkUm91dGVcclxuICAgICAgICAgICAgLnN3aXRjaE1hcCgoYWN0aXZhdGVkUm91dGUpID0+IGFjdGl2YXRlZFJvdXRlLnBhcmFtcylcclxuICAgICAgICAgICAgLmZvckVhY2goKHBhcmFtcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY3VzdG9tZXJJZCA9IHBhcmFtcy5pZDtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2FkZE1vZGUgPSAocGFyYW1zLmFkZE1vZGUgPT09IFwidHJ1ZVwiID8gdHJ1ZSA6IGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZWRpdERldGFpbFRpdGxlID0gKCh0aGlzLl9hZGRNb2RlID09PSB0cnVlKSA/IFwiQ3JlYXRlIEN1c3RvbWVyXCIgOiBcIkVkaXQgRGV0YWlsc1wiKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBOb3RlOiBzdGFydENyZWF0ZSgpIHdpbGwgY3JlYXRlIHJlY29yZCBjbGllbnQtc2lkZS4gVGhpcyBhbGxvd3MgdXMgdG8gcmV0cmVpdmUgaW5pdGlhbCB2YWx1ZXNcclxuICAgICAgICAgICAgICAgIHRoaXMuX2N1c3RvbWVyID0gKCh0aGlzLl9hZGRNb2RlID09PSB0cnVlKSA/IHRoaXMuX2N1c3RvbWVyRWRpdFNlcnZpY2Uuc3RhcnRDcmVhdGUoKVxyXG4gICAgICAgICAgICAgICAgICAgIDogdGhpcy5fY3VzdG9tZXJFZGl0U2VydmljZS5zdGFydEVkaXQoY3VzdG9tZXJJZCkpO1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc3RhdGVJbmRleCA9IHRoaXMuX3N0YXRlTGlzdC5pbmRleE9mKHRoaXMuX2N1c3RvbWVyLlN0YXRlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGVJbmRleFZhbHVlID0gKHN0YXRlSW5kZXggPj0gMCkgPyBzdGF0ZUluZGV4IDogMDtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGlzQnVzeSgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faXNCdXN5O1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBlZGl0RGV0YWlsVGl0bGUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZWRpdERldGFpbFRpdGxlO1xyXG4gICAgfVxyXG4gICAgc2V0IGVkaXREZXRhaWxUaXRsZSh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5fZWRpdERldGFpbFRpdGxlID0gdmFsdWU7XHJcbiAgICB9XHJcbiAgICBnZXQgY3VzdG9tZXIoKTogQ3VzdG9tZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jdXN0b21lcjtcclxuICAgIH1cclxuICAgIGdldCBzdGF0ZU5hbWVzKCk6IEFycmF5PHN0cmluZz4ge1xyXG4gICAgICAgIGlmICh0aGlzLl9zdGF0ZU5hbWVMaXN0Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3N0YXRlTmFtZUxpc3Q7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZ2V0IHN0YXRlSW5kZXhWYWx1ZSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zdGF0ZUluZGV4VmFsdWU7XHJcbiAgICB9XHJcbiAgICBzZXQgc3RhdGVJbmRleFZhbHVlKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl9zdGF0ZUluZGV4VmFsdWUgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgY3JlZGl0TGltaXRWYWx1ZSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jdXN0b21lci5DcmVkaXRMaW1pdDtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgY3JlZGl0TGltaXRWYWx1ZSh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgLy8gZm9yY2UgaU9TIFVJU2xpZGVyIHRvIHdvcmsgd2l0aCBkaXNjcmV0ZSBzdGVwc1xyXG4gICAgICAgIHRoaXMuX2N1c3RvbWVyLkNyZWRpdExpbWl0ID0gTWF0aC5yb3VuZCh2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHRvZ2dsZUFkZCgpOiBzdHJpbmcge1xyXG4gICAgICAgIGlmICghdGhpcy5fYWRkTW9kZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gXCJpdGVtLWxpc3QtZXZlbiB0ZXh0LXJlZFwiO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBcIiBpdGVtLWxpc3QtaGlkZGVuIHRleHQtd2hpdGVcIjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBnZXQgdG9nZ2xlT2RkKCk6IHN0cmluZyB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9hZGRNb2RlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBcIml0ZW0tbGlzdC1vZGRcIjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gXCIgaXRlbS1saXN0LWhpZGRlblwiO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAgICAgKiBUaGUgZWRpdCBjYW5jZWwgYnV0dG9uIG5hdmlnYXRlcyBiYWNrIHRvOlxyXG4gICAgICogIC0gdGhlIGl0ZW0gZGV0YWlscyBwYWdlIGZvciBhbiBlZGl0XHJcbiAgICAgKiAgLSB0aGUgbGlzdCBwYWdlIGZvciBhIGNyZWF0ZVxyXG4gICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuICAgIG9uQ2FuY2VsQnV0dG9uVGFwKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLl9hZGRNb2RlKSB7XHJcbiAgICAgICAgICAgIC8vIFJlbW92ZSBuZXdseSBjcmVhdGVkIHJlY29yZCBmcm9tIGNsaWVudCBtZW1vcnlcclxuICAgICAgICAgICAgdGhpcy5fY3VzdG9tZXJTZXJ2aWNlLmNhbmNlbENoYW5nZXMoKTtcclxuICAgICAgICAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvY3VzdG9tZXJzXCJdLCB7XHJcbiAgICAgICAgICAgICAgICBjbGVhckhpc3Rvcnk6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBhbmltYXRlZDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHRyYW5zaXRpb246IHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInNsaWRlQm90dG9tXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDIwMCxcclxuICAgICAgICAgICAgICAgICAgICBjdXJ2ZTogXCJlYXNlXCJcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5iYWNrVG9QcmV2aW91c1BhZ2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gICAgICogVGhlIGVkaXQgZG9uZSBidXR0b24gdXNlcyB0aGUgZGF0YSBzZXJ2aWNlIHRvIHNhdmUgdGhlIHVwZGF0ZWQgdmFsdWVzXHJcbiAgICAgKiBvZiB0aGUgZGF0YSBpdGVtIGRldGFpbHMuIEFuIGV4aXN0aW5nIHJlY29yZCBpcyBiZWluZyB1cGRhdGVkLCBvclxyXG4gICAgICogYSBuZXcgcmVjb3JkIHdpbGwgYmUgYWRkZWQuXHJcbiAgICAgKiBDaGVjayBvdXQgdGhlIGRhdGEgc2VydmljZSBhcyBjdXN0b21lcnMvc2hhcmVkL2N1c3RvbWVyLnNlcnZpY2UudHNcclxuICAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG4gICAgb25Eb25lQnV0dG9uVGFwKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2lzQnVzeSA9IHRydWU7XHJcbiAgICAgICAgLy8gVXBkYXRlIHNlcnZpY2Ugd2l0aCBjaGFuZ2VzXHJcbiAgICAgICAgdGhpcy5fY3VzdG9tZXJTZXJ2aWNlLnVwZGF0ZSh0aGlzLl9jdXN0b21lcilcclxuICAgICAgICAgICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdWNjZXNzT25Eb25lKHJlc3VsdCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZmFpbHVyZU9uRG9uZShlcnJvcik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgc3VjY2Vzc09uRG9uZShyZXN1bHQpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9pc0J1c3kgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9jdXN0b21lclNlcnZpY2UuYWNjZXB0Q2hhbmdlcygpO1xyXG5cclxuICAgICAgICB0aGlzLl9yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtcIi9jdXN0b21lcnNcIl0sIHtcclxuICAgICAgICAgICAgY2xlYXJIaXN0b3J5OiB0cnVlLFxyXG4gICAgICAgICAgICBhbmltYXRlZDogdHJ1ZSxcclxuICAgICAgICAgICAgdHJhbnNpdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgbmFtZTogXCJzbGlkZUJvdHRvbVwiLFxyXG4gICAgICAgICAgICAgICAgZHVyYXRpb246IDIwMCxcclxuICAgICAgICAgICAgICAgIGN1cnZlOiBcImVhc2VcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZmFpbHVyZU9uRG9uZShlcnJvcik6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IGVycm9yTWVzc2FnZSA9ICgoZXJyb3IgJiYgZXJyb3IubWVzc2FnZSkgPyBlcnJvci5tZXNzYWdlIDogXCJVbmtub3duIEVycm9yIHdoZW4gY2hhbmdlcyBzZW50IHRvIHNlcnZlclwiKTtcclxuICAgICAgICB0aGlzLl9pc0J1c3kgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgYWxlcnQoeyB0aXRsZTogXCJFcnJvclwiLCBtZXNzYWdlOiBlcnJvck1lc3NhZ2UsIG9rQnV0dG9uVGV4dDogXCJPa1wiIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHNlbGVjdGVkSW5kZXhDaGFuZ2VkKGFyZ3MpIHtcclxuICAgICAgICBjb25zdCBwaWNrZXIgPSA8TGlzdFBpY2tlcj5hcmdzLm9iamVjdDtcclxuXHJcbiAgICAgICAgLy8gTGlzdCBpcyBkaXNwbGF5ZWQgd2l0aCBTdGF0ZS5TdGF0ZU5hbWVzLCBidXQgQ3VzdG9tZXIuU3RhdGUgbWFwcyB0byBTdGF0ZS5TdGF0ZSBwcm9wZXJ0eVxyXG4gICAgICAgIHRoaXMuX2N1c3RvbWVyLlN0YXRlID0gdGhpcy5fc3RhdGVMaXN0W3BpY2tlci5zZWxlY3RlZEluZGV4XTtcclxuICAgIH1cclxuICAgIG9uRGVsZXRlQnV0dG9uVGFwKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICghdGhpcy5fYWRkTW9kZSkge1xyXG4gICAgICAgICAgICBjb25zdCBjdXN0b21lckl0ZW0gPSB0aGlzLl9jdXN0b21lcjtcclxuICAgICAgICAgICAgY29uc3QgY3VzdG9tZXJOYW1lID0gY3VzdG9tZXJJdGVtLk5hbWU7XHJcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogXCJEZWxldGVcIixcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiXFxcIlwiICsgY3VzdG9tZXJOYW1lICsgXCJcXFwiIHdpbGwgYmUgZGVsZXRlZCBmb3JldmVyLlwiLFxyXG4gICAgICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIkRlbGV0ZVwiLFxyXG4gICAgICAgICAgICAgICAgY2FuY2VsQnV0dG9uVGV4dDogXCJDYW5jZWxcIlxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBjb25maXJtKG9wdGlvbnMpXHJcbiAgICAgICAgICAgICAgICAudGhlbigocmVzdWx0OiBib29sZWFuKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gcmVzdWx0IGNhbiBiZSB0cnVlL2ZhbHNlXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9pc0J1c3kgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3VzdG9tZXJTZXJ2aWNlLmRlbGV0ZShjdXN0b21lckl0ZW0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbigocmVzdWx0MSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2N1c3RvbWVyU2VydmljZS5hY2NlcHRDaGFuZ2VzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5faXNCdXN5ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fcm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCIvY3VzdG9tZXJzXCJdLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFySGlzdG9yeTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZWQ6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zaXRpb246IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic2xpZGVCb3R0b21cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAyMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJ2ZTogXCJlYXNlXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY3VzdG9tZXJTZXJ2aWNlLmNhbmNlbENoYW5nZXMoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9pc0J1c3kgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IgJiYgZXJyb3IubWVzc2FnZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGVydCh7IHRpdGxlOiBcIkVycm9yXCIsIG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2UsIG9rQnV0dG9uVGV4dDogXCJPa1wiIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIkVycm9yXCIsIG1lc3NhZ2U6IFwiRXJyb3IgZGVsZXRpbmcgcmVjb3JkLlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIk9rXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goKGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGVydCh7IHRpdGxlOiBcIkVycm9yXCIsIG1lc3NhZ2U6IGUubWVzc2FnZSwgb2tCdXR0b25UZXh0OiBcIk9rXCIgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5faXNCdXN5ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LCAoZXJyb3IpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9pc0J1c3kgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBhbGVydCh7IHRpdGxlOiBcIkVycm9yXCIsIG1lc3NhZ2U6IFwiRXJyb3IgcmVzb2x2aW5nIGRlbGV0ZWQgcmVjb3JkLlwiLCBva0J1dHRvblRleHQ6IFwiT2tcIiB9KTtcclxuICAgICAgICAgICAgICAgIH0pLmNhdGNoKChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faXNCdXN5ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoeyB0aXRsZTogXCJFcnJvclwiLCBtZXNzYWdlOiBlLm1lc3NhZ2UsIG9rQnV0dG9uVGV4dDogXCJPa1wiIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBpbml0aWFsaXplRWRpdE9wdGlvbnMoKTogdm9pZCB7XHJcbiAgICAgICAgLy8gR2V0IHN0YXRlIGRhdGEgdG8gYmUgdXNlZCBieSBTdGF0ZSBMaXN0UGlja2VyXHJcbiAgICAgICAgdGhpcy5fc3RhdGVTZXJ2aWNlLmxvYWQoKVxyXG4gICAgICAgIC5maW5hbGx5KCgpID0+ICB7XHJcbiAgICAgICAgICAgIHRoaXMuX2lzQnVzeSA9IGZhbHNlO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnN1YnNjcmliZSgoc3RhdGVSZWNvcmRzOiBBcnJheTxTdGF0ZT4pID0+IHtcclxuICAgICAgICAgICAgZm9yIChjb25zdCBzdGF0ZSBvZiBzdGF0ZVJlY29yZHMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3N0YXRlTmFtZUxpc3QucHVzaChzdGF0ZS5TdGF0ZU5hbWUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc3RhdGVMaXN0LnB1c2goc3RhdGUuU3RhdGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIFdhbnQgdG8gaW5pdGlhbGl6ZSBMaXN0UGlja2VyIHRvIGN1cnJlbnQgY3VzdG9tZXIncyBzdGF0ZVxyXG4gICAgICAgICAgICBjb25zdCBzdGF0ZUluZGV4ID0gdGhpcy5fc3RhdGVMaXN0LmluZGV4T2YodGhpcy5fY3VzdG9tZXIuU3RhdGUpO1xyXG4gICAgICAgICAgICB0aGlzLnN0YXRlSW5kZXhWYWx1ZSA9IChzdGF0ZUluZGV4ID49IDApID8gc3RhdGVJbmRleCA6IDA7XHJcbiAgICAgICAgfSwgKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3I6IFwiICsgZXJyb3IubWVzc2FnZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuIl19