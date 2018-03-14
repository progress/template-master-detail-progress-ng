"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsdo_core_1 = require("@progress/jsdo-core");
var jsdo_settings_1 = require("./jsdo.settings");
var core_1 = require("@angular/core");
/* *************************************************************************************
 * The ProgressService provides access to Progress Data Object resources.
 * It contains login and logout functionality.
 *
 * When login is performed:
 *      - A progress.data.JSDOSession instance is created.
 *      - The login is established.
 *      - The specified Data Service catalog is loaded.
 *
 * After login, the progress.data.JSDOSession instance is then ready to support the creation
 * of DataSources for any resource specified in the Data Service catalog.
 *
 * When logout is performed:
 *      - The login session is terminated.
 *      - The progress.data.JSDOSession instance is disabled, rendering it unable to start
 *        a new login session.
***************************************************************************************/
var ProgressService = (function () {
    function ProgressService() {
    }
    ProgressService.prototype.ngOnInit = function () {
        this.jsdosession = undefined;
    };
    ProgressService.prototype.isLoggedIn = function () {
        if (this.jsdosession) {
            return true;
        }
        return false;
    };
    ProgressService.prototype.login = function (username, password) {
        var _this = this;
        return jsdo_core_1.progress.data.getSession({
            name: "myAppSession",
            authenticationModel: jsdo_settings_1.JsdoSettings.authenticationModel,
            serviceURI: jsdo_settings_1.JsdoSettings.serviceURI,
            catalogURI: jsdo_settings_1.JsdoSettings.catalogURI,
            username: (jsdo_settings_1.JsdoSettings.authenticationModel === 'Anonymous') ? '' : username,
            password: (jsdo_settings_1.JsdoSettings.authenticationModel === 'Anonymous') ? '' : password
        })
            .then(function (result) {
            _this.jsdosession = result.jsdosession;
            return result;
        });
    };
    ProgressService.prototype.logout = function () {
        var promise = this.jsdosession.invalidate();
        this.jsdosession = undefined;
        return promise;
    };
    ProgressService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], ProgressService);
    return ProgressService;
}());
exports.ProgressService = ProgressService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZ3Jlc3Muc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInByb2dyZXNzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxpREFBK0M7QUFFL0MsaURBQStDO0FBRy9DLHNDQUEyQztBQUUzQzs7Ozs7Ozs7Ozs7Ozs7Ozt3RkFnQndGO0FBS3hGO0lBSUU7SUFDQSxDQUFDO0lBRUQsa0NBQVEsR0FBUjtRQUNFLElBQUksQ0FBQyxXQUFXLEdBQUcsU0FBUyxDQUFDO0lBQy9CLENBQUM7SUFFRCxvQ0FBVSxHQUFWO1FBQ0UsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDckIsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNkLENBQUM7UUFDRCxNQUFNLENBQUMsS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVELCtCQUFLLEdBQUwsVUFBTSxRQUFnQixFQUFFLFFBQWdCO1FBQXhDLGlCQWFDO1FBWkMsTUFBTSxDQUFDLG9CQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztZQUM1QixJQUFJLEVBQUUsY0FBYztZQUNwQixtQkFBbUIsRUFBRSw0QkFBWSxDQUFDLG1CQUFtQjtZQUNyRCxVQUFVLEVBQUUsNEJBQVksQ0FBQyxVQUFVO1lBQ25DLFVBQVUsRUFBRSw0QkFBWSxDQUFDLFVBQVU7WUFDbkMsUUFBUSxFQUFFLENBQUMsNEJBQVksQ0FBQyxtQkFBbUIsS0FBSyxXQUFXLENBQUMsR0FBRyxFQUFFLEdBQUcsUUFBUTtZQUM1RSxRQUFRLEVBQUUsQ0FBQyw0QkFBWSxDQUFDLG1CQUFtQixLQUFLLFdBQVcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxRQUFRO1NBQy9FLENBQUM7YUFDRCxJQUFJLENBQUMsVUFBQyxNQUFNO1lBQ1gsS0FBSSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDO1lBQ3RDLE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFDaEIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsZ0NBQU0sR0FBTjtRQUNFLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFLENBQUM7UUFFNUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUM7UUFFN0IsTUFBTSxDQUFDLE9BQU8sQ0FBQztJQUNqQixDQUFDO0lBdkNVLGVBQWU7UUFEM0IsaUJBQVUsRUFBRTs7T0FDQSxlQUFlLENBeUMzQjtJQUFELHNCQUFDO0NBQUEsQUF6Q0QsSUF5Q0M7QUF6Q1ksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBwcm9ncmVzcyB9IGZyb20gXCJAcHJvZ3Jlc3MvanNkby1jb3JlXCI7XHJcblxyXG5pbXBvcnQgeyBKc2RvU2V0dGluZ3MgfSBmcm9tIFwiLi9qc2RvLnNldHRpbmdzXCI7XHJcblxyXG5pbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuXHJcbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICogVGhlIFByb2dyZXNzU2VydmljZSBwcm92aWRlcyBhY2Nlc3MgdG8gUHJvZ3Jlc3MgRGF0YSBPYmplY3QgcmVzb3VyY2VzLlxyXG4gKiBJdCBjb250YWlucyBsb2dpbiBhbmQgbG9nb3V0IGZ1bmN0aW9uYWxpdHkuXHJcbiAqXHJcbiAqIFdoZW4gbG9naW4gaXMgcGVyZm9ybWVkOlxyXG4gKiAgICAgIC0gQSBwcm9ncmVzcy5kYXRhLkpTRE9TZXNzaW9uIGluc3RhbmNlIGlzIGNyZWF0ZWQuXHJcbiAqICAgICAgLSBUaGUgbG9naW4gaXMgZXN0YWJsaXNoZWQuXHJcbiAqICAgICAgLSBUaGUgc3BlY2lmaWVkIERhdGEgU2VydmljZSBjYXRhbG9nIGlzIGxvYWRlZC5cclxuICogXHJcbiAqIEFmdGVyIGxvZ2luLCB0aGUgcHJvZ3Jlc3MuZGF0YS5KU0RPU2Vzc2lvbiBpbnN0YW5jZSBpcyB0aGVuIHJlYWR5IHRvIHN1cHBvcnQgdGhlIGNyZWF0aW9uXHJcbiAqIG9mIERhdGFTb3VyY2VzIGZvciBhbnkgcmVzb3VyY2Ugc3BlY2lmaWVkIGluIHRoZSBEYXRhIFNlcnZpY2UgY2F0YWxvZy5cclxuICpcclxuICogV2hlbiBsb2dvdXQgaXMgcGVyZm9ybWVkOlxyXG4gKiAgICAgIC0gVGhlIGxvZ2luIHNlc3Npb24gaXMgdGVybWluYXRlZC5cclxuICogICAgICAtIFRoZSBwcm9ncmVzcy5kYXRhLkpTRE9TZXNzaW9uIGluc3RhbmNlIGlzIGRpc2FibGVkLCByZW5kZXJpbmcgaXQgdW5hYmxlIHRvIHN0YXJ0IFxyXG4gKiAgICAgICAgYSBuZXcgbG9naW4gc2Vzc2lvbi5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuXHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBQcm9ncmVzc1NlcnZpY2Uge1xyXG4gIFxyXG4gIHByaXZhdGUganNkb3Nlc3Npb246IHByb2dyZXNzLmRhdGEuSlNET1Nlc3Npb247XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgICB0aGlzLmpzZG9zZXNzaW9uID0gdW5kZWZpbmVkO1xyXG4gIH1cclxuXHJcbiAgaXNMb2dnZWRJbigpIHtcclxuICAgIGlmICh0aGlzLmpzZG9zZXNzaW9uKSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgbG9naW4odXNlcm5hbWU6IHN0cmluZywgcGFzc3dvcmQ6IHN0cmluZykge1xyXG4gICAgcmV0dXJuIHByb2dyZXNzLmRhdGEuZ2V0U2Vzc2lvbih7XHJcbiAgICAgICAgbmFtZTogXCJteUFwcFNlc3Npb25cIixcclxuICAgICAgICBhdXRoZW50aWNhdGlvbk1vZGVsOiBKc2RvU2V0dGluZ3MuYXV0aGVudGljYXRpb25Nb2RlbCxcclxuICAgICAgICBzZXJ2aWNlVVJJOiBKc2RvU2V0dGluZ3Muc2VydmljZVVSSSxcclxuICAgICAgICBjYXRhbG9nVVJJOiBKc2RvU2V0dGluZ3MuY2F0YWxvZ1VSSSxcclxuICAgICAgICB1c2VybmFtZTogKEpzZG9TZXR0aW5ncy5hdXRoZW50aWNhdGlvbk1vZGVsID09PSAnQW5vbnltb3VzJykgPyAnJyA6IHVzZXJuYW1lLCBcclxuICAgICAgICBwYXNzd29yZDogKEpzZG9TZXR0aW5ncy5hdXRoZW50aWNhdGlvbk1vZGVsID09PSAnQW5vbnltb3VzJykgPyAnJyA6IHBhc3N3b3JkXHJcbiAgICB9KVxyXG4gICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xyXG4gICAgICB0aGlzLmpzZG9zZXNzaW9uID0gcmVzdWx0LmpzZG9zZXNzaW9uO1xyXG4gICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBsb2dvdXQoKSB7XHJcbiAgICB2YXIgcHJvbWlzZSA9IHRoaXMuanNkb3Nlc3Npb24uaW52YWxpZGF0ZSgpO1xyXG5cclxuICAgIHRoaXMuanNkb3Nlc3Npb24gPSB1bmRlZmluZWQ7XHJcblxyXG4gICAgcmV0dXJuIHByb21pc2U7XHJcbiAgfVxyXG5cclxufSJdfQ==