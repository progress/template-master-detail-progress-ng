import { Component, Input, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { RadSideDrawerComponent } from "nativescript-pro-ui/sidedrawer/angular";
import { ItemEventData } from "ui/list-view";

import { navigationCancelingError } from "@angular/router/src/shared";
import { confirm } from "tns-core-modules/ui/dialogs";

import { JsdoSettings } from "../jsdo.settings";
import { ProgressService } from "../progress.service";

@Component({
    selector: "SideDrawer",
    moduleId: module.id,
    templateUrl: "./side-drawer.component.html",
    styleUrls: ["./side-drawer.component.css"]
})
export class SideDrawerComponent implements OnInit {

    // The "selectedPage" is a component input property.
    // It is used to pass the current page title from the containing page component.
    @Input() selectedPage: string;

    // The "sideDrawer" is the actual drawer itself
    @Input() sideDrawer: RadSideDrawerComponent;

    private _navigationItems: Array<any>;
    private _isNotAnonymous: boolean = (JsdoSettings.authenticationModel !== "Anonymous");

    constructor(
        private routerExtensions: RouterExtensions,
        private progressService: ProgressService
    ) {

    }

    // Use the SideDrawerComponent "onInit" event handler to initialize the properties data values.
    // The navigationItems property is initialized here and is data bound to <ListView> in the SideDrawer view file.
    // Add, remove or edit navigationItems to change what is displayed in the app drawer list.
    ngOnInit(): void {
        this._navigationItems = [
            {
                title: "Customers",
                name: "customers",
                route: "/customers"
            }
        ];

        if (this._isNotAnonymous) {
            this._navigationItems.push({
                title: "Log Out",
                name: "logout",
                route: "/login"
            });
        }
    }

    get navigationItems(): Array<any> {
        return this._navigationItems;
    }

    // Use the "itemTap" event handler of the <ListView> component for handling list item taps.
    // The "itemTap" event handler of the app drawer <ListView> is used to navigate the app
    // based on the tapped navigationItem's route.
    onNavigationItemTap(args: ItemEventData): void {
        const navigationItemView = args.view;
        const navigationItemRoute = navigationItemView.bindingContext.route;

        if (navigationItemView.bindingContext.name === "logout") {
            this.onLogout();
        } else if (this.isPageSelected(navigationItemView.bindingContext.title)) {
            this.sideDrawer.sideDrawer.closeDrawer();
        } else {
            this.routerExtensions.navigate([navigationItemRoute], {
                transition: {
                    name: "fade"
                }
            });
        }
    }

    onLogout(): void {
        confirm("Are you sure you want to log out?")
            .then((result) => {
                if (result) {
                    return this.progressService.logout()
                        .then(() => {
                            this.routerExtensions.navigate(["/login"], {
                                clearHistory: true,
                                transition: {
                                    name: "fade"
                                }
                            });
                        });
                }
            });
    }

    // The "isPageSelected" function is bound to every navigation item on the <ListView>.
    // It is used to determine whether the item should have the "selected" class.
    // The "selected" class changes the styles of the item, so that you know which page you are on.
    isPageSelected(pageTitle: string): boolean {
        return pageTitle === this.selectedPage;
    }
}
