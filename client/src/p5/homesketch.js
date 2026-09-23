export function createSketch() {

    const sketch = (p) => {

        let points = [];
        let noiseOffset = 0;

        p.setup = () => {
            const canvas = p.createCanvas(window.innerWidth * 0.75, 80);
            canvas.parent('p5sketch');
        };

        p.draw = () => {

            p.background(228, 254, 252);

            if(p.mouseX > 0 && p.mouseX < p.width && p.mouseY > 0 && p.mouseY < p.height)
            points.push(p.createVector(p.mouseX, p.mouseY));

            for (let i = 0; i < points.length; i++) {

                const pnt = points[i];

                pnt.x += p.map(p.noise(noiseOffset + i * 10), 0, 1, -0.1, 0.1);
                pnt.y += p.map(p.noise(noiseOffset + i * 20), 0, 1, -0.1, 0.1);
            }

            noiseOffset += 0.01;

            for(let i = 1; i < points.length; i++) {
                
                const currP = points[i];
                const prevP = points[i - 1];
                p.line(currP.x, currP.y, prevP.x, prevP.y);
            }

        };
    };

    const myP5 = new p5(sketch);


    return myP5;
}