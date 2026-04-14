import AbstractView from "./AbstractView.js";

export default class extends AbstractView {

    constructor() {
        super();
        this.setTitle('posts###');
    }

    async getHTML() {

        await this.highlightAnchor();
        return `
            <div id="entries-header" style="display: flex; margin-top: 10px">
                <p style="margin: 0px"><i>Entries</i></p>        
            </div>
            <ul id="entries-list" style="list-style-type: none; padding-left: 0;"></ul>
        `;
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
                await this.controller.showPreviewView(e);
            });
            listElem.appendChild(a);
            entryList.appendChild(listElem);
        }
    }

    async highlightAnchor() {

        const navDiv = document.querySelector("#nav");
        const navAnchs = Array.from(navDiv.children);
        navAnchs.forEach(e => {
            e.style.color = "black";
            e.style.backgroundColor = "white";
        });

        const homeAnch = document.getElementById("posts-anchor");
        homeAnch.style.color = "white";
        homeAnch.style.backgroundColor = "black";
    }

}