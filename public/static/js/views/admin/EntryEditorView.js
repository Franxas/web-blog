import AbstractView from "../AbstractView.js";

export default class EntryEditorView extends AbstractView {

    constructor() {
        super();
        this.setTitle('editor###');
    }

    async getHTML() {

        //placeholder in input text with value of previous document when editing

        return `
            <h1>Entry Editor</h1>
            <div style="display: flex">
                <label for="title">Title:</label>
                <input 
                    type="text" 
                    id="entry-title" 
                    name="title" 
                    size="60"
                ></input>
                <div id="submit-div" style= "display: flex">
                    <button id="submit-entry-button" style="margin-left: 20px">submit</button>
                    <div id="error-mess" style= "color: red"></div>
                </div>
            </div>

            <div id="editorjs"></div>
        `
    }

    loadEditor(entry) {



        console.log("testing");
        console.log(entry);

        this.editor = new EditorJS({

            autofocus: true,
            tools: {
                header: Header,
                image: {
                    class: ImageTool,   // comes from the CDN
                    config: {
                        endpoints: {
                        byFile: '/api/upload-image', // backend endpoint
                        byUrl: '/fetchUrl' // optional
                        }
                    }
                }
            },
            data: entry
        })

        const submitButton = document.getElementById("submit-entry-button");
        const titleInput = document.getElementById("entry-title");

        if (entry) {
            titleInput.value = entry.title;
        }

        submitButton.addEventListener("click", async (e) => {
            e.preventDefault();
            const title = titleInput.value;
            if (!title) {
                const subDiv = document.getElementById("submit-div");
                const errMess = document.getElementById("error-mess");
                errMess.textContent = "need to enter a title";
                subDiv.appendChild(errMess);
            } else {
        
                const resulData = await this.editor.save();
                resulData.title = title;
                
                // so mayne somewhere in here I need to add an ID atribute to the resulting data. I can get this from the entrie that was passed as an argument to this function
                // maybe I can even have the title be an atribute instead of passing two arguments to the saveEntry controller func

                console.log("testing entries for id");
                resulData._id = (entry) ? entry._id : null;
                console.log(entry);
                console.log(resulData);
                this.controller.saveEntry(resulData);
            }
        })    
    }
}