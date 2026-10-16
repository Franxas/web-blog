import {useState, useEffect} from "react"
import { useParams } from "react-router";
import parse from "html-react-parser";

export default function EntryPreviewPage(props) {
    
    const [entryData, setEntryData] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        async function getEntryData() {
            try {
                const response = await fetch(`/api/entries/${id}`);
                const data = await response.json();

                setEntryData(() => {
                    
                    return {
                        title: data.data.title,
                        date: data.data.date,
                        textContent: data.data.textContent
                    }
                });
                console.log(data.data);

            } catch (error) {
                console.error("couldn't get entry data from server");
                console.error(error);
            }

        }

        getEntryData();
    }, []);
    

    return (
        <div className="entry">
            <p style={{ fontStyle: "italic" }}>{entryData && entryData.title + " | posted on " + entryData.date.split("T")[0]}</p>
            <div>
                {entryData && parse(entryData.textContent)}
            </div>
        </div>
    )

}