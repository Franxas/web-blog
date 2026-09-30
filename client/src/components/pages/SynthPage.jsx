import { useEffect, useRef, useState } from "react";

export default function SynthPage() {
    const [state, setState] = useState(false);

    const synthContext = useRef(null);
    const p5Instance = useRef(null);

    useEffect(() => {
        let cancelled = false;

        async function run() {
            const WAContext = window.AudioContext || window.webkitAudioContext;

            const context = new WAContext();

            const rawPatcher = await fetch("../../patch.export.json");
            const patcher = await rawPatcher.json();

            const device = await RNBO.createDevice({
                context,
                patcher
            });

            if (cancelled) {
                await context.close();
                return;
            }

            // Store these so cleanup can access them
            synthContext.current = {
                device,
                context
            };

            await init(device, context);
        }

        async function init(device, context) {
            device.node.connect(context.destination);

            device.parameters.forEach(parameter => {
                console.log(parameter.id);
                console.log(parameter.name);
            });

            createSketch(device);

            const masterFreqParam =
                device.parametersById.get("master_phasor_freq");

            const swingDiv =
                device.parametersById.get("impulses/swing_div");

            masterFreqParam.value = 0.5;
            swingDiv.value = 10;

            setState(true);

            // Resume audio after user interaction
            const resumeAudio = () => {
                context.resume();
            };

            document.addEventListener("click", resumeAudio);

            // Save this too so we can remove it later
            synthContext.current.resumeAudio = resumeAudio;
        }

        function createSketch(device) {
            const masterFreqParam =
                device.parametersById.get("master_phasor_freq");

            const swingDiv =
                device.parametersById.get("impulses/swing_div");

            const sketch = p => {
                let paramTarget = "";

                let xy_xpos = 100;
                let xy_ypos = 100;

                p.setup = () => {
                    const canvas = p.createCanvas(300, 200);
                    canvas.parent("synthDiv");
                };

                p.draw = () => {
                    let xy_knobCol = [255, 255, 255];

                    if (paramTarget === "xy") {
                        xy_knobCol = [255, 255, 100];

                        xy_xpos = p.constrain(p.mouseX, 0, 200);
                        xy_ypos = p.constrain(p.mouseY, 0, 200);

                        masterFreqParam.value =
                            p.map(
                                xy_xpos,
                                0,
                                200,
                                masterFreqParam.min,
                                masterFreqParam.max
                            ) / 20;

                        swingDiv.value =
                            swingDiv.max -
                            p.map(
                                xy_ypos,
                                0,
                                200,
                                swingDiv.min,
                                swingDiv.max
                            );
                    }

                    p.stroke(255);
                    p.fill(0);
                    p.rect(0, 0, 200, 200);

                    p.background(255, 255, 255, 0);

                    p.noStroke();
                    p.fill(xy_knobCol);
                    p.circle(xy_xpos, xy_ypos, 24);

                    p.fill(255);
                    p.rect(200, 0, 100, 200);
                };

                p.mousePressed = () => {
                    if (
                        p.mouseX >= 0 &&
                        p.mouseX <= 200 &&
                        p.mouseY >= 0 &&
                        p.mouseY <= 200
                    ) {
                        paramTarget = "xy";
                    }
                };

                p.mouseReleased = () => {
                    paramTarget = "";
                };
            };

            p5Instance.current = new p5(sketch);
        }

        run();

        // ========================================
        // THIS RUNS WHEN YOU LEAVE THE PAGE
        // ========================================

        return () => {
            cancelled = true;

            console.log("Leaving SynthPage - cleaning up");

            const synth = synthContext.current;

            if (synth) {
                // Remove click listener
                if (synth.resumeAudio) {
                    document.removeEventListener(
                        "click",
                        synth.resumeAudio
                    );
                }

                // Disconnect RNBO
                if (synth.device) {
                    synth.device.node.disconnect();
                }

                // Close AudioContext
                if (synth.context) {
                    synth.context.close();
                }
            }

            // Remove p5 sketch
            if (p5Instance.current) {
                p5Instance.current.remove();
                p5Instance.current = null;
            }

            synthContext.current = null;
        };

    }, []);

    return (
        <div id="synthDiv" className="synthDiv">
            <h3>testing Synth Page</h3>
        </div>
    );
}