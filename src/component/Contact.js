import { newDomNode } from "../dom.js";

export default class Contact {
    constructor(data) {
        this.icon = data.icon;
        this.title = data.title;
        this.alias = data.alias;
        this.href = data.href;
    }

    render() {
        this._node = newDomNode("div", {
            className: "item",
            _children: [
                newDomNode("img", {className: "icon", src: ["./static/icons", this.icon + ".svg"].join("/")}),
                newDomNode("div", {
                    className: "column",
                    _children: [
                        newDomNode("h5", {innerText: this.title}),
                        newDomNode("a", {innerText: this.alias, href: this.href})
                    ]
                })
            ]
        });
        return this._node;
    }
}