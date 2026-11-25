import { useEffect, useRef, useState } from "react";
import { createSketch } from "./homesketch.js";

export default function WSPainter() {

    const [isAboutOn, setIsAboutOn] = useState(false);

    function About() {

        return (
            <>
                <p>
                    Try drawing on the canvas using this computer while someone else draws on theirs. Through the use of WebSockets, you can share the canvas with other users on different devices (this was really aimed at computers only, so I'm not sure how well it'll work on other types of devices). The goal here was to get familiar with WebSockets and explore its possibilities. The graphics library combo seemed like an obvious option, so I developed this simple program to get a feel for things. Here, each user, instead of drawing directly on their p5.js canvas, sends the stroke data to the server, which then shares it with everyone connected. Everyone's browser is then populated with all previous user interactions. The "brush" size can vary as well as its color - those can be set using the interactive image elements. One can also undo their previous drawings made while in the current connection.
                </p>
            </>
        )
    }

    useEffect(() => {

        let sketchP5 = createSketch();

        return () => {
            
             if (sketchP5.socket.readyState === WebSocket.OPEN) {
                sketchP5.socket.close();
            }

            sketchP5.clearDrawings();
            sketchP5?.p5Sketch.remove();
            sketchP5 = null;
        }

    }, []);

    return (
        <>
            <p style={{ 
                fontStyle: "italic"
                }}>Shared canvas</p>
            <a 
                href=""
                onClick={(e) => {
                    e.preventDefault()
                    setIsAboutOn(!isAboutOn);
                }}
            >About</a>
            {isAboutOn && About()}
            <div id="p5sketch" style={{ touchAction: "none", marginTop: "10px", marginBottom: "10px" }}></div>
        </>
    )
}