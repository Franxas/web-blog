export default class AbstractController {

    constructor() {

    }
    
    setView(view) {
        this.view = view;
    }

    getView() {
        return this.view;
    }

    setService(service) {
        this.service = service;
    }

    async showView() {
        document.querySelector('#app').innerHTML = await this.view.getHTML();
    }
}