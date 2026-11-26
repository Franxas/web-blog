import { useEffect, useRef } from "react";

export function Sketch(props) {
    const elemRef = useRef(null);

    useEffect(() => {
        const parentElem = elemRef.current;
        const element = createSketch(parentElem);

        return () => element.remove();
    }, []);

    function createSketch(parent) {

        const sketch = (p) => {
        
            p.setup = () => {
                const canvas = p.createCanvas(300, 300);
                canvas.parent(parent);
            }

            p.draw = () => {
                p.circle(p.width / 2, p.height / 2, 100);
            }
        }
        return new p5(sketch);
    }

    return <div ref={elemRef}></div>
}