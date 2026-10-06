import { NavLink } from "react-router";
export default function Header(props) {

    return (
        <nav className = "navbar">
            <NavLink 
                to="/" 
                style={({isActive}) => {
                    return{
                        color: isActive ? "#6b6375" : "black"
                    }
                }}
            >Home</NavLink>

            <NavLink 
                to="/entries" 
                style={({isActive}) => {
                    return{
                        color: isActive ? "#6b6375" : "black"
                    }
                }}
            >Entries</NavLink>

            <NavLink 
                to="/projects" 
                style={({isActive}) => {
                    return{
                        color: isActive ? "#6b6375" : "black"
                    }
                }}
            >Projects</NavLink>

            <NavLink 
                to="/synth" 
                style={({isActive}) => {
                    return{
                        color: isActive ? "#6b6375" : "black"
                    }
                }}
            >Synth</NavLink>
           
            <p className="title" style={{ userSelect: "none" }}>franzaCom</p>
        </nav>
    )
}