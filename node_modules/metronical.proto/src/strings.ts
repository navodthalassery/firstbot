import { IString } from "./types";

/**
 * @module metronical.proto
 */

export function s(value: string): IString {
    return new _s(value);
}

class _s implements IString {
    private value: string;
    constructor(private readonly _value: string = "") {
        this.value = this._value;
    }
    public lower(): IString {
        this.value = this.value.toLocaleLowerCase();
        return this;
    }
    public upper(): IString {
        this.value = this.value.toUpperCase();
        return this;
    }
    public trim(): IString {
        this.value = this.value.replace(/^\s+|\s+$/g, "");
        return this;
    }
    public ltrim(): IString {
        this.value = this.value.replace(/^\s+/, "");
        return this;
    }
    public rtrim(): IString {
        this.value = this.value.replace(/\s+$/, "");
        return this;
    }
    public normalize(): IString {
        this.value = this.value.replace(/^\s*|\s(?=\s)|\s*$/g, "");
        return this;
    }
    public startsWith(part: string, pos?: number): boolean {
        return this.value.slice(0, part.length) == part;
    }
    public endsWith(part: string, pos?: number): boolean {
        return this.value.slice(part.length) == part;
    }
    public capFirst(): IString {
        if (this.value.length == 1) {
            this.value = this.value.toUpperCase();
            return this;
        }
        else if (this.value.length > 0) {
            let regex: RegExp = /^(\(|\[|"|')/;
            if (regex.test(this.value)) {
                this.value = this.value.substring(0, 2).toUpperCase() + this.value.substring(2);
                return this;
            }
            else {
                this.value = this.value.substring(0, 1).toUpperCase() + this.value.substring(1);
                return this;
            }
        }
        return null;
    }
    public capWords(): IString {
        let regexp: RegExp = /\s/;
        let words = this.value.split(regexp);
        if (words.length == 1) {
            return s(words[0]).capFirst();
        }
        else if (words.length > 1) {
            let result: string = '';
            for (let i = 0; i < words.length; i++) {
                if (s(words[i]).capFirst() !== null) {
                    result += s(words[i]).capFirst() + ' ';
                }
            }
            this.value = result.trim();
            return this;
        }
        return null;
    }
    public truncateWords(num: number): IString {
        let words: Array<string> = this.value.split(/\s+/);
        if (words.length > num) {
            this.value = words.slice(0, num).join(' ');
            return this;
        }
        this.value = words.join(' ');
        return this;
    }
    public truncateWordsWithHtml(num: number): IString {
        let tags: Array<string> = [];
        let truncation: string = this.truncateWords(num).toString();
        let matches: RegExpMatchArray = truncation.match(/<[\/]?([^> ]+)[^>]*>/g);
        for (let i: number = 0; i < matches.length; i++) {
            let opening: string = matches[i].replace('/', '');
            if (matches[i].indexOf('/') != -1 && tags.indexOf(opening) != -1) {
                (<any>tags).remove(opening);
            }
            else if (matches[i].indexOf('/') != -1) {
                continue;
            }
            else {
                tags.push(matches[i]);
            }
        }
        for (let i: number = 0; i < tags.length; i++) {
            truncation += tags[i].replace('<', '</').replace(/(\s*)(\w+)=("[^<>"]*"|'[^<>']*'|\w+)/g, '');
        }
        return s(truncation);
    }
    public stripHtml(): IString {
        let content: string = this.value.replace(/<[\/]?([^> ]+)[^>]*>/g, '');
        content = content.replace(/<style[^>]*>[\s\S]*?<\/style>/ig, '');
        content = content.replace(/<script[^>]*>[\s\S]*?<\/script>/ig, '');
        content = content.replace(/<!--[\s\S]*?-->/g, '');
        content = content.replace('&nbsp;', ' ');
        content = content.replace('&amp;', '&');
        this.value = content;
        return this;
    }
    public escapeHtml(): IString {
        let content: string = this.value.replace(/"/g, '&quot;');
        content.replace(/&(?!\w+;)/g, '&amp;');
        content.replace(/>/g, '&gt;');
        content.replace(/</g, '&lt;');
        this.value = content;
        return this;
    }
    public toBool(): boolean {
        if (this.isNullOrEmpty()) {
            return false;
        }
        else if (this.lower().toString() === "true" || this.lower().toString() === "1" || this.lower().toString() === "y" || this.lower().toString() === "t") {
            return true;
        }
        return false;
    }
    public contains(val: string): boolean {
        if (this.value.indexOf(val) !== -1) {
            return true;
        }
        return false;
    }
    public slugify(lower: boolean = true): IString {
        if (!lower) {
            this.value = this.lower().normalize().toString().replace(/[^a-z0-9]/gi, '-');
            return this;
        }
        this.value = this.normalize().toString().replace(/[^a-z0-9]/gi, '-');
        return this;
    }
    public getValueByKey(key: string): string {
        var collection: Array<string> = this.value.split(";");
        for (let i = 0; i < collection.length; i++) {
            if (s(collection[i]).contains(":")) {
                let pairs = collection[i].split(":");
                if (pairs[0] == key) {
                    return pairs[1];
                }
            }
        }
        return null;
    }
    public setValueByKey(key: string, replacement: string): IString {
        var collection: Array<string> = this.value.split(";");
        var returnCollection: Array<string> = [];
        for (let i = 0; i < collection.length; i++) {
            if (s(collection[i]).contains(":")) {
                let pairs = collection[i].split(":");
                if (pairs[0] == key) {
                    pairs[1] = replacement;
                }
                returnCollection.push(pairs.join(":"));
            }
        }
        return s(returnCollection.join(';'));
    }
    public isNullOrEmpty(): boolean {
        if (this.value === undefined || this.value === null || this.value.trim() === '') {
            return true;
        }
        return false;
    }
    public toString(): string {
        return this.value;
    }
}
