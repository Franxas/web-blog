import { useState, useEffect } from "react";
import { BoxSlider } from "./ui/Boxslider";
import { AHR } from "./ui/AHR";
import { BoxAnim } from "./ui/BoxAnim";


export default function GUIRoom() {

    const [isAboutOn, setIsAboutOn] = useState(false);

    function About() {

        return (
            <>
                <p>
                    This exercise aimed at trying to create custom graphical user interface elements and combine some of React's features to do so. I used p5.js to both design and handle the element's interactivity logic as a unit. The p5.js sketch is loaded inside a React component that represents the element. This way, I can use features such as props and refs to make these elements both reusable and modular-friendly. In the sense that they can receive arbitrary maximum, minimum, and initial values as props, depending on what they'll be representing, while all the logic and rendering code stays abstracted.

                    In the case below, I am using these to set the box animation's maximum size and its growth motion timings. I know the sketch expects values from 0 to 100 (representing percentages) to set the maximum size the box can reach, and three values in milliseconds for the attack, hold, and release stages of the motion when clicked. So, in the case of the slider, I input a minimum value of 0 and a maximum value of 100, but these could be constrained, or I could input larger values if using it for other purposes. And for the function envelope, I set all stages to 5000 milliseconds, but I could also have set different values for different stages.
                </p>
            </>
        )
    }

    const [ boxVal, setBoxVal ] = useState();
    const [ envVals, setEnvVals ] = useState({ att: 0.00, hold: 0.00, rel: 0.00 });

    function displayBoxVal() {
        return <p>size: {boxVal}</p>
    }

    function displayEnvValues() {
        return <p>a: {Math.round(envVals.att)} h: {Math.round(envVals.hold)} r: {Math.round(envVals.rel)}</p>
    }

    return (
        <>
            <div style={{
                display:"flex",
                flexDirection:"column"
            }}>
                <p>Interact with the GUI elements and click on the animation</p>
                <a 
                    href=""
                    onClick={(e) => {
                        e.preventDefault()
                        setIsAboutOn(!isAboutOn);
                    }}
                >About</a>
                {isAboutOn && About()}
                <div className="wc-gui-all">
                    <div className="wc-gui">
                        <BoxSlider
                            setValue={setBoxVal}
                            minValue={0}
                            maxValue={100}
                            initialValue={60}
                        />
                        {displayBoxVal()}
                    </div>
                    <div className="wc-gui">
                        <AHR
                            setEnvVals= {setEnvVals}
                            initVals={{
                                att: 2000,
                                hold: 200,
                                rel: 1000
                            }}
                            minVals={{
                                att:0,
                                hold: 0,
                                rel: 0
                            }}
                            maxVals={{
                                att:5000,
                                hold: 5000,
                                rel: 5000
                            }}
                        />
                        {displayEnvValues()}
                    </div>


                    <div 
                        className="wc-gui"
                        style={{marginLeft:"100px"}}
                        
                    >
                        <BoxAnim
                            size={boxVal}
                            envVals={envVals}
                        />
                    </div>
                </div>
            </div>   
        </>     
    )
}