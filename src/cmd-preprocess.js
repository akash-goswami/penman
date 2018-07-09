import LineModel from './line-model';

export default function cmdPreprocess (context) {
    const cmd = {};
    cmd.WRITE = (arg) => {
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
        lines.forEach(_ => context.operate(null, new LineModel(_)));
    };

    return cmd;
}
