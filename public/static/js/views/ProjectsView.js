import AbstractView from "./AbstractView.js";

export default class extends AbstractView {

    constructor() {
        super();
        this.setTitle('projects###');
    }

    async getHTML() {

        await this.highlightAnchor();
        return `
            <h1>Projects</h1>
            <ul id="projects-list"></ul>
        `;
    }

    async highlightAnchor() {

        const navDiv = document.querySelector("#nav");
        const navAnchs = Array.from(navDiv.children);
        navAnchs.forEach(e => {
            e.style.color = "black";
            e.style.backgroundColor = "white";
        });

        const homeAnch = document.getElementById("projs-anchor");
        homeAnch.style.color = "white";
        homeAnch.style.backgroundColor = "black";
    }

/*     async posH1() {

        const header = document.getElementById("franzacom");
        let franText = "franzaCom";
        let franArray = franText.split("");        
        header.textContent = "";

        let xOffset = 0;
        let yOffset = -30;
        let xOffRdm = Math.random() * 60;

        for (let i = 0; i < franArray.length; i++) {

            const span = document.createElement("span");
            span.textContent = franArray[i];

            const drop = Math.random() * 90 + 20; // random "drop" distance
            span.style.transform = `translate(${xOffset}px, ${yOffset}px)`;        
            header.appendChild(span);
            xOffset += xOffRdm;
            yOffset += drop;
        }
    }; */
}