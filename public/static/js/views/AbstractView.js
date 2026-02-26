export default class {

    constructor(){

    }

    setTitle(title) {
        document.title = title;
    }

    async getHTML() {
        return '';
    }

    setController(controller) {

        this.controller = controller;
    }

    getController() {

        return this.controller;
    }
    
}

