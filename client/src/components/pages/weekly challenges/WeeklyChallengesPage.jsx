import { NavLink } from "react-router";

export default function WeeklyChallengesPage() {


    return (
        <>
            <p style={{ fontStyle: "italic" }}>These are a form of experimentation and practice. Every week (whenever possible) I come up with a small simple project and challenge my self to develop it. The goal is to try out diferent things and get familiar with tools. Also, despite these being very basic, not to ambitious projects, I'm hopefull they'll one day serve as good starting points for more interesting ideias.</p>
            <div>
                <ul>
                    <li>
                        <NavLink 
                            to="/wc/wspainter"
                        >WS Painter</NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/wc/editor"
                        >Text Editor</NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/wc/guiroom"
                        >Simple GUIs</NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/wc/magicoctagon"
                        >Magic Octagon</NavLink>
                    </li>
                </ul>
            </div>
        </>
    )
}