import AbstractView from "../AbstractView.js";

export default class extends AbstractView {

    constructor() {
        super();
        this.setTitle('admin home###');
    }

    async getHTML() {

        return `
            <h2>Admin Home</h1>
            <div id="entries-header" style="display: flex">
                <h4 style="margin: 0px">Entries</h4>        
                <a href="/admin/editor" style="margin-left:20px" data-link>New post</a>
            </div>
            <ul id="entries-list" style="list-style-type: none; padding-left: 0;"></ul>
        `
    }

    async listEntries(entries) {

        const entryList = document.getElementById("entries-list");
        
        for (let e of entries.reverse()) {
            const listElem = document.createElement("li");
            const a = document.createElement("a");
            a.textContent = e.date.split("T")[0] + " " + e.title;
            a.href = e._id;
            a.addEventListener("click", async event => {
                event.preventDefault();
                await this.controller.getPreviewController().showView(e);
            });
            listElem.appendChild(a);
            entryList.appendChild(listElem);
        }
    }
}