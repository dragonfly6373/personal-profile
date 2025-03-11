import { newDomNode } from "../dom.js";

export default class Project {
    constructor(data) {
        this.title = data.title;
        this.href = data.href;
        this.description = data.description;
    }

    render() {
        this._node = newDomNode("div", {
            className: "item column",
            _children: [
                newDomNode("h4", { innerText: this.title }),
                newDomNode("a", { innerText: this.href, href: this.href }),
                newDomNode("p", { innerText: this.description }),
            ]
        });
        return this._node;
    }
}