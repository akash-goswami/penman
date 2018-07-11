import { transition } from 'd3-transition';
import { easeLinear } from 'd3-ease';
import { flat } from './utils';

export default class Container {
    constructor () {
        this.lines = [];
        this._mount = null;
        this._padding = [];
        this._lineHeight = null;
        this._charWidth = null;
        this._transition = {
            word: transition().duration(16).ease(easeLinear),
            space: transition().duration(16).ease(easeLinear)

        };
    }

    mount (sel) {
        this._mount = sel;
        this._defs = sel.append('defs');
        this._g = sel.append('g').classed('pm-con', true);
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

    charWidth (cw) {
        this._charWidth = cw;
        return this;
    }
    size () {
        return this.lines.length;
    }

    operate (lines) {
        lines.forEach(l => this.__operateAtomic(l[0], l[1]));
        this.__updateContainerDimension();
        this.__draw();
        return this;
    }

    __configure () {
        this._g.attr('transform', `translate(${this._padding[0]},${this._padding[1] + this._lineHeight})`);
        return this;
    }

    __drawCharWise (clip, i, cumulativeDistance) {
        let id;
        return new Promise((res) => {
            id = setTimeout(() => {
                clip.attr('width', cumulativeDistance);
                clearTimeout(id);
                res();
            }, 75);
        });
    }

    async writeLine (lineNo) {
        const clip = this._defs.select(`#pm-m-${lineNo}`).select('rect');
        const line = this.lines[lineNo];
        const chunk = line.chunks[0];

        const arr = chunk.text;
        let cumulativeDistance = this._padding[0];
        for (let i = 0, l = arr.length; i < l; i++) {
            cumulativeDistance += this._charWidth;
            await this.__drawCharWise(clip, i, cumulativeDistance);
        }
    }

    __draw () {
        let chunks;

        // Define the clips
        let sel = this._defs
            .selectAll('clipPath')
            .data(chunks = flat(this.lines.map(l => l.chunks)));

        sel.exit().remove();

        sel
                        .enter()
                        .append('clipPath')
                        .attr('transform', `translate(-${this._padding[0]},-${this._padding[1] + this._lineHeight})`)
                        .merge(sel)
                        .attr('id', d => `pm-m-${d.lineNo}`)
                        .append('rect')
                        .attr('x', (d, i) => {
                            if (i && chunks[i - 1].lineNo === chunks[i].lineNo) {
                                return chunks[i - 1].size() * this._charWidth;
                            }
                            return 0;
                        })
                        .attr('y', d => d.lineNo * this._lineHeight + this._padding[1])
                        .attr('width', 0)
                        .attr('height', this._lineHeight);

        sel = this._g
            .selectAll('text')
            .data(chunks = flat(this.lines.map(l => l.chunks)));

        sel.exit().remove();

        sel
                        .enter()
                        .append('text')
                        .merge(sel)
                        .attr('x', (d, i) => {
                            if (i && chunks[i - 1].lineNo === chunks[i].lineNo) {
                                return chunks[i - 1].size() * this._charWidth;
                            }
                            return 0;
                        })
                        .attr('y', d => d.lineNo * this._lineHeight)
                        .attr('clip-path', d => `url(#pm-m-${d.lineNo})`)
                        .text(d => d.text);
    }

    __updateContainerDimension () {
        this._mount.style('height', `${this._lineHeight * this.size() + 2 * this._padding[1]}`);
        return this;
    }

    __operateAtomic (index, line) {
        let i;
        if (index === null) {
            i = this.lines.push(line);
            // @todo for rest of the cases as well update the index
            line.lineNo(i - 1);
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
