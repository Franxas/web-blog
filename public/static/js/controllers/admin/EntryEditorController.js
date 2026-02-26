import AbstractController from "../AbstractController.js";

export default class EntryEditorController extends AbstractController {

    constructor() {
        super();
    }

    async saveEntry(entry) {

        console.log('testing entry:');
        console.log(entry);
        
        const response = await fetch('/api/save-entry', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(entry)
        });
        const data = await response.json();
        console.log(data);
    }

}