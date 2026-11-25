import { useEffect, useRef} from "react";

export function AHR(props) {

    const {
        setEnvVals,
        initVals,
        maxVals,
        minVals
    } = props;

    const elemRef = useRef(null);
    useEffect(() => {

        const parentElem = elemRef.current;
        const element = createSketch(parentElem);
        return () => element.remove();
    }, [])

    function createSketch(parent) {

        //sketch global variables
        let sections = [];
        let padding;
        let spacing;
        let maxOffset;
        let valDiffs = {
        };

        const sketch = (p) => {

            p.setup = () => {
                const canva = p.createCanvas(150, 100);
                canva.style("margin", "10px");
                canva.parent(parent);

                padding = 4; //should be the same value as radius?
                spacing = 8;
                maxOffset = (p.width / 3) - (padding / 1.5); // max value distance between sections

                valDiffs = {
                    "12": maxOffset,
                    "23": maxOffset,
                };

                sections.push(new Section(
                    p.createVector(padding, p.height - padding),
                    p.createVector(
                        p.map(initVals.att, 
                            minVals.att, maxVals.att, 
                            padding, 
                            padding + maxOffset, 
                            true
                        ),
                        padding
                    ),
                    [padding, padding + maxOffset]
                ));

                sections.push(new Section(
                    sections[0].getV2(),
                    p.createVector(
                        p.map(
                            initVals.hold,
                            minVals.hold, maxVals.hold, 
                            sections[0].getV2().x + spacing,
                            sections[0].getV2().x + maxOffset,
                            true
                        ),
                        padding
                    ),
                    [ sections[0].getV2().x + spacing, sections[0].getV2().x + maxOffset ]
                ));
                sections.push(new Section(
                    sections[1].getV2(),
                    p.createVector(
                        p.map(
                            initVals.rel,
                            minVals.rel, maxVals.rel, 
                            sections[1].getV2().x,
                            sections[1].getV2().x + maxOffset,
                            true
                        ),
                        p.height - padding
                    ),
                    [ sections[1].getV2().x, sections[1].getV2().x + maxOffset ]
                ));

                setEnvVals(getAHRValues());

            
            }

            p.draw = () => {
                p.clear();

                p.push();
                    p.noFill();
                    p.strokeWeight(1);
                    p.stroke(0);
                    p.rect(0, 0, p.width, p.height);
                p.pop();

                if (sections[0].getIsClicked()) {

                    let limit1 = sections[0].getXBounds()[0];
                    let limit2 = sections[0].getXBounds()[1];
                    const newX = p.constrain(p.mouseX, limit1, limit2);
                    sections[0].setV2(p.createVector(newX, padding));
                    sections[1].setV1(p.createVector(newX, padding));
                    sections[1].setV2(p.createVector(newX + valDiffs["12"], padding));
                    sections[2].setV1(p.createVector(newX + valDiffs["12"], padding));
                    sections[2].setV2(p.createVector(newX + (valDiffs["12"] + valDiffs["23"]), p.height - padding))

                    setEnvVals(getAHRValues());
                } else if (sections[1].getIsClicked()) {

                    let limit1 = sections[1].getXBounds()[0];
                    let limit2 = sections[1].getXBounds()[1];
                    const newX = p.constrain(p.mouseX, limit1, limit2);
                    sections[1].setV2(p.createVector(newX, padding));
                    sections[2].setV1(p.createVector(newX, padding));
                    sections[2].setV2(p.createVector(newX + valDiffs["23"], p.height - padding))

                    setEnvVals(getAHRValues());
                } else if (sections[2].getIsClicked()) {

                    let limit1 = sections[2].getXBounds()[0];
                    let limit2 = sections[2].getXBounds()[1];
                    const newX = p.constrain(p.mouseX, limit1, limit2);
                    sections[2].setV2(p.createVector(newX, p.height - padding));

                    setEnvVals(getAHRValues());
                }

                sections[2].display();
                sections[1].display();
                sections[0].display();

            }

            function getAHRValues() {

                let space = 0;
                let values = [];
                let targetMinVals = Object.values(minVals);
                let targetMaxVals = Object.values(maxVals);

                for (let i = 0; i < sections.length; i++) {

                    space = (i === 1) ? spacing : 0;
                    values.push(
                        p.map(sections[i].getV2().x, sections[i].getV1().x + space, sections[i].getV1().x + maxOffset, targetMinVals[i], targetMaxVals[i], true)
                    )
                }

                return {
                    att: values[0],
                    hold: values[1],
                    rel: values[2]
                }
            }

            p.mousePressed = () => {

                if (sections[0].isMouseOver()) {
                    sections[0].setToClicked();
                    valDiffs["12"] = Math.max(spacing, sections[1].getV2().x - sections[0].getV2().x);
                    valDiffs["23"] = Math.max(0, sections[2].getV2().x - sections[1].getV2().x);
                } else if (sections[1].isMouseOver()) {
                    sections[1].setToClicked();
                    valDiffs["23"] = Math.max(0, sections[2].getV2().x - sections[1].getV2().x);
                } else if (sections[2].isMouseOver()) {
                    sections[2].setToClicked();
                }

            }

            p.mouseReleased = () => {

                sections.forEach(section => section.seToUnclicked());

                for (let i = 1; i < sections.length; i++) {
                    let prevSectionMostRight = sections[i -1].getV2().x;
                    let offset = (i === 1) ? 8 : 0;
                    let newBounds = [prevSectionMostRight + offset, prevSectionMostRight + maxOffset]; // here 8 is the diameter value of eact circle in each section
                    sections[i].setXBounds(newBounds);
                }
            }

            class Section {

                    constructor(v1, v2, xBounds) {

                        this.v1 = v1; // vector representing the fixed point
                        this.v2 = v2; // vector representing the variable point
                        this.xBounds = xBounds; // array representing the x limits on the canva
                        this.diameter = 8;
                        this.isClicked;
                    }

                    setXBounds(xBounds) {
                        this.xBounds = xBounds;
                    }

                    getXBounds() {
                        return this.xBounds;
                    }

                    isMouseOver() {
                        return (p.dist(p.mouseX, p.mouseY, this.v2.x, this.v2.y) < this.diameter);
                    }

                    setToClicked() {
                        this.isClicked = true;
                    }

                    seToUnclicked() {

                        if (this.isClicked) {
                            this.isClicked = false;
                        }
                    }

                    getIsClicked() {
                        return this.isClicked;
                    }

                    getV1() {
                        return this.v1;
                    }

                    setV1(v1) {
                        this.v1 = v1;
                    }

                    getV2() {
                        return this.v2;
                    }

                    setV2(v2) {
                        this.v2 = v2;
                    }

                    display() {

                        p.push();
                            p.strokeWeight(1);
                            p.line(this.v1.x, this.v1.y, this.v2.x, this.v2.y);
                        p.pop();

                        p.push();
                            p.noStroke();
                            p.fill(120);
                            p.circle(this.v1.x, this.v1.y, this.diameter);
                        p.pop();
                        p.push();
                            p.noStroke();
                            if (this.isClicked) {
                                p.fill(200);
                            } else {
                                p.fill(120);
                            }                                
                            p.circle(this.v2.x, this.v2.y, this.diameter);
                        p.pop();
                    }

            }

        }
        return new p5(sketch);
    }

    return <div ref={elemRef} />
}