import { select } from 'd3-selection';
import { bBox } from './utils';
import ContainerModel from './container-model';
import cmd from './commands';
import cmdPreprocessor from './cmd-preprocess';

export default class Penman {
    constructor () {
        this.bbox = null;
        this._containerModel = new ContainerModel();
        this._cmdr = cmd(this._containerModel);
        this._cmdpp = cmdPreprocessor(this._containerModel);

        this._config = null;
        this._mount = null;
    }

    static defaultConfig () {
        return {
            fontSize: 14,
            padding: [20, 20]
        };
    }

    config (...params) {
        if (params.length) {
            const defConf = this.constructor.defaultConfig();
            this._config = Object.assign(Object.assign({}, defConf), params[0]);
            return this;
        }

        return this._config;
    }

    mount (...params) {
        if (params.length) {
            this._mount = select(params[0]);
            this.bbox = bBox(this._mount);
            this._containerModel.mount(this._mount);
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
