import { useState } from "react";
import { MagicOctagon } from "./MagicOctagon";


export default function MagicOctDemo() {

    const [isAboutOn, setIsAboutOn] = useState(false);

    const [showAllViews, setShowAllViews] = useState(false)
    const [yCount, setYCount] = useState(0);
    const [zCount, setZCount] = useState(0);

    function About() {

        return (
            <>
                <p>
                    The Magic Octagon is an illusion explained in the video linked below by one of my favourite YouTube channels, Vsauce. It consists of a coin-like object with two perpendicular arrows, one on each side. Michael explains how and why the direction of each arrow can be surprisingly difficult to keep track of. Apparently, it's very hard for our brains to follow multiple flips across more than one axis, and only about 8% of people can correctly predict the outcome. There's no trick to it, just the one our minds play on us. Do watch the video for a better explanation!
                    I really like illusions and brain-melting experiences, so I thought I'd develop this simple interactive animation to help visualize the illusion and make it easier to understand.
                </p>
            </>
        )
    }

    return (
        <>
            <div style={{
                display:"flex",
                flexDirection:"column"
            }}>
                <p>Magic Octagon</p>
                <a 
                    href=""
                    onClick={(e) => {
                        e.preventDefault()
                        setIsAboutOn(!isAboutOn);
                    }}
                >About</a>
                {isAboutOn && About()}
                <a href="https://www.youtube.com/watch?v=1k1w1Q8vr5g&list=WL&index=30">Vsauce Magic Octagon youtube video</a>
                <p>Use your keyboard's arrows to rotate the octagon on its X and Z axis</p>
                <a
                    href=""
                    onClick={(e) => {
                        e.preventDefault();
                        setShowAllViews(p => { return !p });
                        e.currentTarget.blur();
                    }}
                >{showAllViews ? "Hide" : "Show"} both point of views</a>
                <div className="magic-oct">
                    <div className="coin">
                        <p>Switch</p>
                        <MagicOctagon
                            type={"BOTH"}
                            setYCount={setYCount}
                            setZCount={setZCount}
                            zCount={zCount}
                            yCount={yCount}
                        />
                    </div>
                    <div className="coin">
                        
                        {showAllViews && (
                            <>
                                <p>Front</p>
                                <MagicOctagon
                                    type={"FRONT"}                                    
                                    zCount={zCount}
                                />   
                            </>      
                        )}
                    </div>
                    <div className="coin">
                        
                        {showAllViews && (
                            <>
                                <p>Back</p>
                                <MagicOctagon                                
                                    type={"BACK"}                                
                                    zCount={zCount}
                                />
                            </>
                        )}            
                    </div>
                </div>
            </div>   
        </>     
    )
}