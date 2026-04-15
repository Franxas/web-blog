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
                <p><i>Synth</i></p>
                <div id="synthDiv">
                    <div id="rnbo-parameter-sliders">
                        <h2>Parameters</h2>
                        <em id="no-param-label">No parameters</em>
                    </div>
                </div>
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