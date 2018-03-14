"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var jsdo_core_1 = require("@progress/jsdo-core");
require("rxjs/add/observable/fromPromise");
require("rxjs/add/observable/of");
var Observable_1 = require("rxjs/Observable");
var jsdo_nativescript_1 = require("@progress/jsdo-nativescript");
var jsdo_settings_1 = require("../../shared/jsdo.settings");
/* *************************************************************************************
 * The CustomerService handles all the data operations of retrieving and updating
 * customer data.
 *
 * It relies upon a ProgressService so it can create a DataSource for the customer data.
***************************************************************************************/
var CustomerService = (function () {
    function CustomerService(_ngZone) {
        this._ngZone = _ngZone;
        this.jsdoSettings = new jsdo_settings_1.JsdoSettings();
        // console.log("DEBUG: In customer.service.ts: constructor()");
    }
    CustomerService.prototype.getCustomerById = function (id) {
        if (!id) {
            return null;
        }
        return this.dataSource.findById(id);
    };
    CustomerService.prototype.createDataSource = function (successFn, errorFn) {
        if (!this.dataSource) {
            try {
                this.jsdo = new jsdo_core_1.progress.data.JSDO({ name: jsdo_settings_1.JsdoSettings.resourceName });
                this.dataSource = new jsdo_nativescript_1.DataSource({
                    jsdo: this.jsdo,
                    tableRef: jsdo_settings_1.JsdoSettings.tableRef,
                    filter: jsdo_settings_1.JsdoSettings.filter,
                    sort: jsdo_settings_1.JsdoSettings.sort
                });
                successFn();
            }
            catch (e) {
                // console.log("DEBUG: " + e);
                errorFn();
                throw new Error("Error: " + e.message);
            }
        }
    };
    CustomerService.prototype.load = function (params) {
        var _this = this;
        var promise;
        if (this.dataSource) {
            if (params) {
                promise = new Promise(function (resolve, reject) {
                    _this.dataSource.read(params).subscribe(function (myData) {
                        resolve(myData);
                    }, function (error) {
                        reject(new Error("Error reading records: " + error.message));
                    });
                });
                return Observable_1.Observable.fromPromise(promise).catch(this.handleErrors);
            }
            else {
                return Observable_1.Observable.of(this.dataSource.getData());
            }
        }
        else {
            promise = new Promise(function (resolve, reject) {
                _this.createDataSource(function () {
                    _this.dataSource.read(params).subscribe(function (myData) {
                        resolve(myData);
                    }, function (error) {
                        reject(new Error("Error reading records: " + error.message));
                    });
                }, function (error) {
                    var message = (error && error.message) ? error.message : "Error reading records.";
                    reject(new Error(message));
                });
            });
            return Observable_1.Observable.fromPromise(promise).catch(this.handleErrors);
        }
    };
    CustomerService.prototype.createNewRecord = function () {
        return this.dataSource.create({});
    };
    // Called for either existing record with changes or for created record.
    // For created record, createNewRecord() is first called 
    CustomerService.prototype.update = function (dataModel) {
        var ret = false;
        try {
            // First, let's update the underlying datasource memory
            ret = this.dataSource.update(dataModel);
            if (!ret) {
                throw new Error("Update: An error occurred updating underlying datasource.");
            }
        }
        catch (e) {
            Promise.reject(e);
        }
        return this.sync();
    };
    /**
     * Accepts any pending changes from the underlying data source
     */
    CustomerService.prototype.acceptChanges = function () {
        this.dataSource.acceptChanges();
    };
    /**
     * Cancels any pending changes from the underlying data source
     */
    CustomerService.prototype.cancelChanges = function () {
        this.dataSource.cancelChanges();
    };
    /**
     * Returns true if datasource provides edit capabilities, records can be created, updated and deleted.
     * If not, it returns false.
     */
    CustomerService.prototype.hasEditSupport = function () {
        return this.dataSource.hasCUDSupport() || this.dataSource.hasSubmitSupport();
    };
    CustomerService.prototype.sync = function () {
        var _this = this;
        var promise;
        promise = new Promise(function (resolve, reject) {
            // Call dataSource.saveChanges() to send any pending changes to backend
            _this.dataSource.saveChanges()
                .then(function (result) {
                resolve(result);
            }).catch(function (errors) {
                var errorMsg = "SaveChanges failed..";
                if (errors) {
                    if (typeof errors === "string") {
                        errorMsg = errors;
                    }
                    else if (Array.isArray(errors)) {
                        // This would occur when error info returned from jsdo.getErrors()
                        // For now, only one error message should be returned since app is processing
                        // single row changes
                        errors.forEach(function (err) {
                            errorMsg = err.error;
                        });
                    }
                }
                reject(new Error(errorMsg));
            });
        });
        return promise;
    };
    CustomerService.prototype.delete = function (customerModel) {
        // first make sure remove is successful
        try {
            var remove = this.dataSource.remove(customerModel);
        }
        catch (error) {
            Promise.reject(new Error("Error calling remove: " + error));
        }
        return this.sync();
    };
    CustomerService.prototype.handleErrors = function (error) {
        return Observable_1.Observable.throw(error);
    };
    CustomerService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [core_1.NgZone])
    ], CustomerService);
    return CustomerService;
}());
exports.CustomerService = CustomerService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImN1c3RvbWVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBbUQ7QUFFbkQsaURBQStDO0FBQy9DLDJDQUF5QztBQUN6QyxrQ0FBZ0M7QUFDaEMsOENBQTZDO0FBRzdDLGlFQUE0RTtBQUM1RSw0REFBMEQ7QUFFMUQ7Ozs7O3dGQUt3RjtBQUV4RjtJQU1JLHlCQUFvQixPQUFlO1FBQWYsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQUYzQixpQkFBWSxHQUFpQixJQUFJLDRCQUFZLEVBQUUsQ0FBQztRQUdwRCwrREFBK0Q7SUFDbEUsQ0FBQztJQUVGLHlDQUFlLEdBQWYsVUFBZ0IsRUFBVTtRQUN0QixFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDTixNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2hCLENBQUM7UUFFRCxNQUFNLENBQVksSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUVELDBDQUFnQixHQUFoQixVQUFpQixTQUFTLEVBQUUsT0FBTztRQUMvQixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ25CLElBQUksQ0FBQztnQkFDRCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksb0JBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLDRCQUFZLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQztnQkFDeEUsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLDhCQUFVLENBQUM7b0JBQzdCLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtvQkFDZixRQUFRLEVBQUUsNEJBQVksQ0FBQyxRQUFRO29CQUMvQixNQUFNLEVBQUUsNEJBQVksQ0FBQyxNQUFNO29CQUMzQixJQUFJLEVBQUUsNEJBQVksQ0FB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QUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgTmdab25lIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgSHR0cCB9IGZyb20gXCJAYW5ndWxhci9odHRwXCI7XHJcbmltcG9ydCB7IHByb2dyZXNzIH0gZnJvbSBcIkBwcm9ncmVzcy9qc2RvLWNvcmVcIjtcclxuaW1wb3J0IFwicnhqcy9hZGQvb2JzZXJ2YWJsZS9mcm9tUHJvbWlzZVwiO1xyXG5pbXBvcnQgXCJyeGpzL2FkZC9vYnNlcnZhYmxlL29mXCI7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tIFwicnhqcy9PYnNlcnZhYmxlXCI7XHJcbmltcG9ydCB7IEN1c3RvbWVyIH0gZnJvbSBcIi4vY3VzdG9tZXIubW9kZWxcIjtcclxuXHJcbmltcG9ydCB7IERhdGFTb3VyY2UsIERhdGFTb3VyY2VPcHRpb25zIH0gZnJvbSBcIkBwcm9ncmVzcy9qc2RvLW5hdGl2ZXNjcmlwdFwiO1xyXG5pbXBvcnQgeyBKc2RvU2V0dGluZ3MgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL2pzZG8uc2V0dGluZ3NcIjtcclxuXHJcbi8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICogVGhlIEN1c3RvbWVyU2VydmljZSBoYW5kbGVzIGFsbCB0aGUgZGF0YSBvcGVyYXRpb25zIG9mIHJldHJpZXZpbmcgYW5kIHVwZGF0aW5nIFxyXG4gKiBjdXN0b21lciBkYXRhLlxyXG4gKlxyXG4gKiBJdCByZWxpZXMgdXBvbiBhIFByb2dyZXNzU2VydmljZSBzbyBpdCBjYW4gY3JlYXRlIGEgRGF0YVNvdXJjZSBmb3IgdGhlIGN1c3RvbWVyIGRhdGEuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgQ3VzdG9tZXJTZXJ2aWNlIHtcclxuXHJcbiAgICBwcml2YXRlIGpzZG86IHByb2dyZXNzLmRhdGEuSlNETztcclxuICAgIHByaXZhdGUgZGF0YVNvdXJjZTogRGF0YVNvdXJjZTtcclxuICAgIHByaXZhdGUganNkb1NldHRpbmdzOiBKc2RvU2V0dGluZ3MgPSBuZXcgSnNkb1NldHRpbmdzKCk7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfbmdab25lOiBOZ1pvbmUpIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkRFQlVHOiBJbiBjdXN0b21lci5zZXJ2aWNlLnRzOiBjb25zdHJ1Y3RvcigpXCIpO1xyXG4gICAgIH1cclxuXHJcbiAgICBnZXRDdXN0b21lckJ5SWQoaWQ6IHN0cmluZyk6IEN1c3RvbWVyIHtcclxuICAgICAgICBpZiAoIWlkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIDxDdXN0b21lcj4gdGhpcy5kYXRhU291cmNlLmZpbmRCeUlkKGlkKTtcclxuICAgIH1cclxuXHJcbiAgICBjcmVhdGVEYXRhU291cmNlKHN1Y2Nlc3NGbiwgZXJyb3JGbik6IHZvaWQge1xyXG4gICAgICAgIGlmICghdGhpcy5kYXRhU291cmNlKSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmpzZG8gPSBuZXcgcHJvZ3Jlc3MuZGF0YS5KU0RPKHsgbmFtZTogSnNkb1NldHRpbmdzLnJlc291cmNlTmFtZSB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YVNvdXJjZSA9IG5ldyBEYXRhU291cmNlKHtcclxuICAgICAgICAgICAgICAgICAgICBqc2RvOiB0aGlzLmpzZG8sXHJcbiAgICAgICAgICAgICAgICAgICAgdGFibGVSZWY6IEpzZG9TZXR0aW5ncy50YWJsZVJlZixcclxuICAgICAgICAgICAgICAgICAgICBmaWx0ZXI6IEpzZG9TZXR0aW5ncy5maWx0ZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgc29ydDogSnNkb1NldHRpbmdzLnNvcnRcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3NGbigpO1xyXG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIkRFQlVHOiBcIiArIGUpO1xyXG4gICAgICAgICAgICAgICAgZXJyb3JGbigpO1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRXJyb3I6IFwiICsgZS5tZXNzYWdlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBsb2FkKHBhcmFtcz86IHByb2dyZXNzLmRhdGEuRmlsdGVyT3B0aW9ucyk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICAgICAgbGV0IHByb21pc2U7XHJcbiAgICAgICAgaWYgKHRoaXMuZGF0YVNvdXJjZSkge1xyXG4gICAgICAgICAgICBpZiAocGFyYW1zKSB7XHJcbiAgICAgICAgICAgICAgICBwcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YVNvdXJjZS5yZWFkKHBhcmFtcykuc3Vic2NyaWJlKChteURhdGE6IEFycmF5PEN1c3RvbWVyPikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKG15RGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoXCJFcnJvciByZWFkaW5nIHJlY29yZHM6IFwiICsgZXJyb3IubWVzc2FnZSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIE9ic2VydmFibGUuZnJvbVByb21pc2UocHJvbWlzZSkuY2F0Y2godGhpcy5oYW5kbGVFcnJvcnMpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIE9ic2VydmFibGUub2YodGhpcy5kYXRhU291cmNlLmdldERhdGEoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBwcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVEYXRhU291cmNlKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGFTb3VyY2UucmVhZChwYXJhbXMpLnN1YnNjcmliZSgobXlEYXRhOiBBcnJheTxDdXN0b21lcj4pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShteURhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QobmV3IEVycm9yKFwiRXJyb3IgcmVhZGluZyByZWNvcmRzOiBcIiArIGVycm9yLm1lc3NhZ2UpKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0sIChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2UgPSAoZXJyb3IgJiYgZXJyb3IubWVzc2FnZSkgPyBlcnJvci5tZXNzYWdlIDogXCJFcnJvciByZWFkaW5nIHJlY29yZHMuXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihtZXNzYWdlKSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5mcm9tUHJvbWlzZShwcm9taXNlKS5jYXRjaCh0aGlzLmhhbmRsZUVycm9ycyk7XHJcbiAgICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlTmV3UmVjb3JkKCk6IEN1c3RvbWVyIHtcclxuICAgICAgICByZXR1cm4gPEN1c3RvbWVyPiB0aGlzLmRhdGFTb3VyY2UuY3JlYXRlKHt9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBDYWxsZWQgZm9yIGVpdGhlciBleGlzdGluZyByZWNvcmQgd2l0aCBjaGFuZ2VzIG9yIGZvciBjcmVhdGVkIHJlY29yZC5cclxuICAgIC8vIEZvciBjcmVhdGVkIHJlY29yZCwgY3JlYXRlTmV3UmVjb3JkKCkgaXMgZmlyc3QgY2FsbGVkIFxyXG4gICAgdXBkYXRlKGRhdGFNb2RlbDogQ3VzdG9tZXIpOiBQcm9taXNlPGFueT4ge1xyXG4gICAgICAgIGxldCByZXQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgLy8gRmlyc3QsIGxldCdzIHVwZGF0ZSB0aGUgdW5kZXJseWluZyBkYXRhc291cmNlIG1lbW9yeVxyXG4gICAgICAgICAgICByZXQgPSB0aGlzLmRhdGFTb3VyY2UudXBkYXRlKGRhdGFNb2RlbCk7XHJcbiAgICAgICAgICAgIGlmICghcmV0KSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVcGRhdGU6IEFuIGVycm9yIG9jY3VycmVkIHVwZGF0aW5nIHVuZGVybHlpbmcgZGF0YXNvdXJjZS5cIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIFByb21pc2UucmVqZWN0KGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3luYygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWNjZXB0cyBhbnkgcGVuZGluZyBjaGFuZ2VzIGZyb20gdGhlIHVuZGVybHlpbmcgZGF0YSBzb3VyY2VcclxuICAgICAqL1xyXG4gICAgYWNjZXB0Q2hhbmdlcygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmRhdGFTb3VyY2UuYWNjZXB0Q2hhbmdlcygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2FuY2VscyBhbnkgcGVuZGluZyBjaGFuZ2VzIGZyb20gdGhlIHVuZGVybHlpbmcgZGF0YSBzb3VyY2VcclxuICAgICAqL1xyXG4gICAgY2FuY2VsQ2hhbmdlcygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmRhdGFTb3VyY2UuY2FuY2VsQ2hhbmdlcygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0cnVlIGlmIGRhdGFzb3VyY2UgcHJvdmlkZXMgZWRpdCBjYXBhYmlsaXRpZXMsIHJlY29yZHMgY2FuIGJlIGNyZWF0ZWQsIHVwZGF0ZWQgYW5kIGRlbGV0ZWQuXHJcbiAgICAgKiBJZiBub3QsIGl0IHJldHVybnMgZmFsc2UuXHJcbiAgICAgKi9cclxuICAgIGhhc0VkaXRTdXBwb3J0KCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGFTb3VyY2UuaGFzQ1VEU3VwcG9ydCgpIHx8IHRoaXMuZGF0YVNvdXJjZS5oYXNTdWJtaXRTdXBwb3J0KCk7XHJcbiAgICB9XHJcbiAgICBzeW5jKCk6IFByb21pc2U8YW55PiB7XHJcbiAgICAgICAgbGV0IHByb21pc2U7XHJcblxyXG4gICAgICAgIHByb21pc2UgPSBuZXcgUHJvbWlzZShcclxuICAgICAgICAgICAgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gQ2FsbCBkYXRhU291cmNlLnNhdmVDaGFuZ2VzKCkgdG8gc2VuZCBhbnkgcGVuZGluZyBjaGFuZ2VzIHRvIGJhY2tlbmRcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YVNvdXJjZS5zYXZlQ2hhbmdlcygpXHJcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goKGVycm9ycykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZXJyb3JNc2c6IHN0cmluZyA9IFwiU2F2ZUNoYW5nZXMgZmFpbGVkLi5cIjtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlcnJvcnMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZXJyb3JzID09PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JNc2cgPSBlcnJvcnM7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoZXJyb3JzKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRoaXMgd291bGQgb2NjdXIgd2hlbiBlcnJvciBpbmZvIHJldHVybmVkIGZyb20ganNkby5nZXRFcnJvcnMoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEZvciBub3csIG9ubHkgb25lIGVycm9yIG1lc3NhZ2Ugc2hvdWxkIGJlIHJldHVybmVkIHNpbmNlIGFwcCBpcyBwcm9jZXNzaW5nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2luZ2xlIHJvdyBjaGFuZ2VzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JzLmZvckVhY2goKGVycikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvck1zZyA9IGVyci5lcnJvcjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcihlcnJvck1zZykpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHByb21pc2U7XHJcbiAgICB9XHJcblxyXG4gICAgZGVsZXRlKGN1c3RvbWVyTW9kZWwpOiBQcm9taXNlPGFueT4ge1xyXG4gICAgICAgIC8vIGZpcnN0IG1ha2Ugc3VyZSByZW1vdmUgaXMgc3VjY2Vzc2Z1bFxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlbW92ZTogYm9vbGVhbiA9IHRoaXMuZGF0YVNvdXJjZS5yZW1vdmUoY3VzdG9tZXJNb2RlbCk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgUHJvbWlzZS5yZWplY3QobmV3IEVycm9yIChcIkVycm9yIGNhbGxpbmcgcmVtb3ZlOiBcIiArIGVycm9yKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5zeW5jKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBoYW5kbGVFcnJvcnMoZXJyb3I6IFJlc3BvbnNlKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS50aHJvdyhlcnJvcik7XHJcbiAgICB9XHJcbn1cclxuIl19