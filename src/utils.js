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
