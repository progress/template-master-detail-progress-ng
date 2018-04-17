import { Injectable, NgZone } from "@angular/core";
import { Http } from "@angular/http";
import { progress } from "@progress/jsdo-core";
import "rxjs/add/observable/fromPromise";
import "rxjs/add/observable/of";
import { Observable } from "rxjs/Observable";
import { JsdoSettings } from "../../shared/jsdo.settings";
import { ProgressService } from "../../shared/progress.service";

import { State } from "./state.model";

import { DataSource, DataSourceOptions } from "@progress/jsdo-nativescript";

/* *************************************************************************************
 * The StateService handles all the data operations of retrieving state data.
 *
 * It relies upon a ProgressService so it can create a DataSource for the state data.
 * It is a read-only data service used to provide state info.
***************************************************************************************/

@Injectable()
export class StateService {
    private dataSource: DataSource;
    private jsdoSettings: JsdoSettings = new JsdoSettings();

    constructor(
      private _ngZone: NgZone,
      private _progressService: ProgressService
    ) { }

    createDataSource(successFn, errorFn): void {
        if (!this.dataSource) {
            try {
                this.dataSource = new DataSource({
                    jsdo: new progress.data.JSDO({ name: JsdoSettings.stateResourceName })
                });

                successFn();
            } catch (e) {
                errorFn();
                throw new Error("Error: " + e.message);
            }
        }
    }

    load(): Observable<any> {
        if (this.dataSource) {
            return Observable.of(this.dataSource.getData());
          } else {
            const promise = new Promise((resolve, reject) => {
                this.createDataSource(() => {
                    this.dataSource.read().subscribe((myData: Array<State>) => {
                        resolve(myData);
                    }, (error) => {
                        if (error.toString() === "Error: Error: HTTP Status 401 Unauthorized") {
                            this._progressService.logout();
                        }
                        reject(new Error("Error reading state records: " + error.message));
                    });
                }, (error) => {
                    const message = (error && error.message) ? error.message : "Error reading State records.";
                    reject(new Error(message));
                });
            });

            return Observable.fromPromise(promise).catch(this.handleErrors);
          }
    }

    private handleErrors(error: Response): Observable<any> {
        return Observable.throw(error);
    }
}
