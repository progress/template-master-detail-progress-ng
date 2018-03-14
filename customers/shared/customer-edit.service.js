"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var customer_service_1 = require("./customer.service");
var CustomerEditService = (function () {
    function CustomerEditService(_customerService) {
        this._customerService = _customerService;
    }
    CustomerEditService.prototype.startEdit = function (id) {
        this._editModel = null;
        return this.getEditableCustomerById(id);
    };
    CustomerEditService.prototype.startCreate = function () {
        this._editModel = this._customerService.createNewRecord();
        return this._editModel;
    };
    CustomerEditService.prototype.getEditableCustomerById = function (id) {
        if (!this._editModel || this._editModel.id !== id) {
            this._editModel = this._customerService.getCustomerById(id);
        }
        return this._editModel;
    };
    CustomerEditService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [customer_service_1.CustomerService])
    ], CustomerEditService);
    return CustomerEditService;
}());
exports.CustomerEditService = CustomerEditService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tZXItZWRpdC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY3VzdG9tZXItZWRpdC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBRzNDLHVEQUFxRDtBQUdyRDtJQUdJLDZCQUFvQixnQkFBaUM7UUFBakMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFpQjtJQUNyRCxDQUFDO0lBRUQsdUNBQVMsR0FBVCxVQUFVLEVBQVU7UUFDaEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7UUFFdkIsTUFBTSxDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRUQseUNBQVcsR0FBWDtRQUNJLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQzFELE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQzNCLENBQUM7SUFDRCxxREFBdUIsR0FBdkIsVUFBd0IsRUFBVTtRQUM5QixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztZQUdoRCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDaEUsQ0FBQztRQUVELE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQzNCLENBQUM7SUF4QlEsbUJBQW1CO1FBRC9CLGlCQUFVLEVBQUU7eUNBSTZCLGtDQUFlO09BSDVDLG1CQUFtQixDQTBCL0I7SUFBRCwwQkFBQztDQUFBLEFBMUJELElBMEJDO0FBMUJZLGtEQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5cclxuaW1wb3J0IHsgQ3VzdG9tZXIgfSBmcm9tIFwiLi9jdXN0b21lci5tb2RlbFwiO1xyXG5pbXBvcnQgeyBDdXN0b21lclNlcnZpY2UgfSBmcm9tIFwiLi9jdXN0b21lci5zZXJ2aWNlXCI7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBDdXN0b21lckVkaXRTZXJ2aWNlIHtcclxuICAgIHByaXZhdGUgX2VkaXRNb2RlbDogQ3VzdG9tZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfY3VzdG9tZXJTZXJ2aWNlOiBDdXN0b21lclNlcnZpY2UpIHtcclxuICAgIH1cclxuXHJcbiAgICBzdGFydEVkaXQoaWQ6IHN0cmluZyk6IEN1c3RvbWVyIHtcclxuICAgICAgICB0aGlzLl9lZGl0TW9kZWwgPSBudWxsO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRFZGl0YWJsZUN1c3RvbWVyQnlJZChpZCk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhcnRDcmVhdGUoKTogQ3VzdG9tZXIge1xyXG4gICAgICAgIHRoaXMuX2VkaXRNb2RlbCA9IHRoaXMuX2N1c3RvbWVyU2VydmljZS5jcmVhdGVOZXdSZWNvcmQoKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZWRpdE1vZGVsO1xyXG4gICAgfVxyXG4gICAgZ2V0RWRpdGFibGVDdXN0b21lckJ5SWQoaWQ6IHN0cmluZyk6IEN1c3RvbWVyIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2VkaXRNb2RlbCB8fCB0aGlzLl9lZGl0TW9kZWwuaWQgIT09IGlkKSB7XHJcblxyXG5cclxuICAgICAgICAgICAgdGhpcy5fZWRpdE1vZGVsID0gdGhpcy5fY3VzdG9tZXJTZXJ2aWNlLmdldEN1c3RvbWVyQnlJZChpZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5fZWRpdE1vZGVsO1xyXG4gICAgfVxyXG5cclxufVxyXG4iXX0=