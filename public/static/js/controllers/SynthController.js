import AbstractController from "./AbstractController.js";

export default class HomeController extends AbstractController {

    constructor() {
        super();
    }

    async showView() {

        document.querySelector('#app').innerHTML = await this.view.getHTML();
        await this.run();
    }

    async run() {

        let WAContext = window.AudioContext || window.webkitAudioContext;
        let context = new WAContext();

        const setup = async () => {
            let rawPatcher = await fetch("/static/patch.export.json")
            let patcher = await rawPatcher.json();

            const device = await RNBO.createDevice({ context, patcher });

            // This connects the device to audio output, but you may still need to call context.resume()
            // from a user-initiated function.
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

        };

        setup();

        document.addEventListener("click", () => {

            context.resume();
        })
    }

}