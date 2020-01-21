import { IArray } from "./types";

/**
 * @module metronical.proto
 */

export function a<T>(value: T[]): IArray<T> {
    return new _a(value);
}

class _a<T> implements IArray<T> {
    private value: T[];
    constructor(private readonly _value: T[] = []) {
        this.value = this._value;
    }
    public empty(): IArray<T> {
        this.value = this.value.splice(0, this.value.length);
        return this;
    }
    public isEmpty(): boolean {
        if (this.value.length === 0) {
            return true;
        }
        return false;
    }
    public each(callback: Function): void {
        for (let i: number = 0; i < this.value.length; i++) {
            callback(i, this[i]);
        }
    }
    public remove(item: T): IArray<T> {
        let index: number = this.value.indexOf(item);
        if (index != -1) {
            this.value = this.value.splice(index, 1);
            return this;
        }
        return null;
    }
    public contains(partial: string, strict: boolean): boolean {
        for (let i: number = 0; i < this.value.length; i++) {
            if (!strict && this[i].contains(partial)) {
                return true;
            }
            if (strict && this[i] === partial) {
                return true;
            }
        }
        return false;
    }
    public indexOfPartial(partial: string): number {
        for (let i: number = 0; i < this.value.length; i++) {
            if (this[i].contains(partial)) {
                return i;
            }
        }
        return -1;
    }
    public toObjectArray(objName: string): IArray<T> {
        if (objName === undefined || objName === null) {
            throw 'Error: Property name must be provided for conversion.';
        }
        let items: any = this;
        if (typeof (items[0]) === 'string' || typeof (items[0]) === 'number' || typeof (items[0]) === 'boolean') {
            for (let i: number = 0; i < items.length; i++) {
                let val: any = items[i];
                items[i] = {};
                items[i][objName] = val;
            }
            return items;
        }
        else {
            return this;
        }
    }
    public toArray(): T[] {
        return this.value;
    }
}
