"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("nativescript-angular/common");
var forms_1 = require("nativescript-angular/forms");
var angular_1 = require("nativescript-pro-ui/listview/angular");
var customer_detail_edit_component_1 = require("./customer-detail-edit/customer-detail-edit.component");
var customer_detail_component_1 = require("./customer-detail/customer-detail.component");
var customer_list_component_1 = require("./customer-list/customer-list.component");
var customers_routing_module_1 = require("./customers-routing.module");
var customer_edit_service_1 = require("./shared/customer-edit.service");
var customer_service_1 = require("./shared/customer.service");
var state_service_1 = require("./shared/state.service");
var CustomersModule = (function () {
    function CustomersModule() {
    }
    CustomersModule = __decorate([
        core_1.NgModule({
            imports: [
                customers_routing_module_1.CustomersRoutingModule,
                common_1.NativeScriptCommonModule,
                forms_1.NativeScriptFormsModule,
                angular_1.NativeScriptUIListViewModule
            ],
            declarations: [
                customer_list_component_1.CustomerListComponent,
                customer_detail_component_1.CustomerDetailComponent,
                customer_detail_edit_component_1.CustomerDetailEditComponent
            ],
            providers: [
                customer_service_1.CustomerService,
                customer_edit_service_1.CustomerEditService,
                state_service_1.StateService
            ],
            schemas: [
                core_1.NO_ERRORS_SCHEMA
            ]
        })
    ], CustomersModule);
    return CustomersModule;
}());
exports.CustomersModule = CustomersModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tZXJzLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImN1c3RvbWVycy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkQ7QUFDM0Qsc0RBQXVFO0FBQ3ZFLG9EQUFxRTtBQUNyRSxnRUFBb0Y7QUFFcEYsd0dBQW9HO0FBQ3BHLHlGQUFzRjtBQUN0RixtRkFBZ0Y7QUFDaEYsdUVBQW9FO0FBQ3BFLHdFQUFxRTtBQUNyRSw4REFBNEQ7QUFDNUQsd0RBQXNEO0FBdUJ0RDtJQUFBO0lBQStCLENBQUM7SUFBbkIsZUFBZTtRQXJCM0IsZUFBUSxDQUFDO1lBQ04sT0FBTyxFQUFFO2dCQUNMLGlEQUFzQjtnQkFDdEIsaUNBQXdCO2dCQUN4QiwrQkFBdUI7Z0JBQ3ZCLHNDQUE0QjthQUMvQjtZQUNELFlBQVksRUFBRTtnQkFDViwrQ0FBcUI7Z0JBQ3JCLG1EQUF1QjtnQkFDdkIsNERBQTJCO2FBQzlCO1lBQ0QsU0FBUyxFQUFFO2dCQUNQLGtDQUFlO2dCQUNmLDJDQUFtQjtnQkFDbkIsNEJBQVk7YUFDZjtZQUNELE9BQU8sRUFBRTtnQkFDTCx1QkFBZ0I7YUFDbkI7U0FDSixDQUFDO09BQ1csZUFBZSxDQUFJO0lBQUQsc0JBQUM7Q0FBQSxBQUFoQyxJQUFnQztBQUFuQiwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBOT19FUlJPUlNfU0NIRU1BIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Q29tbW9uTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2NvbW1vblwiO1xyXG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9mb3Jtc1wiO1xyXG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRVSUxpc3RWaWV3TW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1wcm8tdWkvbGlzdHZpZXcvYW5ndWxhclwiO1xyXG5cclxuaW1wb3J0IHsgQ3VzdG9tZXJEZXRhaWxFZGl0Q29tcG9uZW50IH0gZnJvbSBcIi4vY3VzdG9tZXItZGV0YWlsLWVkaXQvY3VzdG9tZXItZGV0YWlsLWVkaXQuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IEN1c3RvbWVyRGV0YWlsQ29tcG9uZW50IH0gZnJvbSBcIi4vY3VzdG9tZXItZGV0YWlsL2N1c3RvbWVyLWRldGFpbC5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgQ3VzdG9tZXJMaXN0Q29tcG9uZW50IH0gZnJvbSBcIi4vY3VzdG9tZXItbGlzdC9jdXN0b21lci1saXN0LmNvbXBvbmVudFwiO1xyXG5pbXBvcnQgeyBDdXN0b21lcnNSb3V0aW5nTW9kdWxlIH0gZnJvbSBcIi4vY3VzdG9tZXJzLXJvdXRpbmcubW9kdWxlXCI7XHJcbmltcG9ydCB7IEN1c3RvbWVyRWRpdFNlcnZpY2UgfSBmcm9tIFwiLi9zaGFyZWQvY3VzdG9tZXItZWRpdC5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IEN1c3RvbWVyU2VydmljZSB9IGZyb20gXCIuL3NoYXJlZC9jdXN0b21lci5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7IFN0YXRlU2VydmljZSB9IGZyb20gXCIuL3NoYXJlZC9zdGF0ZS5zZXJ2aWNlXCI7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgaW1wb3J0czogW1xyXG4gICAgICAgIEN1c3RvbWVyc1JvdXRpbmdNb2R1bGUsXHJcbiAgICAgICAgTmF0aXZlU2NyaXB0Q29tbW9uTW9kdWxlLFxyXG4gICAgICAgIE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlLFxyXG4gICAgICAgIE5hdGl2ZVNjcmlwdFVJTGlzdFZpZXdNb2R1bGVcclxuICAgIF0sXHJcbiAgICBkZWNsYXJhdGlvbnM6IFtcclxuICAgICAgICBDdXN0b21lckxpc3RDb21wb25lbnQsXHJcbiAgICAgICAgQ3VzdG9tZXJEZXRhaWxDb21wb25lbnQsXHJcbiAgICAgICAgQ3VzdG9tZXJEZXRhaWxFZGl0Q29tcG9uZW50XHJcbiAgICBdLFxyXG4gICAgcHJvdmlkZXJzOiBbXHJcbiAgICAgICAgQ3VzdG9tZXJTZXJ2aWNlLFxyXG4gICAgICAgIEN1c3RvbWVyRWRpdFNlcnZpY2UsXHJcbiAgICAgICAgU3RhdGVTZXJ2aWNlXHJcbiAgICBdLFxyXG4gICAgc2NoZW1hczogW1xyXG4gICAgICAgIE5PX0VSUk9SU19TQ0hFTUFcclxuICAgIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIEN1c3RvbWVyc01vZHVsZSB7IH1cclxuIl19