"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var jsdo_settings_1 = require("../../shared/jsdo.settings");
var jsdo_core_1 = require("@progress/jsdo-core");
require("rxjs/add/observable/fromPromise");
require("rxjs/add/observable/of");
var Observable_1 = require("rxjs/Observable");
var jsdo_nativescript_1 = require("@progress/jsdo-nativescript");
/* *************************************************************************************
 * The StateService handles all the data operations of retrieving state data.
 *
 * It relies upon a ProgressService so it can create a DataSource for the state data.
 * It is a read-only data service used to provide state info.
***************************************************************************************/
var StateService = (function () {
    function StateService(_ngZone) {
        this._ngZone = _ngZone;
        this.jsdoSettings = new jsdo_settings_1.JsdoSettings();
    }
    StateService.prototype.createDataSource = function (successFn, errorFn) {
        if (!this.dataSource) {
            try {
                this.dataSource = new jsdo_nativescript_1.DataSource({
                    jsdo: new jsdo_core_1.progress.data.JSDO({ name: jsdo_settings_1.JsdoSettings.stateResourceName })
                });
                successFn();
            }
            catch (e) {
                errorFn();
                throw new Error("Error: " + e.message);
            }
        }
    };
    StateService.prototype.load = function () {
        var _this = this;
        if (this.dataSource) {
            return Observable_1.Observable.of(this.dataSource.getData());
        }
        else {
            var promise = new Promise(function (resolve, reject) {
                _this.createDataSource(function () {
                    _this.dataSource.read().subscribe(function (myData) {
                        resolve(myData);
                    }, function (error) {
                        reject(new Error("Error reading state records: " + error.message));
                    });
                }, function (error) {
                    var message = (error && error.message) ? error.message : "Error reading State records.";
                    reject(new Error(message));
                });
            });
            return Observable_1.Observable.fromPromise(promise).catch(this.handleErrors);
        }
    };
    StateService.prototype.handleErrors = function (error) {
        return Observable_1.Observable.throw(error);
    };
    StateService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [core_1.NgZone])
    ], StateService);
    return StateService;
}());
exports.StateService = StateService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInN0YXRlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBbUQ7QUFFbkQsNERBQTBEO0FBQzFELGlEQUErQztBQUMvQywyQ0FBeUM7QUFDekMsa0NBQWdDO0FBQ2hDLDhDQUE2QztBQUc3QyxpRUFBNEU7QUFHNUU7Ozs7O3dGQUt3RjtBQUd4RjtJQUlJLHNCQUFvQixPQUFlO1FBQWYsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQUYzQixpQkFBWSxHQUFpQixJQUFJLDRCQUFZLEVBQUUsQ0FBQztJQUd2RCxDQUFDO0lBRUYsdUNBQWdCLEdBQWhCLFVBQWlCLFNBQVMsRUFBRSxPQUFPO1FBQy9CLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDbkIsSUFBSSxDQUFDO2dCQUNELElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSw4QkFBVSxDQUFDO29CQUM3QixJQUFJLEVBQUUsSUFBSSxvQkFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsNEJBQVksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO2lCQUN6RSxDQUFDLENBQUM7Z0JBRUgsU0FBUyxFQUFFLENBQUM7WUFDaEIsQ0FBQztZQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ1QsT0FBTyxFQUFFLENBQUM7Z0JBQ1YsTUFBTSxJQUFJLEtBQUssQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzNDLENBQUM7UUFDTCxDQUFDO0lBQ0wsQ0FBQztJQUVELDJCQUFJLEdBQUo7UUFBQSxpQkFtQkM7UUFsQkcsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDbEIsTUFBTSxDQUFDLHVCQUFVLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztRQUNsRCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixJQUFNLE9BQU8sR0FBRyxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU8sRUFBRSxNQUFNO2dCQUN4QyxLQUFJLENBQUMsZ0JBQWdCLENBQUM7b0JBQ2xCLEtBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUMsU0FBUyxDQUFDLFVBQUMsTUFBb0I7d0JBQ2xELE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDcEIsQ0FBQyxFQUFFLFVBQUMsS0FBSzt3QkFDTCxNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsK0JBQStCLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7b0JBQ3ZFLENBQUMsQ0FBQyxDQUFDO2dCQUNQLENBQUMsRUFBRSxVQUFDLEtBQUs7b0JBQ0wsSUFBTSxPQUFPLEdBQUcsQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEtBQUssQ0FBQyxPQUFPLEdBQUcsOEJBQThCLENBQUM7b0JBQzFGLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUMvQixDQUFDLENBQUMsQ0FBQztZQUNQLENBQUMsQ0FBQyxDQUFDO1lBRUgsTUFBTSxDQUFDLHVCQUFVLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDbEUsQ0FBQztJQUNQLENBQUM7SUFFTyxtQ0FBWSxHQUFwQixVQUFxQixLQUFlO1FBQ2hDLE1BQU0sQ0FBQyx1QkFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBN0NRLFlBQVk7UUFEeEIsaUJBQVUsRUFBRTt5Q0FLb0IsYUFBTTtPQUoxQixZQUFZLENBOEN4QjtJQUFELG1CQUFDO0NBQUEsQUE5Q0QsSUE4Q0M7QUE5Q1ksb0NBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBOZ1pvbmUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBIdHRwIH0gZnJvbSBcIkBhbmd1bGFyL2h0dHBcIjtcclxuaW1wb3J0IHsgSnNkb1NldHRpbmdzIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC9qc2RvLnNldHRpbmdzXCI7XHJcbmltcG9ydCB7IHByb2dyZXNzIH0gZnJvbSBcIkBwcm9ncmVzcy9qc2RvLWNvcmVcIjtcclxuaW1wb3J0IFwicnhqcy9hZGQvb2JzZXJ2YWJsZS9mcm9tUHJvbWlzZVwiO1xyXG5pbXBvcnQgXCJyeGpzL2FkZC9vYnNlcnZhYmxlL29mXCI7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tIFwicnhqcy9PYnNlcnZhYmxlXCI7XHJcbmltcG9ydCB7IFN0YXRlIH0gZnJvbSBcIi4vc3RhdGUubW9kZWxcIjtcclxuXHJcbmltcG9ydCB7IERhdGFTb3VyY2UsIERhdGFTb3VyY2VPcHRpb25zIH0gZnJvbSBcIkBwcm9ncmVzcy9qc2RvLW5hdGl2ZXNjcmlwdFwiO1xyXG5cclxuXHJcbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICogVGhlIFN0YXRlU2VydmljZSBoYW5kbGVzIGFsbCB0aGUgZGF0YSBvcGVyYXRpb25zIG9mIHJldHJpZXZpbmcgc3RhdGUgZGF0YS5cclxuICpcclxuICogSXQgcmVsaWVzIHVwb24gYSBQcm9ncmVzc1NlcnZpY2Ugc28gaXQgY2FuIGNyZWF0ZSBhIERhdGFTb3VyY2UgZm9yIHRoZSBzdGF0ZSBkYXRhLlxyXG4gKiBJdCBpcyBhIHJlYWQtb25seSBkYXRhIHNlcnZpY2UgdXNlZCB0byBwcm92aWRlIHN0YXRlIGluZm8uXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIFN0YXRlU2VydmljZSB7XHJcbiAgICBwcml2YXRlIGRhdGFTb3VyY2U6IERhdGFTb3VyY2U7XHJcbiAgICBwcml2YXRlIGpzZG9TZXR0aW5nczogSnNkb1NldHRpbmdzID0gbmV3IEpzZG9TZXR0aW5ncygpO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX25nWm9uZTogTmdab25lKSB7XHJcbiAgICAgfVxyXG5cclxuICAgIGNyZWF0ZURhdGFTb3VyY2Uoc3VjY2Vzc0ZuLCBlcnJvckZuKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmRhdGFTb3VyY2UpIHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YVNvdXJjZSA9IG5ldyBEYXRhU291cmNlKHtcclxuICAgICAgICAgICAgICAgICAgICBqc2RvOiBuZXcgcHJvZ3Jlc3MuZGF0YS5KU0RPKHsgbmFtZTogSnNkb1NldHRpbmdzLnN0YXRlUmVzb3VyY2VOYW1lIH0pXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzRm4oKTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgZXJyb3JGbigpO1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRXJyb3I6IFwiICsgZS5tZXNzYWdlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBsb2FkKCk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICAgICAgaWYgKHRoaXMuZGF0YVNvdXJjZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5vZih0aGlzLmRhdGFTb3VyY2UuZ2V0RGF0YSgpKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZURhdGFTb3VyY2UoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YVNvdXJjZS5yZWFkKCkuc3Vic2NyaWJlKChteURhdGE6IEFycmF5PFN0YXRlPikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKG15RGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoXCJFcnJvciByZWFkaW5nIHN0YXRlIHJlY29yZHM6IFwiICsgZXJyb3IubWVzc2FnZSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSwgKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbWVzc2FnZSA9IChlcnJvciAmJiBlcnJvci5tZXNzYWdlKSA/IGVycm9yLm1lc3NhZ2UgOiBcIkVycm9yIHJlYWRpbmcgU3RhdGUgcmVjb3Jkcy5cIjtcclxuICAgICAgICAgICAgICAgICAgICByZWplY3QobmV3IEVycm9yKG1lc3NhZ2UpKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBPYnNlcnZhYmxlLmZyb21Qcm9taXNlKHByb21pc2UpLmNhdGNoKHRoaXMuaGFuZGxlRXJyb3JzKTtcclxuICAgICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGhhbmRsZUVycm9ycyhlcnJvcjogUmVzcG9uc2UpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgICAgIHJldHVybiBPYnNlcnZhYmxlLnRocm93KGVycm9yKTtcclxuICAgIH1cclxufVxyXG4iXX0=