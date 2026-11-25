import { useEffect, useRef } from "react";

export function BoxSlider(props) {

    const {
        setValue,
        initialValue,
        minValue,
        maxValue
    } = props;

    const sliderRef = useRef(null);
    useEffect(() => {

        const parentElem = sliderRef.current;
        const element = createSketch(parentElem);
        return () => element.remove();
    }, [])

    function createSketch(parent) {

        //sketch glbal properties
        let value;
        let valueChange;
        let min, max;

        const sketch = (p) => {

            p.setup = () => {
                const canva = p.createCanvas(100, 100, p.WEBGL);
                canva.style("margin", "10px");
                canva.parent(parent);

                value = initialValue ? initialValue : 10;
                min = minValue ? minValue : 0;
                max = maxValue ? maxValue : 127;
                valueChange = {

                    prevValue: value,
                    prevMouseY: p.height / 2,
                    state: false
                };
                setValue(p.constrain(value, minValue, maxValue));
            }

            p.draw = () => {
                p.background(200, 0);

                if (valueChange.state) {

                    const deltaY = valueChange.prevMouseY - p.mouseY;

                    value = p.constrain(
                        value + deltaY * 1,
                        min,
                        max
                    );

                    valueChange.prevMouseY = p.mouseY;
                    setValue(value);
                }

                let axis = p.createVector(1, 1, 0);
                p.rotate(0.5, axis);
                
                p.noFill();
                p.strokeWeight(1);
                p.stroke(0, 0, 0, 100);
                p.box(p.width * 0.7, p.height * 0.7)

                p.noStroke();
                p.fill(0, 0, 0, 100);
                p.box(
                        p.map(value, min, max, 5, p.width * 0.7, true),
                        p.map(value, min, max, 5, p.height * 0.7, true)
                    );
            }

            p.mousePressed = () => {

                if (isMouseInBounds()) {
                    valueChange.prevValue = value;
                    valueChange.prevMouseY = p.mouseY;
                    valueChange.state = true;
                }
            }

            p.mouseReleased = () => {
                if (valueChange.state) {
                    valueChange.state = false;
                }
            }

            function isMouseInBounds() {

                    const halfW = p.width * 0.5;
                    const halfH = p.height * 0.5;

                    const dx = p.mouseX - p.width / 2;
                    const dy = p.mouseY - p.height / 2;

                    const angle = 0.5;
                    const cosA = Math.cos(angle);
                    const sinA = Math.sin(angle);

                    const localX = dx * cosA + dy * sinA;
                    const localY = -dx * sinA + dy * cosA;

                    return (
                        Math.abs(localX) < halfW &&
                        Math.abs(localY) < halfH
                    );

            }

        }
        return new p5(sketch);
    }



    return <div ref={sliderRef} />
}