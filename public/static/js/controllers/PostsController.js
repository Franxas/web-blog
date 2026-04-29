import AbstractController from "./AbstractController.js";
import glitchWindow from "../utils/utils.js";

export default class PostsController extends AbstractController {

    constructor() {
        super();
    }


    async showView() {
        document.querySelector('#app').innerHTML = await this.view.getHTML();
        await this.view.listEntries(await this.getaAllEntries());
    }

    async showPreviewView(entry) {
        document.querySelector('#app').innerHTML = await this.previewView.getHTML();
        await this.previewView.previewEntry(entry);
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

    setPreviewView(previewView) {
        this.previewView = previewView;
    }

    getPreviewView() {
        return this.previewView;
    }
}