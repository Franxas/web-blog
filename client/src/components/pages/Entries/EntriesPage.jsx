import {useState, useEffect} from "react"
import { Link } from "react-router";

export default function EntriesPage() {

    const [entriesList, setEntriesList] = useState([]);

    useEffect(() => {
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

        listAllEntries();
    }, []);
    
    return (

        <>
            <p style={{ fontStyle: "italic" }}>Entries</p>
            <ul>
                {entriesList.map(e => {
                    return (
                            <Link key={e.id} to={`/entries/${e.id}`}>
                                {e.date.split("T")[0] + " " + e.title}
                            </Link>
                    )
                })}
            </ul>
        </>
    )
}