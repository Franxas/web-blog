import AbstractView from "./AbstractView.js";

export default class extends AbstractView {

    constructor() {
        super();
        this.setTitle('posts###');
    }

    async getHTML() {

        await this.highlightAnchor();
        await this.shuffleH1();
        return `
            <h1>posts</h1>
            <ul id="posts-list"></ul>
        `;
    }

    async highlightAnchor() {

        const navDiv = document.querySelector("#nav");
        const navAnchs = Array.from(navDiv.children);
        navAnchs.forEach(e => {
            e.style.color = "black";
            e.style.backgroundColor = "white";
        });

        const homeAnch = document.getElementById("posts-anchor");
        homeAnch.style.color = "white";
        homeAnch.style.backgroundColor = "black";
    }

    async shuffleH1() {

        const header = document.getElementById("franzacom");
        let franText = "franzaCom";
        let franArray = franText.split("");
        
        franArray = franArray
            .map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value);
        
        franText = "";
        for (let e of franArray) {
            franText += e;
        }
        header.textContent = franText;
        header.textContent = franText;
        header.style.letterSpacing = (Math.random() * 4) + "vw";
    }
}