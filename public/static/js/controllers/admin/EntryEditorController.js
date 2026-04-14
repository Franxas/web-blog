import AbstractController from "../AbstractController.js";

export default class EntryEditorController extends AbstractController {

    constructor() {
        super();
    }

    async saveEntry(entryData) {

        const response = await fetch('/api/save-entry', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(entryData)
        });
        const data = await response.json();
        console.log(data);

        await this.previewController.showView(entryData);
    }

    setPreviewController(previewController) {
        this.previewController = previewController;
    }

    async showView(entry) {
        document.querySelector('#app').innerHTML = await this.view.getHTML();
        await this.view.loadEditor(entry);
    }

    



}