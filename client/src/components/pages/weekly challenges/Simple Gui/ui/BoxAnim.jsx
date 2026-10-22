import { useEffect, useRef } from "react";

export function BoxAnim(props) {
    const { envVals, size } = props;
    const elemRef = useRef(null);
    const envValsRef = useRef(envVals);
    const sizeRef = useRef(size);

    useEffect(() => {
        envValsRef.current = envVals;
    }, [envVals]);

    useEffect(() => {
        sizeRef.current = Math.min(100, size);
    }, [size]);

    useEffect(() => {
        const parentElem = elemRef.current;
        const element = createSketch(parentElem);

        return () => element.remove();
    }, []);

    function createSketch(parent) {
        let value = 0;
        let maxV = 100;

        // Set durations in milliseconds
        let attackMs = 0;
        let holdMs = 0;
        let realeaseMs = 0;

        let animating = false;
        let phase = "idle";
        let phaseStart = 0;
        let startValue = 0;

        const sketch = (p) => {
            p.setup = () => {
                const canvas = p.createCanvas(400, 400, p.WEBGL);
                canvas.parent(parent);
            };

            p.draw = () => {
                p.clear();

                attackMs = envValsRef.current.att;
                holdMs = envValsRef.current.hold;
                realeaseMs = envValsRef.current.rel;

                if (animating) {
                    let elapsed = p.millis() - phaseStart;

                    if (phase === "growing") {
                        let t = p.constrain(
                            elapsed / attackMs, 0, 1
                        );
                        t = t * t * (3 - 2 * t);

                        value = p.lerp(startValue, maxV, t);

                        if (elapsed >= attackMs) {
                            value = maxV;
                            phase = "holding";
                            phaseStart = p.millis();
                        }
                    }

                    else if (phase === "holding") {
                        value = maxV;

                        if (elapsed >= holdMs) {
                            phase = "shrinking";
                            phaseStart = p.millis();
                            startValue = value;
                        }
                    }

                    else if (phase === "shrinking") {
                        let t = p.constrain(
                            elapsed / realeaseMs, 0, 1
                        );
                        t = t * t * (3 - 2 * t);

                        value = p.lerp(startValue, 0, t);

                        if (elapsed >= realeaseMs) {
                            value = 0;
                            animating = false;
                            phase = "idle";
                        }
                    }
                }

                // Rotate both boxes
                let axis = p.createVector(1, 1, 0);
                p.rotate(0.5, axis);
                p.rotateY(p.frameCount * 0.01);

                // Outer wireframe box
                p.noFill();
                p.strokeWeight(1);
                p.stroke(0, 0, 0, 100);
                p.box(p.width * 0.59);

                // Inner solid box
                p.noStroke();
                p.fill(0, 0, 0, 100);

                let maxBoxSize = p.width * 0.59 * (sizeRef.current / 100);
                maxBoxSize = p.map(maxBoxSize, 0, p.width * 0.59, 5, p.width * 0.59, true);

                let innerSize = p.map(
                    value, 0, maxV, 5, maxBoxSize, true
                );

                p.box(innerSize);
            };

            p.mousePressed = () => {
                if (!animating && isMouseInsideCanvas()) {
                    animating = true;
                    phase = "growing";
                    phaseStart = p.millis();
                    startValue = value;
                }
            };

            function isMouseInsideCanvas() {
                return (
                    p.mouseX >= 0 &&
                    p.mouseX <= p.width &&
                    p.mouseY >= 0 &&
                    p.mouseY <= p.height
                );
            }
        };

        return new p5(sketch);
    }

    return <div ref={elemRef} />;
}