/**
 * @module metronical.proto
 */

export interface IString {
    lower: () => IString;
    upper: () => IString;
    ltrim: () => IString;
    rtrim: () => IString;
    trim: () => IString;
    normalize: () => IString;
    startsWith: (part: string, pos?: number) => boolean;
    endsWith: (part: string, pos?: number) => boolean;
    capFirst: () => IString;
    capWords: () => IString;
    truncateWords: (number: number) => IString;
    truncateWordsWithHtml: (number: number) => IString;
    stripHtml: () => IString;
    escapeHtml: () => IString;
    toBool: () => boolean;
    contains: (val: string) => boolean;
    slugify: (lower?: boolean) => IString;
    getValueByKey: (key: string) => string;
    setValueByKey: (key: string, replacement: string) => IString;
    isNullOrEmpty: (val: any) => boolean;
    toString: () => string;
}

export interface INumber {
    toBool: () => boolean;
    random: (min: number, max: number) => INumber;
    toNumber: () => number;
}

export interface IArray<T> {
    empty: () => IArray<T>;
    isEmpty: () => boolean;
    each: (callback: Function) => void;
    remove: (item: T) => IArray<T>;
    contains: (partial: string, strict: boolean) => boolean;
    indexOfPartial: (partial: string) => number;
    toObjectArray: (objName: string) => IArray<T>;
    toArray: () => Array<T>;
}

export interface IObject {
    extend: (data: any) => IObject;
    toObject: () => any;
}
