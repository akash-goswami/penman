/* global document */
import { select } from 'd3-selection';
import SmartLabelManager from 'fusioncharts-smartlabel';
import { bBox, getLineHeight, createSVG } from './utils';
import ContainerModel from './container-model';
import cmd from './commands';
import cmdPreprocessor from './cmd-preprocess';

const prepareStyleForSmartLabel = config => ({
    fontSize: config.fontSize,
    fontFamily: 'monospace',
    fontWeight: 'normal',
    fontStyle: 'normal'
});

export default class Penman {
    constructor () {
        this.bbox = null;
        this._slm = new SmartLabelManager(+new Date(), document.body);
        this._containerModel = new ContainerModel();
        this._cmdr = cmd(this._containerModel);
        this._cmdpp = cmdPreprocessor(this._containerModel);

        this._config = null;
        this._mount = null;

        this.__configure(this.constructor.defaultConfig());
    }

    static defaultConfig () {
        return {
            fontSize: 14,
            padding: [8, 10]
        };
    }

    __configure (config) {
        this._slm.setStyle(prepareStyleForSmartLabel(config));
        this._containerModel.lineHeight(getLineHeight(this._slm));
        this._containerModel.padding(config.padding);
        return this;
    }

    config (...params) {
        if (params.length) {
            const defConf = this.constructor.defaultConfig();
            this._config = Object.assign(Object.assign({}, defConf), params[0]);

            this.__configure(this._config);
            return this;
        }

        return this._config;
    }

    mount (...params) {
        if (params.length) {
            this._mount = select(params[0]);
            this.bbox = bBox(this._mount);
            this._containerModel.mount(createSVG(this._mount, this.bbox));
            return this;
        }

        return this._mount;
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
