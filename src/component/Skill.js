import { newDomNode } from "../dom.js";

export default class Skill {
    constructor(data) {
        this.title = data.title;
        this.score = data.score;
    }

    render() {
        this._node = newDomNode("div", {
            className: "item column",
            _children: [
                newDomNode("span", { innerText: (this.title + " (" + this.score + "/10)") }),
                newDomNode("div", {
                    className: "progress-bar",
                    _children: [ newDomNode("div", {
                        className: "score",
                        _attributes: {style: ("width:" + (this.score * 10) + "%")}
                    })]
                })
            ]
        });
        return this._node;
    }
}