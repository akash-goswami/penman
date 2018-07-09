import LineModel from './line-model';
import enums from './cmd-enum';

export default function cmdPreprocess (context) {
    const cmd = {};
    cmd[enums.WRITELINE] = (arg) => {
        let lines = arg.split('\n');

        let line;

        // Remove blank lines from beginning
        let si = -1;
        for (let i = 0, l = lines.length; i < l; i++) {
            line = lines[i];
            if (line.trim() === '') {
                si = i;
                continue;
            }
            break;
        }

        // Remove blank lines from end
        let ei = lines.length;
        for (let i = lines.length - 1; i >= 0; i--) {
            line = lines[i];
            if (line.trim() === '') {
                ei = i;
                continue;
            }
            break;
        }

        lines = lines.slice(si + 1, ei);
        let l;
        return lines.map((_) => {
            l = new LineModel(_);
            context.operate(null, l);
            return l;
        });
    };

    return cmd;
}
