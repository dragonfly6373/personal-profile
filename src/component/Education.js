import { newDomNode } from "../dom.js"

export default class Education {
    constructor(data) {
        this.title = data.title
        this.school_name = data.school_name
        this.start_time = data.start_time
        this.end_time = data.end_time
        this.grade = data.grade
    }

    render() {
        let start = new Date(this.start_time).toGMTString().substr(8, 8);
        let end = new Date(this.end_time).toGMTString().substr(8, 8);
        this._node = newDomNode("div", {
            className: "this column",
            _children: [
                newDomNode("h4", {innerText: this.title}),
                newDomNode("em", {
                    innerText: this.school_name + (this.start_time && this.end_time ? ` (${start} - ${end})` : "")
                }),
                this.grade ? newDomNode("span", {innerText: "Grade: " + this.grade}) : ""
            ]
        });
        return this._node;
    }
}