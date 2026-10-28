import { useEffect, useRef } from "react";

export function MagicOctagon(props) {

    const {
        type,
        setZCount,
        setYCount,
        zCount,
        yCount
    } = props;

    const zCountRef = useRef(zCount);
    const yCountRef = useRef(yCount);

    useEffect(() => {
        zCountRef.current = zCount;
    }, [zCount])

    useEffect(() => {
        yCountRef.current = yCount;
    }, [yCount])

    const uiRef = useRef(null);
    useEffect(() => {

        const parentElem = uiRef.current;
        const element = createSketch(parentElem);
        return () => element.remove();
    }, [])


    function createSketch(parent) {


        const sketch = (p) => {

            let yAmt;
            let zAmt;
            let currY;
            let currZ;

            
            p.setup = function () {
                const canva = p.createCanvas(170, 170, p.WEBGL);
                canva.style("margin", "10px");
                canva.parent(parent);

                yAmt = yCountRef.current ? yCountRef.current : 0; // 1 * 180
                zAmt = zCountRef.current ? zCountRef.current : 0;; // 1 * 45
                currY = yAmt;
                currZ = zAmt;
                if (type === "BACK") {
                    yAmt = 1;
                    currY = 1;
                }
            };

            p.draw = function () {
                p.clear();

                p.ambientLight(200);
                p.pointLight(150, 150, 150, -150, -150, 200);

                currY = yCountRef.current ? yCountRef.current : currY;
                currZ = zCountRef.current ? zCountRef.current : currZ;

                yAmt = p.lerp(yAmt, currY, 0.1);
                zAmt = p.lerp(zAmt, currZ, 0.1);



                p.rotateX(p.radians(p.map(p.mouseY, 0, p.height, 10, -10, true)));
                p.rotateY(p.radians(p.map(p.mouseX, 0, p.width, -10, 10, true) + yAmt * 180));
                p.rotateZ(p.radians(zAmt * 45));

                p.push();
                    p.ambientMaterial(200, 180, 200);
                    //shininess(200);
                    //p.metalness(30);
                    p.fill(255);
                    p.noStroke();
                    p.rotateX(p.radians(90));
                    p.cylinder(80, 10, 9);
                p.pop();

                if (type == "FRONT" || type === "BOTH") {
                    drawArrow(0, 5.01, [255, 0, 0]);
                }
                if (type == "BACK" || type === "BOTH") {
                    drawArrow(-90, -5.01, [255, 255, 0]);
                }
            };

            function drawArrow(rotDegr, zOffset, clr) {
                p.push();
                    p.specularMaterial(80);
                    p.translate(0, 0, zOffset);

                    p.rotateZ(p.radians(rotDegr));
                    p.noStroke();
                    p.fill(...clr);
                    p.beginShape();
                    p.vertex(0, -50); // point
                    p.vertex(30, -20); // right edge
                    p.vertex(15, -20);
                    p.vertex(15, 50); //bottom right
                    p.vertex(-15, 50); // bottom left
                    p.vertex(-15, -20);
                    p.vertex(-30, -20); // left edge
                    p.endShape(p.CLOSE);
                p.pop();
            }

            p.keyPressed = function () {
                if (p.keyCode === p.UP_ARROW) {
                    if (setZCount) {
                        setZCount(p => p+1);
                    }
                    currZ++;
                } else if (p.keyCode === p.DOWN_ARROW) {
                    if (setZCount) {
                        setZCount(p => p-1);
                    }
                    currZ--;
                } else if (p.keyCode === p.RIGHT_ARROW && type === "BOTH") {
                    if (setYCount) {
                        setYCount(p => p+1);
                    }
                    currY++;
                } else if (p.keyCode === p.LEFT_ARROW && type === "BOTH") {
                    if (setYCount) {
                        setYCount(p => p-1);
                    }
                    currY--;
                }
            };

        }
        return new p5(sketch);
    }



    return <div ref={uiRef} />
}