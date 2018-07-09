/* global describe, it, before, document */
/* eslint-disable no-unused-expressions */
/* eslint-disable guard-for-in */

import { expect } from 'chai';
import { Penman } from './';

const parseStyle = (obj) => {
    let str = '';

    for (let key in obj) {
        str += `${key}: ${obj[key]};`;
    }
    return str;
};

const el = (tag, attrs) => {
    const e = document.createElement(tag);

    for (let key in attrs) {
        let val = attrs[key];
        if (key.toLowerCase() === 'style') {
            val = parseStyle(val);
        }

        e.setAttribute(key, val);
    }

    return e;
};

const mount = (parent, e) => parent.appendChild(e);

describe('Penman', () => {
    let penman;

    before(() => {
        // Create dom element
        mount(document.body, el('div', {
            id: 'root',
            style: {
                height: '100px',
                width: '100px'
            }
        }));
        penman = new Penman();
    });

    describe('#mount', () => {
        it('Should calculate bBox when the mount point is set', () => {
            penman.mount('#root');
            expect({ height: 100, width: 100 }).to.deep.equal(penman.bbox);
        });
    });

    describe('#lines', () => {
        it('Should create new line models', () => {
            penman.command(Penman.Commands.WRITE,
                `
                This is first line
                This is second line

                This is third line
                `
            );
            expect(penman._containerModel.size()).to.equal(4);
        });
    });
});
