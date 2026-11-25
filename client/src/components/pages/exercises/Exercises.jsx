import { NavLink } from "react-router";

export default function Exercises() {


    return (
        <>
            <p style={{ fontStyle: "italic" }}>These are a form of experimentation and practice. Every week (whenever possible) I come up with a small simple project and challenge my self to develop it. The goal is to try out diferent things and get familiar with tools. Also, despite these being very basic, not to ambitious projects, I'm hopefull they'll one day serve as good starting points for more interesting ideias.</p>
            <div>
                <ul>
                    <li>
                        <NavLink 
                            to="/exercises/wspainter"
                        >WS Painter</NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/exercises/editor"
                        >Text Editor</NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/exercises/guiroom"
                        >Simple GUIs</NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/exercises/magicoctagon"
                        >Magic Octagon</NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/exercises/weather"
                        >Weather</NavLink>
                    </li>
                </ul>
            </div>
        </>
    )
}