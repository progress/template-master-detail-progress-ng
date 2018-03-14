"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var JsdoSettings = (function () {
    function JsdoSettings() {
    }
    //static serviceURI = "http://oemobiledemo.progress.com/OEMobileDemoServices";
    //static catalogURI = "http://oemobiledemo.progress.com/OEMobileDemoServices/static/SportsService.json";
    // static catalogURI = "http://oemobiledemo.progress.com/OEMobileDemoServices/static/CustomerService.json";
    //static authenticationModel = "Anonymous";
    JsdoSettings.resourceName = "Customer";
    JsdoSettings.tableRef = "ttCustomer";
    JsdoSettings.serviceURI = "http://oemobiledemo.progress.com/OEMobileDemoServicesBasic";
    JsdoSettings.catalogURI = "http://oemobiledemo.progress.com/OEMobileDemoServicesBasic/static/SportsService.json";
    JsdoSettings.authenticationModel = "Basic";
    // StateService (in state.service.ts) represents a data service which provides state info.
    // The state resource can be found in the web application specified by the above serviceURI property
    JsdoSettings.stateResourceName = "State";
    JsdoSettings.stateTableRef = "ttState";
    // Initial filter and sort options for queries with the DataSource
    // Filtering and sorting can be performed on the server-side
    // using the JSON Filter Pattern (JFP).
    // The filter and sort options use the same syntax
    // as the filter and sort options the Kendo UI DataSource.
    // If JFP support is not available in the Business Entity,
    // Only filter with an ABL where string can be used.
    // Alternatively, you can use functionality in NativeScript
    // to do client-side filtering and sorting.
    // static filter = "";
    // static sort = "";
    // static filter = {};
    // static sort = "";
    // static filter = "CustNum <= 11";
    // static sort = "";
    JsdoSettings.filterORIG = { field: "CustNum", operator: "lte", value: 11 };
    JsdoSettings.sortORIG = { field: "Name", dir: "asc" };
    JsdoSettings.sort = {};
    JsdoSettings.filter = {
        logic: "or",
        filters: [
            { field: "CustNum", operator: "lte", value: 21 },
            { field: "Name", operator: "startswith", value: "NEW-ONE" }
        ]
    };
    // Filter expression used by the SearchBar field
    // $SEARCH token is replaced by the value entered in the field
    // static searchFilter = "CustNum <= 11 AND Name MATCHES '*$SEARCH*'";
    // static searchFilter = { field: "Name", operator: "contains", value: "$SEARCH" };
    JsdoSettings.searchFilter = {
        filters: [
            { field: "CustNum", operator: "lte", value: 11 },
            { field: "Name", operator: "contains", value: "$SEARCH" }
        ]
    };
    return JsdoSettings;
}());
exports.JsdoSettings = JsdoSettings;
// BASIC JSDOSettings
// export class JsdoSettings {
//     static serviceURI = "http://oemobiledemo.progress.com/OEMobileDemoServicesBasic";
//     static catalogURI = "http://oemobiledemo.progress.com/OEMobileDemoServicesBasic/static/CustomerService.json";
//     static authenticationModel = "Basic";
//     static resourceName = "Customer";
//     static tableRef = "ttCustomer";
//     static filter = "CustNum <= 12";
//     static sort = { field: "Name", dir: "asc" };
//     static searchFilter = {
//         filters: [
//             { field: "CustNum", operator: "lte", value: 11 },
//             { field: "Name", operator: "contains", value: "$SEARCH" }
//         ]
//     };
// } 
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNkby5zZXR0aW5ncy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImpzZG8uc2V0dGluZ3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTtJQUFBO0lBZ0VBLENBQUM7SUEvREcsOEVBQThFO0lBQzlFLHdHQUF3RztJQUN4RywyR0FBMkc7SUFDM0csMkNBQTJDO0lBQ3BDLHlCQUFZLEdBQUcsVUFBVSxDQUFDO0lBQzFCLHFCQUFRLEdBQUcsWUFBWSxDQUFDO0lBRXhCLHVCQUFVLEdBQUcsNERBQTRELENBQUM7SUFDMUUsdUJBQVUsR0FBRyxzRkFBc0YsQ0FBQztJQUNwRyxnQ0FBbUIsR0FBRyxPQUFPLENBQUM7SUFFckMsMEZBQTBGO0lBQzFGLG9HQUFvRztJQUM3Riw4QkFBaUIsR0FBRyxPQUFPLENBQUM7SUFDNUIsMEJBQWEsR0FBRyxTQUFTLENBQUM7SUFFakMsa0VBQWtFO0lBRWxFLDREQUE0RDtJQUM1RCx1Q0FBdUM7SUFDdkMsa0RBQWtEO0lBQ2xELDBEQUEwRDtJQUUxRCwwREFBMEQ7SUFDMUQsb0RBQW9EO0lBRXBELDJEQUEyRDtJQUMzRCwyQ0FBMkM7SUFFM0Msc0JBQXNCO0lBQ3RCLG9CQUFvQjtJQUVwQixzQkFBc0I7SUFDdEIsb0JBQW9CO0lBRXBCLG1DQUFtQztJQUNuQyxvQkFBb0I7SUFFYix1QkFBVSxHQUFHLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsQ0FBQztJQUM5RCxxQkFBUSxHQUFHLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLENBQUM7SUFFekMsaUJBQUksR0FBRyxFQUFHLENBQUM7SUFFWCxtQkFBTSxHQUFHO1FBQ1osS0FBSyxFQUFFLElBQUk7UUFDWCxPQUFPLEVBQUU7WUFDTCxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFO1lBQ2hELEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUU7U0FDOUQ7S0FDRixDQUFBO0lBR0gsZ0RBQWdEO0lBQ2hELDhEQUE4RDtJQUM5RCxzRUFBc0U7SUFDdEUsbUZBQW1GO0lBRTVFLHlCQUFZLEdBQUc7UUFDbEIsT0FBTyxFQUFFO1lBQ0wsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRTtZQUNoRCxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFO1NBQzVEO0tBQ0osQ0FBQztJQUNOLG1CQUFDO0NBQUEsQUFoRUQsSUFnRUM7QUFoRVksb0NBQVk7QUFrRXpCLHFCQUFxQjtBQUNyQiw4QkFBOEI7QUFDOUIsd0ZBQXdGO0FBQ3hGLG9IQUFvSDtBQUNwSCw0Q0FBNEM7QUFDNUMsd0NBQXdDO0FBQ3hDLHNDQUFzQztBQUN0Qyx1Q0FBdUM7QUFDdkMsbURBQW1EO0FBQ25ELDhCQUE4QjtBQUM5QixxQkFBcUI7QUFDckIsZ0VBQWdFO0FBQ2hFLHdFQUF3RTtBQUN4RSxZQUFZO0FBQ1osU0FBUztBQUVULElBQUkiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgSnNkb1NldHRpbmdzIHtcclxuICAgIC8vc3RhdGljIHNlcnZpY2VVUkkgPSBcImh0dHA6Ly9vZW1vYmlsZWRlbW8ucHJvZ3Jlc3MuY29tL09FTW9iaWxlRGVtb1NlcnZpY2VzXCI7XHJcbiAgICAvL3N0YXRpYyBjYXRhbG9nVVJJID0gXCJodHRwOi8vb2Vtb2JpbGVkZW1vLnByb2dyZXNzLmNvbS9PRU1vYmlsZURlbW9TZXJ2aWNlcy9zdGF0aWMvU3BvcnRzU2VydmljZS5qc29uXCI7XHJcbiAgICAvLyBzdGF0aWMgY2F0YWxvZ1VSSSA9IFwiaHR0cDovL29lbW9iaWxlZGVtby5wcm9ncmVzcy5jb20vT0VNb2JpbGVEZW1vU2VydmljZXMvc3RhdGljL0N1c3RvbWVyU2VydmljZS5qc29uXCI7XHJcbiAgICAvL3N0YXRpYyBhdXRoZW50aWNhdGlvbk1vZGVsID0gXCJBbm9ueW1vdXNcIjtcclxuICAgIHN0YXRpYyByZXNvdXJjZU5hbWUgPSBcIkN1c3RvbWVyXCI7XHJcbiAgICBzdGF0aWMgdGFibGVSZWYgPSBcInR0Q3VzdG9tZXJcIjtcclxuXHJcbiAgICBzdGF0aWMgc2VydmljZVVSSSA9IFwiaHR0cDovL29lbW9iaWxlZGVtby5wcm9ncmVzcy5jb20vT0VNb2JpbGVEZW1vU2VydmljZXNCYXNpY1wiO1xyXG4gICAgc3RhdGljIGNhdGFsb2dVUkkgPSBcImh0dHA6Ly9vZW1vYmlsZWRlbW8ucHJvZ3Jlc3MuY29tL09FTW9iaWxlRGVtb1NlcnZpY2VzQmFzaWMvc3RhdGljL1Nwb3J0c1NlcnZpY2UuanNvblwiO1xyXG4gICAgc3RhdGljIGF1dGhlbnRpY2F0aW9uTW9kZWwgPSBcIkJhc2ljXCI7XHJcblxyXG4gICAgLy8gU3RhdGVTZXJ2aWNlIChpbiBzdGF0ZS5zZXJ2aWNlLnRzKSByZXByZXNlbnRzIGEgZGF0YSBzZXJ2aWNlIHdoaWNoIHByb3ZpZGVzIHN0YXRlIGluZm8uXHJcbiAgICAvLyBUaGUgc3RhdGUgcmVzb3VyY2UgY2FuIGJlIGZvdW5kIGluIHRoZSB3ZWIgYXBwbGljYXRpb24gc3BlY2lmaWVkIGJ5IHRoZSBhYm92ZSBzZXJ2aWNlVVJJIHByb3BlcnR5XHJcbiAgICBzdGF0aWMgc3RhdGVSZXNvdXJjZU5hbWUgPSBcIlN0YXRlXCI7XHJcbiAgICBzdGF0aWMgc3RhdGVUYWJsZVJlZiA9IFwidHRTdGF0ZVwiO1xyXG5cclxuICAgIC8vIEluaXRpYWwgZmlsdGVyIGFuZCBzb3J0IG9wdGlvbnMgZm9yIHF1ZXJpZXMgd2l0aCB0aGUgRGF0YVNvdXJjZVxyXG5cclxuICAgIC8vIEZpbHRlcmluZyBhbmQgc29ydGluZyBjYW4gYmUgcGVyZm9ybWVkIG9uIHRoZSBzZXJ2ZXItc2lkZVxyXG4gICAgLy8gdXNpbmcgdGhlIEpTT04gRmlsdGVyIFBhdHRlcm4gKEpGUCkuXHJcbiAgICAvLyBUaGUgZmlsdGVyIGFuZCBzb3J0IG9wdGlvbnMgdXNlIHRoZSBzYW1lIHN5bnRheFxyXG4gICAgLy8gYXMgdGhlIGZpbHRlciBhbmQgc29ydCBvcHRpb25zIHRoZSBLZW5kbyBVSSBEYXRhU291cmNlLlxyXG5cclxuICAgIC8vIElmIEpGUCBzdXBwb3J0IGlzIG5vdCBhdmFpbGFibGUgaW4gdGhlIEJ1c2luZXNzIEVudGl0eSxcclxuICAgIC8vIE9ubHkgZmlsdGVyIHdpdGggYW4gQUJMIHdoZXJlIHN0cmluZyBjYW4gYmUgdXNlZC5cclxuXHJcbiAgICAvLyBBbHRlcm5hdGl2ZWx5LCB5b3UgY2FuIHVzZSBmdW5jdGlvbmFsaXR5IGluIE5hdGl2ZVNjcmlwdFxyXG4gICAgLy8gdG8gZG8gY2xpZW50LXNpZGUgZmlsdGVyaW5nIGFuZCBzb3J0aW5nLlxyXG5cclxuICAgIC8vIHN0YXRpYyBmaWx0ZXIgPSBcIlwiO1xyXG4gICAgLy8gc3RhdGljIHNvcnQgPSBcIlwiO1xyXG5cclxuICAgIC8vIHN0YXRpYyBmaWx0ZXIgPSB7fTtcclxuICAgIC8vIHN0YXRpYyBzb3J0ID0gXCJcIjtcclxuXHJcbiAgICAvLyBzdGF0aWMgZmlsdGVyID0gXCJDdXN0TnVtIDw9IDExXCI7XHJcbiAgICAvLyBzdGF0aWMgc29ydCA9IFwiXCI7XHJcblxyXG4gICAgc3RhdGljIGZpbHRlck9SSUcgPSB7IGZpZWxkOiBcIkN1c3ROdW1cIiwgb3BlcmF0b3I6IFwibHRlXCIsIHZhbHVlOiAxMSB9O1xyXG4gICAgc3RhdGljIHNvcnRPUklHID0geyBmaWVsZDogXCJOYW1lXCIsIGRpcjogXCJhc2NcIiB9O1xyXG5cclxuICAgIHN0YXRpYyBzb3J0ID0geyB9O1xyXG5cclxuICAgIHN0YXRpYyBmaWx0ZXIgPSB7XHJcbiAgICAgICAgbG9naWM6IFwib3JcIixcclxuICAgICAgICBmaWx0ZXJzOiBbXHJcbiAgICAgICAgICAgIHsgZmllbGQ6IFwiQ3VzdE51bVwiLCBvcGVyYXRvcjogXCJsdGVcIiwgdmFsdWU6IDIxIH0sXHJcbiAgICAgICAgICAgIHsgZmllbGQ6IFwiTmFtZVwiLCBvcGVyYXRvcjogXCJzdGFydHN3aXRoXCIsIHZhbHVlOiBcIk5FVy1PTkVcIiB9XHJcbiAgICAgICAgXVxyXG4gICAgICB9XHJcblxyXG5cclxuICAgIC8vIEZpbHRlciBleHByZXNzaW9uIHVzZWQgYnkgdGhlIFNlYXJjaEJhciBmaWVsZFxyXG4gICAgLy8gJFNFQVJDSCB0b2tlbiBpcyByZXBsYWNlZCBieSB0aGUgdmFsdWUgZW50ZXJlZCBpbiB0aGUgZmllbGRcclxuICAgIC8vIHN0YXRpYyBzZWFyY2hGaWx0ZXIgPSBcIkN1c3ROdW0gPD0gMTEgQU5EIE5hbWUgTUFUQ0hFUyAnKiRTRUFSQ0gqJ1wiO1xyXG4gICAgLy8gc3RhdGljIHNlYXJjaEZpbHRlciA9IHsgZmllbGQ6IFwiTmFtZVwiLCBvcGVyYXRvcjogXCJjb250YWluc1wiLCB2YWx1ZTogXCIkU0VBUkNIXCIgfTtcclxuXHJcbiAgICBzdGF0aWMgc2VhcmNoRmlsdGVyID0ge1xyXG4gICAgICAgIGZpbHRlcnM6IFtcclxuICAgICAgICAgICAgeyBmaWVsZDogXCJDdXN0TnVtXCIsIG9wZXJhdG9yOiBcImx0ZVwiLCB2YWx1ZTogMTEgfSxcclxuICAgICAgICAgICAgeyBmaWVsZDogXCJOYW1lXCIsIG9wZXJhdG9yOiBcImNvbnRhaW5zXCIsIHZhbHVlOiBcIiRTRUFSQ0hcIiB9XHJcbiAgICAgICAgXVxyXG4gICAgfTtcclxufVxyXG5cclxuLy8gQkFTSUMgSlNET1NldHRpbmdzXHJcbi8vIGV4cG9ydCBjbGFzcyBKc2RvU2V0dGluZ3Mge1xyXG4vLyAgICAgc3RhdGljIHNlcnZpY2VVUkkgPSBcImh0dHA6Ly9vZW1vYmlsZWRlbW8ucHJvZ3Jlc3MuY29tL09FTW9iaWxlRGVtb1NlcnZpY2VzQmFzaWNcIjtcclxuLy8gICAgIHN0YXRpYyBjYXRhbG9nVVJJID0gXCJodHRwOi8vb2Vtb2JpbGVkZW1vLnByb2dyZXNzLmNvbS9PRU1vYmlsZURlbW9TZXJ2aWNlc0Jhc2ljL3N0YXRpYy9DdXN0b21lclNlcnZpY2UuanNvblwiO1xyXG4vLyAgICAgc3RhdGljIGF1dGhlbnRpY2F0aW9uTW9kZWwgPSBcIkJhc2ljXCI7XHJcbi8vICAgICBzdGF0aWMgcmVzb3VyY2VOYW1lID0gXCJDdXN0b21lclwiO1xyXG4vLyAgICAgc3RhdGljIHRhYmxlUmVmID0gXCJ0dEN1c3RvbWVyXCI7XHJcbi8vICAgICBzdGF0aWMgZmlsdGVyID0gXCJDdXN0TnVtIDw9IDEyXCI7XHJcbi8vICAgICBzdGF0aWMgc29ydCA9IHsgZmllbGQ6IFwiTmFtZVwiLCBkaXI6IFwiYXNjXCIgfTtcclxuLy8gICAgIHN0YXRpYyBzZWFyY2hGaWx0ZXIgPSB7XHJcbi8vICAgICAgICAgZmlsdGVyczogW1xyXG4vLyAgICAgICAgICAgICB7IGZpZWxkOiBcIkN1c3ROdW1cIiwgb3BlcmF0b3I6IFwibHRlXCIsIHZhbHVlOiAxMSB9LFxyXG4vLyAgICAgICAgICAgICB7IGZpZWxkOiBcIk5hbWVcIiwgb3BlcmF0b3I6IFwiY29udGFpbnNcIiwgdmFsdWU6IFwiJFNFQVJDSFwiIH1cclxuLy8gICAgICAgICBdXHJcbi8vICAgICB9O1xyXG4gICAgXHJcbi8vIH0iXX0=