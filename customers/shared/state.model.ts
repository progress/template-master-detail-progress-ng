// tslint:disable variable-name
export class State {
    // Keep _id in the model until we resolve id issue
    _id: string;
    id: string;
    State: string;
    StateName: string;
    Region: string;
    
    constructor(options: any) {
        // Keep _id in the  model until we resolve id issue
        this._id = options._id;
        this.id = options.id;

        this.State = options.State;
        this.StateName = options.StateName;
        this.Region = options.Region;
    }
}
