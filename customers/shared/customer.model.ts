// tslint:disable variable-name
export class Customer {
    // Keep _id in the Customer model until we resolve id issue
    _id: string;
    id: string;
    CustNum: number;
    Name: string;
    Country: string;
    Address: string;
    Address2: string;
    City: string;
    State: string;
    PostalCode: string;
    Contact: string;
    Phone: string;
    SalesRep: string;
    CreditLimit: number;
    Balance: number;
    Terms: string;
    Discount: number;
    Comments: string;
    Fax: string;
    EmailAddress: string;

    constructor(options: any) {
        // Keep _id in the Customer model until we resolve id issue
        this._id = options._id;
        this.id = options.id;
        this.CustNum = options.CustNum;
        this.Name = options.Name;
        this.Country = options.Country;
        this.Address = options.Address;
        this.Address2 = options.Address2;
        this.City = options.City;
        this.State = options.State;
        this.PostalCode = options.PostalCode;
        this.Contact = options.Contact;
        this.Phone = options.Phone;
        this.SalesRep = options.SalesRep;
        this.CreditLimit = Number(options.CreditLimit);
        this.Balance = Number(options.Balance);
        this.Terms = options.Terms;
        this.Discount = Number(options.Discount);
        this.Comments = options.Comments;
        this.Fax = options.Fax;
        this.EmailAddress = options.EmailAddress;
    }
}
