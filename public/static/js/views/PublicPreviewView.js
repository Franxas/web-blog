import AbstractView from "./AbstractView.js";

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
            </div>
        `
    }

    async previewEntry(entry) {

        const previewDiv = document.getElementById("preview");
        const entryTitle = document.createElement("p");
        entryTitle.textContent = entry.title;
        entryTitle.style.fontStyle = "italic";
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
    }
}