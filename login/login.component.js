"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var page_1 = require("ui/page");
var jsdo_settings_1 = require("../shared/jsdo.settings");
var app_component_1 = require("../app.component");
var progress_service_1 = require("../shared/progress.service");
var LoginComponent = (function () {
    function LoginComponent(page, _routerExtensions, progressService) {
        this.page = page;
        this._routerExtensions = _routerExtensions;
        this.progressService = progressService;
        this._isNotAnonymous = (jsdo_settings_1.JsdoSettings.authenticationModel !== "Anonymous");
    }
    // Runs after the constructor, all injected dependencies are resolved
    // and all class members are defined 
    LoginComponent.prototype.ngOnInit = function () {
        // this.page.actionBarHidden = true;
        // this.page.backgroundImage = "res://bg_login";
        if (jsdo_settings_1.JsdoSettings.authenticationModel === "Anonymous") {
            this.login();
        }
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        try {
            debugger;
            this.progressService.login(this.username, this.password)
                .then(function (result) {
                console.log("Success on login()");
                _this._routerExtensions.navigate(["/customers"], { clearHistory: true });
            })
                .catch(function (object) {
                alert("Login failed.");
            });
        }
        catch (ex) {
            alert("Error logging in");
        }
    };
    __decorate([
        core_1.ViewChild("container"),
        __metadata("design:type", core_1.ElementRef)
    ], LoginComponent.prototype, "container", void 0);
    LoginComponent = __decorate([
        core_1.Component({
            // The selector property defines how a component can be used within
            // another components template 
            selector: "my-app",
            templateUrl: "login/login.html",
            styleUrls: ["login/login-common.css", "login/login.css"],
            //providers: [UserService],
            providers: [app_component_1.AppComponent],
        }),
        __metadata("design:paramtypes", [page_1.Page,
            router_1.RouterExtensions,
            progress_service_1.ProgressService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXlFO0FBQ3pFLHNEQUErRDtBQUUvRCxnQ0FBK0I7QUFLL0IseURBQXVEO0FBQ3ZELGtEQUFnRDtBQUNoRCwrREFBNkQ7QUFjN0Q7SUFNSSx3QkFDWSxJQUFVLEVBQ1YsaUJBQW1DLEVBQ25DLGVBQWdDO1FBRmhDLFNBQUksR0FBSixJQUFJLENBQU07UUFDVixzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO1FBQ25DLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQU5wQyxvQkFBZSxHQUFZLENBQUMsNEJBQVksQ0FBQyxtQkFBbUIsS0FBSyxXQUFXLENBQUMsQ0FBQztJQVN0RixDQUFDO0lBRUQscUVBQXFFO0lBQ3JFLHFDQUFxQztJQUNyQyxpQ0FBUSxHQUFSO1FBQ0ksb0NBQW9DO1FBQ3BDLGdEQUFnRDtRQUNoRCxFQUFFLENBQUMsQ0FBQyw0QkFBWSxDQUFDLG1CQUFtQixLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDbkQsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2pCLENBQUM7SUFDTCxDQUFDO0lBR0QsOEJBQUssR0FBTDtRQUFBLGlCQWdCQztRQWZHLElBQUksQ0FBQztZQUNELFFBQVEsQ0FBQztZQUNULElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQztpQkFDbkQsSUFBSSxDQUFDLFVBQUMsTUFBTTtnQkFDVCxPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUM7Z0JBRWxDLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRSxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQzVFLENBQUMsQ0FBQztpQkFDRCxLQUFLLENBQUMsVUFBVSxNQUFNO2dCQUNuQixLQUFLLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDM0IsQ0FBQyxDQUFDLENBQUM7UUFDWCxDQUFDO1FBQ0QsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNSLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQzlCLENBQUM7SUFDTCxDQUFDO0lBcEN1QjtRQUF2QixnQkFBUyxDQUFDLFdBQVcsQ0FBQztrQ0FBWSxpQkFBVTtxREFBQztJQUxyQyxjQUFjO1FBVjFCLGdCQUFTLENBQUM7WUFDUCxtRUFBbUU7WUFDbkUsK0JBQStCO1lBQy9CLFFBQVEsRUFBRSxRQUFRO1lBQ2xCLFdBQVcsRUFBRSxrQkFBa0I7WUFDL0IsU0FBUyxFQUFFLENBQUMsd0JBQXdCLEVBQUUsaUJBQWlCLENBQUM7WUFFeEQsMkJBQTJCO1lBQzNCLFNBQVMsRUFBRSxDQUFDLDRCQUFZLENBQUM7U0FDNUIsQ0FBQzt5Q0FRb0IsV0FBSTtZQUNTLHlCQUFnQjtZQUNsQixrQ0FBZTtPQVRuQyxjQUFjLENBMkMxQjtJQUFELHFCQUFDO0NBQUEsQUEzQ0QsSUEyQ0M7QUEzQ1ksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIE9uSW5pdCwgVmlld0NoaWxkIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcclxuXHJcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xyXG5pbXBvcnQgeyBDb2xvciB9IGZyb20gXCJjb2xvclwiO1xyXG5pbXBvcnQgeyBWaWV3IH0gZnJvbSBcInVpL2NvcmUvdmlld1wiO1xyXG5cclxuaW1wb3J0IHsgcHJvZ3Jlc3MgfSBmcm9tIFwiQHByb2dyZXNzL2pzZG8tY29yZVwiO1xyXG5pbXBvcnQgeyBKc2RvU2V0dGluZ3MgfSBmcm9tIFwiLi4vc2hhcmVkL2pzZG8uc2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgQXBwQ29tcG9uZW50IH0gZnJvbSBcIi4uL2FwcC5jb21wb25lbnRcIjtcclxuaW1wb3J0IHsgUHJvZ3Jlc3NTZXJ2aWNlIH0gZnJvbSBcIi4uL3NoYXJlZC9wcm9ncmVzcy5zZXJ2aWNlXCI7XHJcblxyXG5cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgLy8gVGhlIHNlbGVjdG9yIHByb3BlcnR5IGRlZmluZXMgaG93IGEgY29tcG9uZW50IGNhbiBiZSB1c2VkIHdpdGhpblxyXG4gICAgLy8gYW5vdGhlciBjb21wb25lbnRzIHRlbXBsYXRlIFxyXG4gICAgc2VsZWN0b3I6IFwibXktYXBwXCIsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCJsb2dpbi9sb2dpbi5odG1sXCIsXHJcbiAgICBzdHlsZVVybHM6IFtcImxvZ2luL2xvZ2luLWNvbW1vbi5jc3NcIiwgXCJsb2dpbi9sb2dpbi5jc3NcIl0sXHJcblxyXG4gICAgLy9wcm92aWRlcnM6IFtVc2VyU2VydmljZV0sXHJcbiAgICBwcm92aWRlcnM6IFtBcHBDb21wb25lbnRdLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTG9naW5Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAgdXNlcm5hbWU6IHN0cmluZztcclxuICAgIHBhc3N3b3JkOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIF9pc05vdEFub255bW91czogYm9vbGVhbiA9IChKc2RvU2V0dGluZ3MuYXV0aGVudGljYXRpb25Nb2RlbCAhPT0gXCJBbm9ueW1vdXNcIik7XHJcblxyXG4gICAgQFZpZXdDaGlsZChcImNvbnRhaW5lclwiKSBjb250YWluZXI6IEVsZW1lbnRSZWY7XHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIHBhZ2U6IFBhZ2UsXHJcbiAgICAgICAgcHJpdmF0ZSBfcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucyxcclxuICAgICAgICBwcml2YXRlIHByb2dyZXNzU2VydmljZTogUHJvZ3Jlc3NTZXJ2aWNlXHJcbiAgICApIHtcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICAvLyBSdW5zIGFmdGVyIHRoZSBjb25zdHJ1Y3RvciwgYWxsIGluamVjdGVkIGRlcGVuZGVuY2llcyBhcmUgcmVzb2x2ZWRcclxuICAgIC8vIGFuZCBhbGwgY2xhc3MgbWVtYmVycyBhcmUgZGVmaW5lZCBcclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIC8vIHRoaXMucGFnZS5hY3Rpb25CYXJIaWRkZW4gPSB0cnVlO1xyXG4gICAgICAgIC8vIHRoaXMucGFnZS5iYWNrZ3JvdW5kSW1hZ2UgPSBcInJlczovL2JnX2xvZ2luXCI7XHJcbiAgICAgICAgaWYgKEpzZG9TZXR0aW5ncy5hdXRoZW50aWNhdGlvbk1vZGVsID09PSBcIkFub255bW91c1wiKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9naW4oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGxvZ2luKCkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGRlYnVnZ2VyO1xyXG4gICAgICAgICAgICB0aGlzLnByb2dyZXNzU2VydmljZS5sb2dpbih0aGlzLnVzZXJuYW1lLCB0aGlzLnBhc3N3b3JkKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU3VjY2VzcyBvbiBsb2dpbigpXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3JvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL2N1c3RvbWVyc1wiXSwgeyBjbGVhckhpc3Rvcnk6IHRydWUgfSk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChvYmplY3QpIHtcclxuICAgICAgICAgICAgICAgICAgICBhbGVydChcIkxvZ2luIGZhaWxlZC5cIik7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2F0Y2ggKGV4KSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KFwiRXJyb3IgbG9nZ2luZyBpblwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59Il19