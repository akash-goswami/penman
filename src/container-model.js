export default class ContainerModel {
    constructor () {
        this.lines = [];
        this._mount = null;
        this._padding = [];
        this._lineHeight = null;
    }

    mount (sel) {
        this._mount = sel;
        return this;
    }

    padding (padding) {
        this._padding = padding;
        return this;
    }

    lineHeight (lh) {
        this._lineHeight = lh;
        return this;
    }

    size () {
        return this.lines.length;
    }

    operate (lines) {
        lines.forEach(l => this.__operateAtomic(l[0], l[1]));
        this.__updateContainerDimension();
        return this;
    }

    __updateContainerDimension () {
        this._mount.style('height', `${this._lineHeight * this.size() + 2 * this._padding[1]}`);
        return this;
    }

    __operateAtomic (index, line) {
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
