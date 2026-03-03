import AbstractView from "../AbstractView.js";

export default class EntryEditorView extends AbstractView {

    constructor() {
        super();
        this.setTitle('editor###');
    }

    async getHTML() {

        return `
            <h1>Entry Editor</h1>
            <label for="title">Title:</label>
            <input type="text" id="entry-title" name="title">
            <div id="editorjs"></div>
            <>
            <button [] id="submit-entry-button">submit</button>
        `
    }

    loadEditor() {
        this.editor = new EditorJS({

            tools: {
                header: Header,
                image: {
                    class: ImageTool,   // comes from the CDN
                    config: {
                        endpoints: {
                        byFile: '/api/upload-image', // your backend endpoint
                        byUrl: '/fetchUrl' // optional
                        }
                    }
                }
            }
        })

        const submitButton = document.getElementById("submit-entry-button");
        const titleInput = document.getElementById("entry-title");
        submitButton.addEventListener("click", async (e) => {
            e.preventDefault();
            const title = titleInput.value;
            console.log('testing title input value');
            console.log(title);
            this.controller.saveEntry(title, await this.editor.save());
        })    
    }

    previewEntry(entry) {


        

    }
}