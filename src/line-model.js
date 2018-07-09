export default class LineModel {
    constructor (line) {
        this.line = line;
    }

    cols () {
        return this.line.length;
    }
}
