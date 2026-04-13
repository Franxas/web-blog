import AbstractController from "../AbstractController.js";

export default class AdminHome extends AbstractController {

    constructor() {
        super();
    }

    setPreviewController(previewController) {
        this.previewController = previewController;
    }

    getPreviewController() {
        return this.previewController;
    }

    async showView() {
        document.querySelector('#app').innerHTML = await this.view.getHTML();
        await this.view.listEntries(await this.getaAllEntries());
    }

    async getaAllEntries() {

        try {
            const response = await fetch('/api/entries');
            const data = await response.json();
            return data.data;
        } catch (error) {
            console.error('couldnt get entries from server');
            console.error(error);
        }
    }
}