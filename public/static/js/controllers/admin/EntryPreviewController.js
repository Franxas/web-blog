import AbstractController from "../AbstractController.js";

export default class EntryEditorController extends AbstractController {

    constructor() {
        super();
    }

    setEditorController(editorController) {
        this.editorController = editorController;
    }

    getEditorController() {
        return this.editorController;
    }

    async showView(entry) {
        console.log('testing preview');
        console.log(entry);
        document.querySelector('#app').innerHTML = await this.view.getHTML();
        await this.view.previewEntry(entry);
    }
}