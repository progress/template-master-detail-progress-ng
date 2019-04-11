// tslint:disable variable-name
export class SalesRep {
    // Keep _id in the model until we resolve id issue
    _id: string;
    id: string;
    seq: number;
    SalesRep: string;
    RepName: string;
    Region: string;
    MonthQuota: number[];
    YearQuota: number;
    
    constructor(options: any) {
        // Keep _id in the  model until we resolve id issue
        this._id = options._id;
        this.id = options.id;

        this.seq        = options.seq;
        this.SalesRep   = options.SalesRep;
        this.RepName    = options.RepName;
        this.Region     = options.Region;
        this.MonthQuota = options.MonthQuota;
        this.YearQuota  = options.YearQuota;
    }
}
