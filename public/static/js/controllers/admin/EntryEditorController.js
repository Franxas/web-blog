import AbstractController from "../AbstractController.js";

export default class EntryEditorController extends AbstractController {

    constructor() {
        super();
    }

    async saveEntry(entryTitle, entryData) {

        console.log('testing entry:');
        console.log(entryTitle);
        console.log(entryData);

        entryData.title = entryTitle;
        
        const response = await fetch('/api/save-entry', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(entryData)
        });
        const data = await response.json();
        console.log(data);
    }

}