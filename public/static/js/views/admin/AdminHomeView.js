import AbstractView from "../AbstractView.js";

export default class extends AbstractView {

    constructor() {
        super();
        this.setTitle('admin home###');
    }

    async getHTML() {

        return `
            <h2>Admin Home</h1>
            <a data-link href="/admin/editor">New post</a>
            <h4>Posts</h1>
            <ul>
                <a> [] First post</a>
                <a> Second post</a>
                <a> Third post</a>
                <a> Fourth post</a>
            </ul>
        `
    }
}