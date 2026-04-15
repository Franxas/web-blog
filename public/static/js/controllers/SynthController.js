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
            // Each parameter has an ID as well as a name. The ID will include
            // the full path to the parameter, including the names of any parent
            // patchers if the parameter is in a subpatcher. So if the path contains
            // any "/" characters, you know that it's not a top level parameter.

            // Uncomment this line to include only top level parameters.
            // if (parameter.id.includes("/")) return;

            console.log(parameter.id);
            console.log(parameter.name);
        });

        await this.makeSliders(device);

        this.state = true;
        document.addEventListener("click", () => {

            context.resume();
        })
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
            // Subpatchers also have params. If we want to expose top-level
            // params only, the best way to determine if a parameter is top level
            // or not is to exclude parameters with a '/' in them.
            // You can uncomment the following line if you don't want to include subpatcher params
            
            //if (param.id.includes("/")) return;

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

    getState() {
        return this.state;
    }

}