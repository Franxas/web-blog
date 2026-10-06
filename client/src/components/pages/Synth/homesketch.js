export function createSketch() {

    let strokesDict = [];

    const sketch = (p) => {

        let fzStrokes = [];

        // ui elements
        let colorP;
        let thicknessS;
        let undoB;

        p.setup = () => {
            const canvas = p.createCanvas(window.innerWidth, window.innerHeight);

            canvas.position(0, 0);
            canvas.style('position', 'fixed');
            canvas.style('z-index', '-1');

            createUI();
        };

        p.draw = () => {

            p.background(228, 254, 252);
            
            p.push();
                p.fill(100);
                p.noStroke();
                p.rect(window.innerWidth - 300, window.innerHeight - 100, 250, 80);                
            p.pop();
            p.push();
                p.fill(255);
                p.text("Thickness", window.innerWidth - 262, window.innerHeight - 65)
            p.pop();
            
            if (p.mouseIsPressed && fzStrokes.length > 0 && isMouseLegal()) {
                fzStrokes[fzStrokes.length - 1].setPos([p.mouseX, p.mouseY]);
            } else if ((p.mouseIsPressed && fzStrokes.length > 0 && !isMouseLegal())){
                fzStrokes[fzStrokes.length - 1].setFinished();
            }

            fzStrokes.forEach(s => {
                s.display();
            })

        };

        function createUI() {

            thicknessS = p.createSlider(3, 40, 1, 0.1);
            thicknessS.size(80, 10);
            thicknessS.position(window.innerWidth - 280, window.innerHeight - 57);

            colorP = p.createColorPicker('black');
            colorP.size(35, 35);
            colorP.position(window.innerWidth - 175, window.innerHeight - 77);

            undoB = p.createButton("Undo");
            undoB.size(50, 35);
            undoB.position(window.innerWidth - 130, window.innerHeight - 77);
            undoB.mousePressed(() => {
                if (fzStrokes.length > 0) {
                    fzStrokes.pop();
                    strokesDict.pop();
                }
            });
        }

        function isMouseLegal() {

            return (
                    !( (p.mouseX > window.innerWidth - 300 &&
                        p.mouseX < window.innerWidth - 50 &&
                        p.mouseY > window.innerHeight - 100 &&
                        p.mouseY < window.innerHeight - 20) ||
                        p.mouseY < 50
                    )
            )
        }

        p.mousePressed = () => {

            if (isMouseLegal()) {
                fzStrokes.push( new FzStroke(colorP.value(), thicknessS.value()));
            }
        }

        p.mouseReleased = () => {
            if (fzStrokes.length > 0) {
                fzStrokes[fzStrokes.length - 1].saveStroke();
                fzStrokes[fzStrokes.length - 1].setFinished();
            }
        };

        class FzStroke {

            constructor(color, thickness) {

                this.color = color;
                this.thickness = thickness;
                this.pos = [];
                this.isFinished = false;
            }

            setFinished() {
                this.isFinished = true;
            }

            saveStroke() {

                if (!this.isFinished) {
                    strokesDict.push({
                        color: this.color,
                        thickness: this.thickness,
                        pos: this.pos.map(p => {
                            return {
                                x: p.x,
                                y: p.y
                            }
                        })
                    })
                }
            }

            setPos(pos) {
                if (!this.isFinished) {
                    this.pos.push( p.createVector(...pos));
                }

            }

            getPos() {
                return this.pos;
            }
            

            display() {

                p.push();

                    p.stroke(this.color);
                    p.strokeWeight(this.thickness);

                    for (let i = 1; i < this.pos.length; i++) {

                            let pCurr = this.pos[i];
                            let pPrev = this.pos[i - 1];
                            p.line(pPrev.x, pPrev.y, pCurr.x, pCurr.y);
                    }

                p.pop();
            }
            
        }

    };

    const p5Sketch = new p5(sketch);

    function getDrawings() {
        return strokesDict;
    }

    function clearDrawings() {
        strokesDict = [];
    }

    return {
        p5Sketch,
        getDrawings,
        clearDrawings

    };
}