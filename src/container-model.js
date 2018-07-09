export default class ContainerModel {
    constructor () {
        this.lines = [];
    }

    size () {
        return this.lines.length;
    }

    operate (index, line) {
        if (index === null) {
            this.lines.push(line);
        }

        const len = this.lines.length;
        if (index > len) {
            index = len;
            this.lines[index] = line;
        } else if (line === null) {
            this.lines.splice(index, 1); // mutation
        }

        return this;
    }
}
