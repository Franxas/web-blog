import AbstractController from "./AbstractController.js";
import glitchWindow from "../utils/utils.js";

export default class HomeController extends AbstractController {

    constructor() {
        super();
    }

    async showView() {
        document.querySelector('#app').innerHTML = await this.view.getHTML();
        await glitchWindow();
    }
}