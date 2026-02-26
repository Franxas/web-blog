import AbstractView from "../AbstractView.js";

export default class extends AbstractView {

    constructor() {
        super();
        this.setTitle('admin home###');
    }

    async getHTML() {

        return `
            <h2>Admin Home</h1>
            <a href="/admin/editor" data-link>New post</a>
            <h4>Posts</h4>
            <ul>
                <li><a href="/admin/editor">First post</a></li>
                <li><a href="/admin/editor">Second post</a></li>
                <li><a href="/admin/editor">Third post</a></li>
                <li><a href="/admin/editor">Fourth post</a></li>
            </ul>
        `
    }
}