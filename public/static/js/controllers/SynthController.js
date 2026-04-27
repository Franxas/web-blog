import AbstractController from "./AbstractController.js";

export default class HomeController extends AbstractController {

    constructor() {
        super();
        this.state = false;
        this.synthContext = {};
    }

    async showView() {

        document.querySelector('#app').innerHTML = await this.view.getHTML();
        await this.run();
    }

    async run() {

        let WAContext = window.AudioContext || window.webkitAudioContext;
        let context = new WAContext();
        let device;

        const setup = async () => {

            let rawPatcher = await fetch("/static/patch.export.json")
            let patcher = await rawPatcher.json();

            device = await RNBO.createDevice({ context, patcher });
        };
        await setup();
        await this.init({device, context});
        this.synthContext = {device, context};
    }

    async init({device, context}) {

        device.node.connect(context.destination);
        // Print the names of all the top-level parameters in the device.
        device.parameters.forEach(parameter => {
            
            console.log(parameter.id);
            console.log(parameter.name);
        });

        // await this.makeSliders(device);
        await this.createSketch(device);
        this.state = true;
        document.addEventListener("click", () => {

            context.resume();
        })

        const masterFreqParam = device.parametersById.get("master_phasor_freq");
        const swingDiv = device.parametersById.get("impulses/swing_div");

        masterFreqParam.value = 0.5;
        swingDiv.value = 10;
    }

    async stop() {

        this.synthContext.device.node.disconnect();
    }

    async makeSliders(device) {

        let pdiv = document.getElementById("rnbo-parameter-sliders");
        let noParamLabel = document.getElementById("no-param-label");
        if (noParamLabel && device.numParameters > 0) pdiv.removeChild(noParamLabel);

        // This will allow us to ignore parameter update events while dragging the slider.
        let isDraggingSlider = false;
        let uiElements = {};

        device.parameters.forEach(param => {

            // Create a label, an input slider and a value display
            let label = document.createElement("label");
            let slider = document.createElement("input");
            let text = document.createElement("input");
            let sliderContainer = document.createElement("div");
            sliderContainer.appendChild(label);
            sliderContainer.appendChild(slider);
            sliderContainer.appendChild(text);

            // Add a name for the label
            label.setAttribute("name", param.name);
            label.setAttribute("for", param.name);
            label.setAttribute("class", "param-label");
            label.textContent = `${param.name}: `;

            // Make each slider reflect its parameter
            slider.setAttribute("type", "range");
            slider.setAttribute("class", "param-slider");
            slider.setAttribute("id", param.id);
            slider.setAttribute("name", param.name);
            slider.setAttribute("min", param.min);
            slider.setAttribute("max", param.max);
            if (param.steps > 1) {
                slider.setAttribute("step", (param.max - param.min) / (param.steps - 1));
            } else {
                slider.setAttribute("step", (param.max - param.min) / 1000.0);
            }
            slider.setAttribute("value", param.value);

            // Make a settable text input display for the value
            text.setAttribute("value", param.value.toFixed(1));
            text.setAttribute("type", "text");

            // Make each slider control its parameter
            slider.addEventListener("pointerdown", () => {
                isDraggingSlider = true;
            });
            slider.addEventListener("pointerup", () => {
                isDraggingSlider = false;
                slider.value = param.value;
                text.value = param.value.toFixed(1);
            });
            slider.addEventListener("input", () => {
                let value = Number.parseFloat(slider.value);
                param.value = value;
            });

            // Make the text box input control the parameter value as well
            text.addEventListener("keydown", (ev) => {
                if (ev.key === "Enter") {
                    let newValue = Number.parseFloat(text.value);
                    if (isNaN(newValue)) {
                        text.value = param.value;
                    } else {
                        newValue = Math.min(newValue, param.max);
                        newValue = Math.max(newValue, param.min);
                        text.value = newValue;
                        param.value = newValue;
                    }
                }
            });

            // Store the slider and text by name so we can access them later
            uiElements[param.id] = { slider, text };

            // Add the slider element
            pdiv.appendChild(sliderContainer);


        });
    }

    async createSketch(device) {

        // volume down testing
        const gainParam = device.parametersById.get("gain");
        const masterFreqParam = device.parametersById.get("master_phasor_freq");
        const swingDiv = device.parametersById.get("impulses/swing_div");


        //gainParam.value = 0;
        const params = device.parameters;

        const sketch = (p) => {


            let xpos;
            let ypos;

            p.setup = () => {
                const canvas = p.createCanvas(200, 200);
                canvas.parent('synthDiv');

                xpos = p.width / 2;
                ypos = p.height / 2;
            };

            p.draw = () => {
                if (p.mouseIsPressed) {

                    xpos = p.mouseX;
                    ypos = p.mouseY;
                    xpos = (xpos < 0) ? 0 : xpos;
                    xpos = (xpos > p.width) ? p.width : xpos;
                    ypos = (ypos < 0) ? 0 : ypos;
                    ypos = (ypos > p.height) ? p.height : ypos;

                    masterFreqParam.value = p.map(xpos, 0, p.width, masterFreqParam.min, masterFreqParam.max) / 20;
                    swingDiv.value = swingDiv.max - p.map(ypos, 0, p.height, swingDiv.min, swingDiv.max);
                }


                p.background(0);
                p.fill(255);
                p.noStroke()
                p.circle(xpos, ypos, 24);
            };
        };

        const myP5 = new p5(sketch);
    }

    getState() {
        return this.state;
    }

}