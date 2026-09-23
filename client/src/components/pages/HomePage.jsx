import { createSketch } from "../../p5/homesketch.js"
import { useEffect } from "react";

export default function HomePage() {

    /* useEffect(() => {

        const sketch = createSketch();

        return () => {
            sketch.remove();
        }
    }, [window.innerWidth, window.innerHeight]); */

    return (
        <div className="homepage">
            <div id="p5sketch"></div>
            <div className="links">
                <a href="https://github.com/Franxas" >@github</a>
                <a href="https://mastodon.social/@franxas">@mastodon</a>
                <a href="https://franzacom.bandcamp.com/track/algorave-lisbon-08-04-2026" >@bandcamp</a>
                <a href="https://soundcloud.com/franzscom">@soundcloud</a>
            </div>
            <p>Hello! My name is Francisco, I’m a computer musician, software engineer, and multimedia artist. I'm also an everyday always learning and studying enthusiast. I work with Max/MSP, as well as with Java and JavaScript environments, where I like to explore cross-disciplinary intersections through the conception and development of different algorithms and programs. I encourage practice and experimentation as the starting point for my work and projects. I’m based in Lisbon if you ever want to meet and talk about project ideas / collabs or maybe you are some place away, in any case, feel free to contact me.</p>
        </div>
    )
}