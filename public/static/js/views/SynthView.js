import AbstractView from "./AbstractView.js";

export default class extends AbstractView {

    constructor() {
        super();
        this.setTitle('home###');
    }

    async getHTML() {

        await this.highlightAnchor();
        return `
            <div id="synthDiv" style="margin-top: 30px; display: flex; justify-content: center; touch-action: none">
                <div id="rnbo-parameter-sliders"> </div>
            </div>
        `;
    }

    async highlightAnchor() {

        const navDiv = document.querySelector("#nav");
        const navAnchs = Array.from(navDiv.children);
        navAnchs.forEach(e => {
            e.style.color = "black";
            e.style.backgroundColor = "white";
        });

        const homeAnch = document.getElementById("synth-anchor");
        homeAnch.style.color = "white";
        homeAnch.style.backgroundColor = "black";
    }
}