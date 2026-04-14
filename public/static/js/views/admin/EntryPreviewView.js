import AbstractView from "../AbstractView.js";

export default class extends AbstractView {

    constructor() {
        super();
        this.setTitle('editor###');
    }

    async getHTML() {

        return `
            <div id="preview">
            </div>
            <div id="options" style="margin-bottom: 50px">
                <a id="edit-anch" href="/admin/editor">edit</a>
                <a href="/">delete</a>
                <a href="/admin/home" data-link>manage</a>
            </div>
        `
    }

    async previewEntry(entry) {

        const previewDiv = document.getElementById("preview");
        const entryTitle = document.createElement("h1");
        entryTitle.textContent = entry.title;
        previewDiv.appendChild(entryTitle);

        for (const block of entry.blocks) {

            if (block.type === "header") {
                const b =  document.createElement("p");
                b.textContent = "<" + block.data.text + ">";
                b.style.fontStyle = "italic";
                previewDiv.appendChild(b);
            } else if (block.type === "paragraph") {
                const b =  document.createElement("p");
                b.textContent = block.data.text;
                previewDiv.appendChild(b);
            } else if (block.type === "image") {
                const b =  document.createElement("img");
                b.src = block.data.file.url;
                previewDiv.appendChild(b);
                // still deciding on ig I want to be able to add a caption to the images
            }
        }

        // assign this entry to the edit anchor event callback function
        const editAnch = document.getElementById("edit-anch");
        editAnch.addEventListener("click", (e) => {

            e.preventDefault();
            this.controller.getEditorController().showView(entry);
        })
    }
}