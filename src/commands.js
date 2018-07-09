import enums from './cmd-enum';

export default function cmd (context) {
    const cmdDef = {};
    cmdDef[enums.WRITELINE] = arg => new Promise((res, rej) => {
        console.log(arg);
    });

    cmdDef[enums.NEXTLINE] = arg => new Promise((res, rej) => {
        console.log(arg);
    });

    return cmdDef;
}
