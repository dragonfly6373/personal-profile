import { newDomNode } from "../dom.js";

export default class Activity {
    constructor(data) {
        this.title = data.title;
        this.icon = data.icon;
    }

    render() {
        this._node = newDomNode("div", {
            className: "item column",
            _children: [
                newDomNode("img", {className: "icon", src: ["./static/icons", this.icon + ".svg"].join("/")}),
                newDomNode("span", {innerText: this.title})
            ]
        });
        return this._node;
    }
}
