export default class Word {
    constructor (text) {
        this._text = text;
        this._isSpace = text === '';
    }

    isSpace () {
        return this._isSpace;
    }

    length () {
        return this._isSpace ? 1 : this._text.length;
    }
}
