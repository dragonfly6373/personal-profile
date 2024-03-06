/**
 * 
 */

// import moment from "moment";

export default class UserInfo {
    constructor(doc, data) {
        console.log("load", data);
        this._doc = doc;
        this.userInfo = data;
        this.bindDomNode();
        this.loadDom();
    }

    bindDomNode() {
        this.displayNameElem = this._doc.querySelector("[id=displayName]");
        this.userAvatarElem = this._doc.querySelector("[id=userAvatar]");
        this.currentJobElem = this._doc.querySelector("[id=currentJob]");
        this.contactsElem = this._doc.querySelector("[id=contacts]");
        this.aboutsElem = this._doc.querySelector("[id=abouts]");
        this.summaryElem = this._doc.querySelector("[id=summary]");
        this.skillsElem = this._doc.querySelector("[id=skills]");
        this.experiencesElem = this._doc.querySelector("[id=experiences]");
        this.educationsElem = this._doc.querySelector("[id=educations]");
        this.projectsElem = this._doc.querySelector("[id=projects]");
        this.activitiesElem = this._doc.querySelector("[id=activities]");
    }
    
    initElement({displayNameElem, userAvatarElem, currentJobElem, contactsElem, aboutsElem, skillsElem, experiencesElem, educationsElem, projectsElem, activitiesElem}) {
        this.displayNameElem = displayNameElem;
        this.userAvatarElem = userAvatarElem;
        this.currentJobElem = currentJobElem;
        this.contactsElem = contactsElem;
        this.aboutsElem = aboutsElem;
        this.skillsElem = skillsElem;
        this.experiencesElem = experiencesElem;
        this.educationsElem = educationsElem;
        this.projectsElem = projectsElem;
        this.activitiesElem = activitiesElem;

        this.loadDom();
    }

    loadGeneralInfo() {
        this.displayNameElem.innerText = this.getDisplayName();
        this.userAvatarElem.setAttribute("src", [this.userInfo.root_url, this.userInfo.avatar].join("/"));
        let lastExperience = this.userInfo.experiences[0];
        this.currentJobElem.innerText = lastExperience.title + " - " + lastExperience.company_name;
    }
    loadContactInfo() {
        this.userInfo.contact_infos.map(item => {
            this.contactsElem.appendChild(
                newDomNode("div", {
                    className: "item",
                    _children: [
                        newDomNode("img", {className: "icon", src: ["./static/icons", item.icon + ".svg"].join("/")}),
                        newDomNode("div", {
                            className: "column",
                            _children: [
                                newDomNode("h5", {innerText: item.title}),
                                newDomNode("a", {innerText: item.alias, href: item.href})
                            ]
                        })
                    ]
                })
            );
        });
    }

    loadSkills() {
        this.userInfo.skills.forEach(item => {
            this.skillsElem.appendChild(newDomNode("div", {
                className: "item column",
                _children: [
                    newDomNode("span", { innerText: (item.title + " (" + item.score + "/10)") }),
                    newDomNode("div", {
                        className: "progress-bar",
                        _children: [ newDomNode("div", {
                            className: "score",
                            _attributes: {style: ("width:" + (item.score * 10) + "%")}
                        })]
                    })
                ]
            }))
        });
    }

    loadExperiences() {
        this.userInfo.experiences.forEach(item => {
            let data = new Experience(item);
            this.experiencesElem.appendChild(newDomNode("div", {
                className: "item column",
                _children: [
                    newDomNode("h4", {innerText: data.title}),
                    newDomNode("em", {innerText: data.company + " · " + data.contract}),
                    newDomNode("em", {innerText: data.workTime}),
                    newDomNode("div", {
                        className: "column",
                        _children: data.projects.map((project) => {
                            return newDomNode("div", { className: "column", _children: [
                                project.name ? newDomNode("h4", { className: "content", innerText: project.name }) : null,
                                newDomNode("span", { className: "content", innerText: "Role: " + project.role }),
                                ...project.description.map(detail => newDomNode("span", { className: "content", innerText: detail }))
                            ]});
                        })
                    })
                ]
            }));
        });
    }

    loadEducation() {
        this.userInfo.educations.forEach(item => {
            let start = new Date(item.start_time).toGMTString().substr(8, 8);
            let end = new Date(item.end_time).toGMTString().substr(8, 8);
            this.educationsElem.appendChild(newDomNode("div", {
                className: "item column",
                _children: [
                    newDomNode("h4", {innerText: item.school_name}),
                    newDomNode("em", {innerText: item.title}),
                    (item.start_time && item.end_time) ? newDomNode("em", {innerText: start + " - " + end}) : null,
                    newDomNode("span", {innerText: "Grade: " + item.grade})
                ]
            }));
        });
    }

    loadActivities() {
        this.userInfo.activities.forEach(item => {
            this.activitiesElem.appendChild(newDomNode("div", {
                className: "item column",
                _children: [
                    newDomNode("img", {className: "icon", src: ["./static/icons", item.icon + ".svg"].join("/")}),
                    newDomNode("span", {innerText: item.title})
                ]
            }))

        });
    }

    getDisplayName() {
        return `${this.userInfo.mid_name} ${this.userInfo.first_name}, ${this.userInfo.last_name}`;
    }

    loadDom() {
        this.loadGeneralInfo();
        this.loadContactInfo();
        
        this.userInfo.abouts.forEach(item => {
            this.aboutsElem.appendChild(newDomNode("div", {className: "item", innerText: item}));
        });
        this.userInfo.summary.forEach(item => {
            this.summaryElem.appendChild(newDomNode("div", {className: "item", innerText: item}));
        });

        this.loadSkills();
        this.loadExperiences();
        this.loadProjects();
        this.loadEducation();
        this.loadActivities();
    }

    loadProjects() {
        this.userInfo.projects.forEach(item => {
            this.projectsElem.appendChild(newDomNode("div", {
                className: "item column",
                _children: [
                    newDomNode("h4", {innerText: item.title}),
                    newDomNode("a", {innerText: item.href, href: item.href}),
                    newDomNode("p", {innerText: item.description}),
                ]
            }));
        });
    }
}

function newDomNode(tagname, attrs) {
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

class Experience {
    constructor(data) {
        this.title = data.title;
        this.startTime = data.start_time;
        this.endTime = data.end_time;
        this.company = data.company_name;
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
}