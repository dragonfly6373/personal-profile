

export function newDomNode(tagname, attrs) {
    let node = document.createElement(tagname);
    Object.entries(attrs).forEach(([key, val]) => {
        if (key == "_children" && val.length) {
            val.forEach(i => { if (i) node.appendChild(i)});
        } else if (key == "_attributes") {
            Object.entries(val).forEach(([k, v]) => {node.setAttribute(k, v)});

        } else {
            node[key] = val;
        }
    });
    return node;
}
