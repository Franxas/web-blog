import {useState, useEffect} from "react"

export default function EntriesPage() {

    const [entriesList, setEntriesList] = useState([]);

    useEffect(() => {
        setEntriesList(getaAllEntries());
    }, []);

    async function getaAllEntries() {
        try {
            const response = await fetch('/api/entries');
            const data = await response.json();
            console.log(data);
            return data.data;
        } catch (error) {
            console.error('couldnt get entries from server');
            console.error(error);
        }
    }

    return <h3>testing Entries Page</h3>
}