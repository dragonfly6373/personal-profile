import { newDomNode } from "../dom.js";

export default class Experience {
    constructor(data) {
        this.title = data.title;
        this.startTime = data.start_time;
        this.endTime = data.end_time;
        this.company = data.company_name;
        this.url = data.url;
        this.contract = data.contract;
        this.kills = data.kills;
        this.projects = data.projects;
    }

    get duration() {
        if (!this.endTime) return "";
        let startDate = new Date(this.startTime);
        let endDate = new Date(this.endTime);
        let year = parseInt(endDate.getFullYear()) - parseInt(startDate.getFullYear());
        let month = parseInt(endDate.getMonth()) - parseInt(startDate.getMonth());
        if (month < 0) {
            year -= 1;
            month += 12;
        }
        if (year == 0) return month + " months";
        return (year + " yrs " + month + " mos");
    }

    get workTime() {
        let start = new Date(this.startTime).toGMTString().substr(8, 8);
        let end = this.endTime ? new Date(this.endTime).toGMTString().substr(8, 8) : "Present";
        return start + " - " + end + (this.duration ? " · " + this.duration : "");
    }

    render() {
        this._node = newDomNode("div", {
            className: "item column",
            _children: [
                newDomNode("h4", {innerText: this.title}),
                newDomNode("em", {innerText: this.company + " · " + this.contract}),
                newDomNode("em", {innerText: this.workTime}),
                newDomNode("div", {
                    className: "column",
                    _children: this.projects.map((project) => {
                        return newDomNode("div", { className: "column", _children: [
                            project.name ? newDomNode("h4", { className: "content", innerText: project.name }) : null,
                            newDomNode("span", { className: "content", innerText: "Role: " + project.role }),
                            ...project.description.map(detail => newDomNode("span", { className: "content", innerText: detail }))
                        ]});
                    })
                })
            ]
        });
        return this._node;
    }
}