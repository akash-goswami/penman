/* global document */
import { select } from 'd3-selection';
import SmartLabelManager from 'fusioncharts-smartlabel';
import { bBox, getTextMes, createSVG } from './utils';
import Container from './container';
import cmd from './commands';
import cmdPreprocessor from './cmd-preprocess';

const prepareStyleForSmartLabel = config => ({
    fontSize: `${config.fontSize}px`,
    fontFamily: 'monospace',
    fontWeight: 'normal',
    fontStyle: 'normal'
});

export default class Penman {
    constructor (mount, config) {
        this._bbox = null;
        this._slm = new SmartLabelManager(+new Date(), document.body);
        this._container = new Container();
        this._cmdr = cmd(this._container);
        this._cmdpp = cmdPreprocessor(this._container);

        this._config = this.__config(config);
        [this._mount, this._bbox] = this.__mount(mount);

        this.__configure(this._config);
    }

    static defaultConfig () {
        return {
            fontSize: 12,
            padding: [8, 10],
            charDrawingTime: 32
        };
    }

    __configure (config) {
        this._slm.setStyle(prepareStyleForSmartLabel(config));
        const textMes = getTextMes(this._slm);
        this._container.padding(config.padding);
        this._container.lineHeight(textMes.height);
        this._container.charWidth(textMes.width);
        this._mount.style('font-size', `${config.fontSize}px`);
        this._container.__configure();

        return this;
    }

    __config (config) {
        const defConf = this.constructor.defaultConfig();
        return Object.assign(Object.assign({}, defConf), (config || {}));
    }

    __mount (mount) {
        mount = select(mount);
        let bbox = bBox(mount);
        this._container.mount(createSVG(mount, bbox));
        return [mount, bbox];
    }

    command (cmdName, param) {
        let fn;
        if (fn = this._cmdpp[cmdName]) {
            param = fn(param);
        }
        this._cmdr[cmdName](param);
        return this;
    }
}
