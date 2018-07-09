import Chunk from './chunk';

export default class Line {
    constructor (line) {
        this.chunks = [new Chunk(line)];
        this._lineNo = null;
    }

    lineNo (n) {
        this._lineNo = n;
        this.chunks.forEach(_chunk => (_chunk.lineNo = n));
        return this;
    }
}
