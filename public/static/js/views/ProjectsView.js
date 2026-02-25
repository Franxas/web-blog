import AbstractView from "./AbstractView.js";

export default class extends AbstractView {

    constructor() {
        super();
        this.setTitle('projects###');
    }

    async getHTML() {
        return `
            <h1>Projects</h1>
            <ul id="projects-list"></ul>
        `;
    }
}