import { useState } from "react";
import { useNavigate } from "react-router";

export default function LoginPage() {

    const [passwordInput, setPasswordInput] = useState("");
    const navigate = useNavigate();

    function handleChange(e){
        setPasswordInput(e.target.value);
        console.log(e.target.value);
    } 

    async function login() {

        try{

            const response = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    passwordInput
                })
            });

            const data = await response.json();
            console.log(data.permission);

            if (!response.ok || !data.permission) {
                alert("Incorrect password");
                return;
            }

            navigate(`/admin/entrymanager`);

        } catch(error) {
            console.log(error);
        }
    }

    function handleSubmit(e){
        e.preventDefault();
        console.log("testing submit");
        console.log(passwordInput);

        login();
    }

    return (
        <>
            <p> testing login page</p>
            <form
                style={{marginBottom:"10px"}}    
                onSubmit={handleSubmit}
            >
                <input 
                    type="text"
                    value={passwordInput}
                    onChange={handleChange}
                    placeholder="Enter Admin Password"
                    style={{width: "250px"}}
                >
                </input>
                <input type="submit" value="Submit" />
            </form>
        </>
    )
}