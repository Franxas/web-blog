import AbstractView from "./AbstractView.js";

export default class extends AbstractView {

    constructor() {
        super();
        this.setTitle('home###');
    }

    async getHTML() {

        await this.highlightAnchor();
        return `
            <div style="margin-top: 10px">
                <a href="https://github.com/Franxas">github</a>
                <a href="https://mastodon.social/@franxas">mastodon</a>
                <a href="https://franzacom.bandcamp.com/">bandcamp</a>
            </div>
            <p>Hello! My name is Francisco, I’m a software engineer, sound artist, and multimedia programmer. I'm also an everyday always learning and studying enthusiast. I work with Max/MSP, as well as with Java and JavaScript environments, where I like to explore cross-disciplinary intersections through the conception and development of different algorithms and programs. I encourage practice and experimentation as the starting point for my work and projects. I’m based in Lisbon if you ever want to meet and talk about project ideas / colabs or maybe you are some place away, in any case, feel free to contact me.</p>
        `;
    }

    async highlightAnchor() {

        const navDiv = document.querySelector("#nav");
        const navAnchs = Array.from(navDiv.children);
        navAnchs.forEach(e => {
            e.style.color = "black";
            e.style.backgroundColor = "white";
        });

        const homeAnch = document.getElementById("home-anchor");
        homeAnch.style.color = "white";
        homeAnch.style.backgroundColor = "black";
    }
}