/**
 * 
 */

// import moment from "moment";
import { newDomNode } from "./dom.js";
import Experience from "./component/Experience.js";
import Education from "./component/Education.js";
import Project from "./component/Projects.js";
import Skill from "./component/Skill.js";
import Contact from "./component/Contact.js";
import Activity from "./component/Activity.js";

export default class UserInfo {
    constructor(doc, data) {
        console.log("load", data);
        this._doc = doc;
        this.userInfo = data;
        this.bindDomNode();
        this.render();
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

        this.render();
    }

    loadGeneralInfo() {
        this.displayNameElem.innerText = this.getDisplayName();
        this.userAvatarElem.setAttribute("src", [this.userInfo.root_url, this.userInfo.avatar].join("/"));
        let lastExperience = this.userInfo.experiences[0];
        this.currentJobElem.innerText = lastExperience.title + " - " + lastExperience.company_name;
        // load ContactInfo
        this.userInfo.contact_infos.map(item => {
            this.contactsElem.appendChild(new Contact(item).render());
        });
        
        this.userInfo.abouts.forEach(item => {
            this.aboutsElem.appendChild(newDomNode("div", {className: "item", innerText: item}));
        });
        this.userInfo.summary.forEach(item => {
            this.summaryElem.appendChild(newDomNode("div", {className: "item", innerText: item}));
        });
    }

    getDisplayName() {
        return `${this.userInfo.first_name}, ${this.userInfo.last_name}`;
    }

    render() {
        this.loadGeneralInfo();

        // load Skills
        this.userInfo.skills.forEach(item => {
            this.skillsElem.appendChild(new Skill(item).render())
        });
        // load Experiences
        this.userInfo.experiences.forEach(item => {
            this.experiencesElem.appendChild(new Experience(item).render());
        });
        // load Projects
        this.userInfo.projects.forEach(item => {
            this.projectsElem.appendChild(new Project(item).render());
        });
        // load Education
        this.userInfo.educations.forEach(item => {
            this.educationsElem.appendChild(new Education(item).render());
        });
        // load Activities
        this.userInfo.activities.forEach(item => {
            this.activitiesElem.appendChild(new Activity(item).render());
        });
    }
}
