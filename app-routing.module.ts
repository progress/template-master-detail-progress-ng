import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { LoginComponent } from "./pages/login/login.component";
import { LoginGuard } from "./shared/login-guard.service";

const routes: Routes = [
    { path: "", redirectTo: "/customers", pathMatch: "full" },
    { 
        path: "customers", 
        loadChildren: "./customers/customers.module#CustomersModule",
        canActivate: [LoginGuard], 
    },
    { path: "login", component: LoginComponent }    
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
