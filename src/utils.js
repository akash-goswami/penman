export const bBox = (mountPoint) => {
    const node = mountPoint.node();
    let bb;

    if (node.getBBox && (bb = node.getBBox())) {
        return {
            height: bb.height,
            width: bb.width
        };
    }

    return {
        height: node.offsetHeight,
        width: node.offsetWidth
    };
};


export const getTextMes = (sl) => {
    const text = 'ABCD EFGH IJKLMNO pqrst UVWXYZ 123456 789';
    const st = sl.useEllipsesOnOverflow(false).getSmartText(text);
    return {
        height: st.height,
        width: +(st.width / text.length).toFixed(1)
    };
};

export const createSVG = (root, bbox) => {
    const svg = root.append('svg').attr('version', '1.1');
    svg.attr('width', `${bbox.width}px`);
    svg.style('font-family', 'monospace');
    return svg;
};

export const flat = (arr) => {
    const resp = [];
    for (let i = 0, el; el = arr[i++];) {
        resp.push(...el);
    }

    return resp;
};
