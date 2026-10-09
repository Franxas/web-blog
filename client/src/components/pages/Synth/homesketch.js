import undoImg from '../../../assets/undo.png';
export function createSketch() {

    // ============================= websockets =============================

    let strokesDict = [];
    let clientId = null;

    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const socket = new WebSocket(`${protocol}//${window.location.hostname}:3000`);
    socket.onopen = () => {
        console.log('CONNECTED');
    };

    socket.onmessage = (event) => {

        const messageData = JSON.parse(event.data);

        if (messageData.type === "connection") {
            clientId = messageData.clientId;
        } else if (messageData.type === "drawing data") {
            strokesDict = messageData.data;
        }
        console.log("data received");
        console.log(messageData);
        console.log(strokesDict);
    };

    socket.onclose = () => {
        console.log('DISCONNECTED');
    };

    socket.onerror = (error) => {
        console.error('WEBSOCKET ERROR:', error);
    };

    // ============================= websockets =============================

    const sketch = (p) => {

        let fzStroke = null;
        // ui elements
        let rgbPolys = [];
        let strokeColor = [0, 0, 0];
        let uiColorSel = { color: 0, mousePos: 0, state: false, colorVal: 0};
        let strokeThickness = 2;
        let uiStroke = {mousePos: 0, state: false, pos: {x: 30, y:40}, thicknessVal: 2};
        let uiUndo = {state: false};
        let undoImage;

        p.preload = () => {
            undoImage = p.loadImage(undoImg);
        };

        p.setup = () => {

            const canvas = p.createCanvas(800, 800);
            canvas.parent("p5sketch");
            p.background(228, 254, 252);
            p.rectMode(p.CENTER);
            createPolys();
        };

        p.draw = () => {
            
            p.background(255);
            drawUI();

            if (p.mouseIsPressed && fzStroke && isMouseLegal()) {

                fzStroke.setPos([p.mouseX, p.mouseY]);
                if(p.frameCount % 2 === 0) {
                    fzStroke.saveStroke();
                }
            } else if ((p.mouseIsPressed && fzStroke && !isMouseLegal())){
                fzStroke.setFinished();
            }

            if (fzStroke) {
                fzStroke.display();
            }

            if (isMouseLegal()) {
                p.push();
                    p.stroke(strokeColor);
                    p.strokeWeight(strokeThickness);
                    p.point(p.mouseX, p.mouseY);
                p.pop()
            }

            // ================== change depending on whats next with data
            if (strokesDict.length > 0) {

                strokesDict.forEach(s => {

                    p.push();
                        p.stroke(s.color);
                        p.strokeWeight(s.thickness);

                        for (let i = 1; i < s.pos.length; i++) {

                                let pCurr = s.pos[i];
                                let pPrev = s.pos[i - 1];
                                p.line(pPrev.x, pPrev.y, pCurr.x, pCurr.y);
                        }
                    p.pop();
                })
            }
            // ================== change depending on whats next with data

        };

        function drawUI() {

            // background ui rectangle
            p.push();
                p.fill(240);
                p.rect(95, 40, 190, 80, 10);
            p.pop();

            // thickness ui element
            p.push();
                p.noStroke();
                p.fill(strokeColor)
                p.circle(uiStroke.pos.x, uiStroke.pos.y, p.map(strokeThickness, 1, 30, 4, 38, true));
            p.pop();
            p.image(undoImage, 130, 20, 40, 40);

            // undo ui element
            if (uiUndo.state) {
                    p.tint(255, 255);
            } else {
                p.tint(255, 20);
            }

            // rba ui element
            for (let i = 0; i < rgbPolys.length; i++) {

                p.fill(...rgbPolys[i].color);
                p.stroke(240);
                p.strokeWeight(3);

                p.beginShape();

                for (let v of rgbPolys[i]) {
                    p.vertex(v.x, v.y);
                }
                p.endShape(p.CLOSE);
            }


        }

        function createPolys() {
            let cx = 90;
            let cy = 40;
            let r = 30;

            rgbPolys = [];

            for (let section = 0; section < 3; section++) {
                let vertices = [{ x: cx, y: cy }];
                let start = section * 2;

                for (let i = 0; i <= 2; i++) {
                    let angle = (start + i) * p.TWO_PI / 6 - p.PI / 6;

                    vertices.push({
                        x: cx + p.cos(angle) * r,
                        y: cy + p.sin(angle) * r
                    });
                }

                rgbPolys.push(vertices);
            }
            rgbPolys[0].color = [255, 0, 0, 20];
            rgbPolys[1].color = [0, 255, 0, 20];
            rgbPolys[2].color = [0, 0, 255, 20];
        }

        function isMouseLegal() {

            return !(
                        p.mouseX >= 0 - (strokeThickness / 2) &&
                        p.mouseX <= 190 + (strokeThickness / 2) &&
                        p.mouseY >= 0 - (strokeThickness / 2) &&
                        p.mouseY <= 80 + (strokeThickness / 2)
                    )
            
        }

        function isInsidePolygon(x, y, vertices) {
            let inside = false;

            for (let i = 0, j = vertices.length - 1; i < vertices.length; j = i++) {
                const a = vertices[i];
                const b = vertices[j];

                if ((a.y > y) !== (b.y > y) &&
                    x < (b.x - a.x) * (y - a.y) / (b.y - a.y) + a.x) {
                inside = !inside;
                }
            }

            return inside;
        }

        // logic for increasing svalues of ui elements (thickness and rgb)
        p.mouseDragged = () => {

            if (uiColorSel.state) {

                const startVal = uiColorSel.colorVal;
                
                strokeColor[uiColorSel.color] = startVal + p.map(p.mouseY - uiColorSel.mousePos, -50, 50, 255, -255, true);
                strokeColor[uiColorSel.color] = p.max(0, strokeColor[uiColorSel.color]);
                strokeColor[uiColorSel.color] = p.min(255, strokeColor[uiColorSel.color]);

                rgbPolys[uiColorSel.color].color[3] = p.map(strokeColor[uiColorSel.color], 0, 255, 20, 255);
                console.log(strokeColor[uiColorSel.color]);
            }

            if (uiStroke.state) {

                const startVal = uiStroke.thicknessVal;

                console.log(strokeThickness);

                strokeThickness = startVal + p.map(p.mouseY - uiStroke.mousePos, -50, 50, 29, -29, true);
                strokeThickness = p.max(1, strokeThickness);
                strokeThickness = p.min(30, strokeThickness);
            }

            

        }


        p.mousePressed = () => {

            for (let i = 0; i < rgbPolys.length; i++) {
                if (isInsidePolygon(p.mouseX, p.mouseY, rgbPolys[i])) {
                    console.log("Clicked polygon:", i);

                    uiColorSel.color = i;
                    uiColorSel.mousePos = p.mouseY;
                    uiColorSel.colorVal = strokeColor[i];
                    uiColorSel.state = true;

                    console.log(uiColorSel);
                    console.log(strokeColor[uiColorSel.color]);
                    
                    return;
                } else {
                    uiColorSel.state = false;
                }
            } 

            if (p.dist(p.mouseX, p.mouseY, uiStroke.pos.x, uiStroke.pos.y) < 30 / 2) {
                uiStroke.state = true;
                uiStroke.mousePos = p.mouseY;
                uiStroke.thicknessVal = strokeThickness;

            } else {
                uiStroke.state = false;
            }

            if (p.mouseIsPressed &&
                p.mouseX >= 130 &&
                p.mouseX <= 170 &&
                p.mouseY >= 20 &&
                p.mouseY <= 60) {
                    uiUndo.state = true;

                    let lastStrokeId;

                    socket.send(JSON.stringify({
                        type: "delete",
                        clientId
                    }));
                    
                    console.log(strokesDict.clientId);
                    console.log(lastStrokeId);

            }

            if (isMouseLegal()) {
                fzStroke = new FzStroke(strokeColor, strokeThickness);
            }
        }

        p.mouseReleased = () => {

            uiColorSel.state = false;
            uiStroke.state = false;
            uiUndo.state = false;

            if (fzStroke) {
                fzStroke.saveStroke();
                fzStroke.setFinished();
                fzStroke = null;
            }
        };

        class FzStroke {

            constructor(color, thickness) {

                this.strokeId = crypto.randomUUID();
                this.color = color;
                this.thickness = thickness;
                this.pos = [];
                this.isFinished = false;
                this.lastSentIndex = 0;
            }

            setFinished() {
                this.isFinished = true;
            }

            saveStroke() {

                if (!this.isFinished && this.pos.length > this.lastSentIndex) {

                    const targetPoints = this.pos
                        .slice(this.lastSentIndex)
                        .map(pos => ({
                            x: pos.x,
                            y: pos.y
                        }));

                    const data = {

                        type: "add",
                        strokeId: this.strokeId,
                        color: this.color,
                        thickness: this.thickness,
                        pos: targetPoints
                    }

                    socket.send(JSON.stringify(data));

                    this.lastSentIndex = this.pos.length;
                }
            }

            setPos(pos) {
                if (!this.isFinished) {
                    this.pos.push( p.createVector(...pos));
                }

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
        clearDrawings,
        socket

    };
}