import { useEffect, useRef, useState } from "react";
import { createSketch } from "./homesketch.js";

export default function SynthPage() {
    const [state, setState] = useState(false);

    const synthContext = useRef(null);
    const p5Instance = useRef(null);

    useEffect(() => {

        let sketchP5 = createSketch();

        return () => {
            
            console.log(sketchP5.getDrawings());
            sketchP5.clearDrawings();
            sketchP5?.p5Sketch.remove();
            sketchP5 = null;
        }

    }, []);

    return (
        <>
            <h1 style={{ userSelect: "none" }}>Daily Shared Drawings. Add to it!</h1>
            <div id="p5sketch"></div>
        </>
    )
}