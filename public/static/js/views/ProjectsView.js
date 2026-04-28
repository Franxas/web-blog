import AbstractView from "./AbstractView.js";

export default class extends AbstractView {

    constructor() {
        super();
        this.setTitle('proj');
    }

    async getHTML() {

        await this.highlightAnchor();
        return `
            <p style="margin: 0px; margin-top: 10px"><i>Projects</i></p>
            <ul class="projects-list" style="list-style-type: none; padding-left: 0;">
                <li>
                    <div>
                        <a id= "iav-anchor" href="">27/04/2026 VFX Scream Study I'A'V'</a>
                        <div id="iav" style="display: flex; align-items: flex-start; flex-direction: column"></div>
                    </div>
                </li>
                <li>
                    <div>
                        <a id="verde-latente-anchor" href="">30/11/2024 Verde Latente</a>
                        <div id="verde-latente" style="display: flex; align-items: flex-start; flex-direction: column"></div>
                    </div>
                </li>

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

    async init() {

        const vlAnch = document.getElementById("verde-latente-anchor");
        const vlDiv = document.getElementById("verde-latente");
        const iavAnch = document.getElementById("iav-anchor");
        const iavDiv = document.getElementById("iav");

        vlAnch.addEventListener("click", e => {

            e.preventDefault();
            
            if (vlDiv.children.length > 0) {

                while (vlDiv.firstChild) {
                    vlDiv.removeChild(vlDiv.firstChild);
                }
            } else {
                const img1 = document.createElement("img");
                img1.src = "/static/resources/verde-latente1.jpg";
                const img2 = document.createElement("img");
                img2.src = "/static/resources/verde-latente-2.jpg";
                const txt1 = document.createElement("p");
                const txt2 = document.createElement("p");
                const txt3 = document.createElement("p");
                const link1 = document.createElement("a");

                img1.style.margin = "5px";
                img2.style.margin = "5px";

                txt1.textContent = "This project was developed in collaboration with the photographer Joana Hintze, for an exhibition hosted by Solar gallery, in Vila do Conde."
                txt2.textContent = "The program consists of an algorithm developed to establish the contours of our virtual ecosystem as represented in the installation. It manifests itself through the different audiovisual elements present in the space. The fauna and flora are interpreted through the various multimedia forms of the installation, which consists of three dynamic images and six sound layers. The way these elements are presented varies according to the values of climate data charts from the year 2022 in Ponta Delgada. The goal was to simulate a small network between these elements and the variable environmental conditions in which they exist."
                txt3.textContent = "This project was developed in Cycling 74's Max. The sounds are all synthesized with native Max Msp tools only."
                link1.textContent = `<Youtube link>`
                link1.style.fontStyle = "italic";
                link1.href = "https://www.youtube.com/watch?v=cpHmQD2QFPE";
                vlDiv.appendChild(txt1);
                vlDiv.appendChild(txt2);
                vlDiv.appendChild(txt3);
                vlDiv.appendChild(link1);
                vlDiv.appendChild(img1);
                vlDiv.appendChild(img2);
            }
        })

        iavAnch.addEventListener("click", e => {

            e.preventDefault();
            
            if (iavDiv.children.length > 0) {

                while (iavDiv.firstChild) {
                    iavDiv.removeChild(iavDiv.firstChild);
                }
            } else {
                /* const img1 = document.createElement("img");
                const img2 = document.createElement("img");
                const img3 = document.createElement("img");
                img1.src = "/static/resources/iav-1.png";
                img2.src = "/static/resources/iav-2.png";
                img3.src = "/static/resources/iav-3.png";
                img1.style.margin = "5px";
                img2.style.margin = "5px";
                img3.style.margin = "5px"; */
                const txt1 = document.createElement("p");
                const txt2 = document.createElement("p");
                const link1 = document.createElement("a");
                txt1.textContent = `Videoclip made in colaboration with I'A'V' for their music single "Scream Study".`
                txt2.textContent = `Visual effects were developed in Javascript using p5.js and ml5.js libraries. I runned a Max patcher to playback the clip and draw MIDI automation that was then sent to my browser program on playback, via WebMIDI.js.`
                link1.textContent = `<Youtube link>`;
                link1.style.fontStyle = "italic";
                link1.href = "https://youtu.be/oIws9v1693Q";


                iavDiv.appendChild(txt1);
                iavDiv.appendChild(txt2);
                iavDiv.appendChild(link1);
                /* iavDiv.appendChild(img1);
                iavDiv.appendChild(img2);
                iavDiv.appendChild(img3); */
            }
        })

        


    }



}