import { INumber } from "./types";

/**
 * @module metronical.proto
 */

export function n(value: number): INumber {
    return new _n(value);
}

class _n implements INumber {
    private value: number;
    constructor(private readonly _value: number = 0) {
        this.value = this._value;
    }
    public toBool(): boolean {
        if (this.value === 0) {
            return false;
        }
        return true;
    }
    public random(min: number, max: number): INumber {
        if (isNaN(min) || isNaN(max)) {
            throw "Error: Only numbers are accepted as arguments.";
        }
        this.value = Math.floor(Math.random() * (parseInt(max.toString(), 10) - parseInt(min.toString(), 10) + 1) + parseInt(min.toString(), 10));
        return this;
    }
    public toNumber(): number {
        return this.value;
    }
}
