import AbstractView from "./AbstractView.js";

export default class extends AbstractView {

    constructor() {
        super();
        this.setTitle('projects###');
    }

    async getHTML() {

        await this.highlightAnchor();
        return `
            <p style="margin: 0px; margin-top: 10px"><i>Projects</i></p>
            <ul class="projects-list" style="list-style-type: none; padding-left: 0;">
                <li><a href="/projects/test2">27/04/2026 VFX Scream Study I'A'V'</a></li>
                <li><a href="https://www.youtube.com/watch?v=cpHmQD2QFPE">30/11/2024 Verde Latente</a></li>
            </ul>
            <p style="margin: 0px;"><i>&lt;Music&gt;</i></p>
            <ul class="projects-list" style="list-style-type: none; padding-left: 0;">
                <li><a href="https://franzacom.bandcamp.com/track/algorave-lisbon-08-04-2026">08/04/2026 toplap.pt Algorave Lisbon</a></li>
            </ul>
            <p style="margin: 0px;"><i>&lt;Max MSP&gt;</i></p>
            <ul class="projects-list" style="list-style-type: none; padding-left: 0;">
                <li><a href="https://github.com/Franxas/8SS-Step-Sequencer">8SS Step Sequencer with Modulation</a></li>
                <li><a href="https://github.com/Franxas/MBMC-Musicbox">MBMC Musicbox</a></li>
                <li><a href="https://github.com/Franxas/FMSyn-MCHarm">FMSyn Multi-channel Harmonics FM Synth </a></li>
            </ul>
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



}