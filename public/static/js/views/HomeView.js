import AbstractView from "./AbstractView.js";

export default class extends AbstractView {

    constructor() {
        super();
        this.setTitle('home###');
    }

    async getHTML() {
        return `
            <h1>Welcome!</h1>
            <p>Hello! My name is Francisco, I’m a software engineer, sound artist, and multimedia programmer. I'm also an everyday always learning and studying enthusiast. I work with Max/MSP, as well as with Java and JavaScript environments, where I like to explore cross-disciplinary intersections through the conception and development of different algorithms and programs. I encourage practice and experimentation as the starting point for my working materials and projects. I’m based in Lisbon if you ever want to meet and talk about project ideas / colabs or maybe you are some place away, in any case, feel free to contact me.</p>
        `;
    }
}