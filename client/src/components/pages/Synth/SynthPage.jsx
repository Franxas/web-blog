import { useEffect, useRef, useState } from "react";
import { createSketch } from "./homesketch.js";

export default function SynthPage() {

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
            <h1 style={{ userSelect: "none" }}>Daily Shared Drawings. Add to it!</h1>
            <div id="p5sketch" style={{ touchAction: "none" }}></div>
        </>
    )
}