import { IObject } from "./types";

/**
 * @module metronical.proto
 */

export function obj(value: any): IObject {
    return new _obj(value);
}

class _obj implements IObject {
    private value: any;
    constructor(private readonly _value: any) {
        this.value = this._value;
    }
   public extend(data: any): IObject {
        for (let prop in data) {
            if(data.hasOwnProperty(prop)) {
                this.value[prop] = data[prop];
            }
        }
        return this;
    }
    public toObject(): any {
        return this.value;
    }
}
