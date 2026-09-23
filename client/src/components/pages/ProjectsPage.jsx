import { useState} from "react";
import verdeLatente1 from "../../assets/verde-latente1.jpg";
import verdeLatente2 from "../../assets/verde-latente-2.jpg";
import imgIAV1 from "../../assets/iav-1.png"
import imgIAV2 from "../../assets/iav-4.png"

export default function ProjectsPage() {

    function Project(p){

        const [isOpen, setIsOpen] = useState(false);

        return (
            <div className="project">
                <a
                    href={p.body ? "" : p.link}
                    onClick = {(e) => {
                        if(p.body){
                            e.preventDefault();
                            setIsOpen(prev => !prev);
                        }
                    }}
                >{p.date ? p.date + " " + p.title : p.title}</a>

                {p.body && isOpen &&

                    <div className="proj-body">

                        {
                            p.body.texts?.map((t, index) => (
                                <p key={index}>{t}</p>
                            ))
                        }

                        {
                            p.body.links?.map((l, index) => (
                                <a 
                                    key={index} 
                                    href={l.href}  
                                    style={{color: "#6b6375"}}
                                >{"<" + l.text + ">"}</a>
                            ))
                        }

                        {
                            p.body.images?.map((img, index) => (
                                <img 
                                    key={index} 
                                    alt={img.alt} 
                                    src={img.src}
                                />
                            ))
                        }
                        {
                            p.body.videos?.map((v, index) => (
                                <iframe
                                    key={index}
                                    width="560"
                                    height="315"
                                    src= {v.src}
                                    title= {v.title}
                                    allowFullScreen
                                />
                            ))
                        }
                    </div>
                }
            </div>
        )
    }

    return (
        <div className="projectspage">

            <p style={{ fontStyle: "italic" }}>{"Projects"}</p>

            <Project
                title = {"VFX Scream Study I'A'V'"}
                date = {"27/04/2026"}
                body = {{
                    texts: [
                        `Videoclip made in colaboration with I'A'V' for their music single "Scream Study" from the album "Volatile Poem" (SUC81, Sucata Tapes 2026)`,
                        `Visual effects were developed in Javascript using p5.js and ml5.js libraries. I runned a Max patcher to playback the clip and draw MIDI automation that was then sent to my browser program on playback, via WebMIDI.js.`
                    ],
                    links: [
                        {
                            href: "https://www.youtube.com/watch?v=uqjKHOBoTyY",
                            text: "Youtube Link"
                        },
                        {
                            href: "https://iaviaviav.bandcamp.com/album/volatile-poem",
                            text: "Album on Bandcamp"
                        }
                    ],
                    images: [
                        {
                            src: imgIAV1,
                            alt: "image of IAV clip 1"
                        },
                        {
                            src: imgIAV2,
                            alt: "image of IAV clip 2"
                        }
                    ]
                }}
            />

            <Project
                title = {"Verde Latente"}
                date = {"30/11/2024"}
                body = {{
                    texts: [
                        "This project was developed in collaboration with the photographer Joana Hintze, for an exhibition hosted by Solar gallery, in Vila do Conde.",
                        "The program consists of an algorithm developed to establish the contours of our virtual ecosystem as represented in the installation. It manifests itself through the different audiovisual elements present in the space. The fauna and flora are interpreted through the various multimedia forms of the installation, which consists of three dynamic images and six sound layers. The way these elements are presented varies according to the values of climate data charts from the year 2022 in Ponta Delgada. The goal was to simulate a small network between these elements and the variable environmental conditions in which they exist.",
                        "This project was developed in Cycling 74's Max. The sounds are all synthesized with native Max Msp tools only."
                    ],
                    
                    links: [
                        {
                            href: "https://www.youtube.com/watch?v=cpHmQD2QFPE",
                            text: "Youtube Link"
                        }
                    ],
                    images: [
                        {
                            src: verdeLatente1,
                            alt: "image of the instalation 1"
                        },
                        {
                            src: verdeLatente2,
                            alt: "image of the instalation 2"
                        }
                    ]
                }}
            />

            <p style={{ fontStyle: "italic" }}>{"<Music>"}</p>

            <Project
                title = {"toplap.pt Algorave Lisbon"}
                date = {"08/04/2026"}
                link = {"https://franzacom.bandcamp.com/track/algorave-lisbon-08-04-2026"}
            />

            <p style={{ fontStyle: "italic" }}>{"<Max MSP>"}</p>

            <Project
                title = {"MBMC Musicbox"}
                body = {{
                    texts: [
                        "This is a patch I made when thinking of a project with a visual artist friend of mine. We wanted to do a small visual and sonic instalation and we were thinking of some sort of music box piece. I started this project thinking of it as the program driving it. Maybe me and Débora will get back at it one day."
                    ],
                    videos: [
                        {
                            src:"https://www.youtube.com/embed/StQ8SNIG5nI",
                            title:"Musicbox example video"
                        }
                    ]
                }}
            />

            <Project
                title = {"8SS Step Sequencer with Modulation"}
                link = {"https://github.com/Franxas/8SS-Step-Sequencer"}
            />

            <Project
                title = {"FMSyn Multi-channel Harmonics FM Synth"}
                link = {"https://github.com/Franxas/FMSyn-MCHarm"}
            />
        </div>
    )
}