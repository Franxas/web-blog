import {useState, useEffect} from "react"
import { useNavigate } from "react-router";
import { Link } from "react-router";

export default function EntryManager() {

    const navigate = useNavigate();

    async function checkAuth() {
        try {
            const response = await fetch("/api/auth/me");

            if (!response.ok) {
                navigate(`/admin/login`);
                return false;
            }

            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    const [entriesList, setEntriesList] = useState([]);
    
    async function listAllEntries() {
        try {
            const response = await fetch("/api/entrieTitles");
            const data = await response.json();

            setEntriesList(data.data);
            
        } catch (error) {
            console.error("couldn't get entries from server");
            console.error(error);
        }
    }

    useEffect(() => {
        
        checkAuth();
        listAllEntries();
    }, []);

    async function deleteEntry(id) {
        console.log("calling delete test");
        try {
            const response = await fetch("/api/delete-entry", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({id: id})
            });

            const result = await response.json();

            console.log(result);

        } catch (error) {
            console.error("Error deleteing entry:", error);
        }     
    }
    
    return (

        <>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center"
                }}
            >
                <p style={{ fontStyle: "italic" }}>Entries</p>
                <Link 
                    style = {{marginLeft: "10px"}}
                    to={`/admin/entryeditor`}
                >
                    new entry
                </Link>
            </div>
            <ul>
                <div className="entry-at-manager">
                    {entriesList.map(e => {
                        return (
                            <div key={e.id} >
                                <Link 
                                    to={`/entries/${e.id}`}
                                >
                                    {e.date.split("T")[0] + " " + e.title}
                                </Link>
                                <Link 
                                    to={`/admin/entryeditor/${e.id}`}
                                    style={{marginLeft: "10px"}}
                                >
                                    edit
                                </Link>
                                <a
                                    style={{marginLeft: "10px"}}
                                    href=""
                                    onClick={async (a) => {
                                        a.preventDefault();
                                        await deleteEntry(e.id);   
                                        listAllEntries();                                     
                                    }}
                                >delete</a>
                            </div>
                        )
                    })}
                </div>
            </ul>
        </>
    )
}