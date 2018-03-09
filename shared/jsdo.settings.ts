export class JsdoSettings {
    static serviceURI = "http://oemobiledemo.progress.com/OEMobileDemoServices";
    static catalogURI = "http://oemobiledemo.progress.com/OEMobileDemoServices/static/CustomerService.json";
    static authenticationModel = "Anonymous";
    static resourceName = "Customer";
    static tableRef = "ttCustomer";
    // StateService (in state.service.ts) represents a data service which provides state info.
    // The state resource can be found in the web application specified by the above serviceURI property
    static stateResourceName = "State";
    static stateTableRef = "ttState";

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

    static filter = { field: "CustNum", operator: "lte", value: 11 };
    static sort = { field: "Name", dir: "asc" };

    // Filter expression used by the SearchBar field
    // $SEARCH token is replaced by the value entered in the field
    // static searchFilter = "CustNum <= 11 AND Name MATCHES '*$SEARCH*'";
    // static searchFilter = { field: "Name", operator: "contains", value: "$SEARCH" };

    static searchFilter = {
        filters: [
            { field: "CustNum", operator: "lte", value: 11 },
            { field: "Name", operator: "contains", value: "$SEARCH" }
        ]
    };
}

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