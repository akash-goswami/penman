export default class Chunk {
    constructor (text) {
        this.text = text;
        this.lineNo = null;
        this.col = null;
    }

    size () {
        return this.text.length;
    }
}
