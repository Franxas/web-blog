import AbstractView from "./AbstractView.js";

export default class extends AbstractView {

    constructor() {
        super();
        this.setTitle('posts###');
    }

    async getHTML() {
        return `
            <h1>posts</h1>
            <ul id="posts-list"></ul>
        `;
    }
}