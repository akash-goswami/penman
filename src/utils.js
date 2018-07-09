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


export const getLineHeight = (sl) => {
    const st = sl.useEllipsesOnOverflow(false).getSmartText('W');
    return Math.ceil(st.height * 1.2);
};

export const createSVG = (root, bbox) => {
    const svg = root.append('svg').attr('version', '1.1');
    svg.attr('width', `${bbox.width}px`);
    return svg;
};
