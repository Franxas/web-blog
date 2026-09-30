import {useState, useEffect} from "react"
import { useParams } from "react-router";

export default function EntryPage(props) {
    
    const [entryData, setEntryData] = useState();
    const { id } = useParams();

    useEffect(() => {
        async function getEntryData() {
            try {
                const response = await fetch(`/api/entries/${id}`);
                const data = await response.json();

                setEntryData(data.data);

            } catch (error) {
                console.error("couldn't get entry data from server");
                console.error(error);
            }
        }

        getEntryData();
    }, []);
    

    return (
        <div className="entry">
            <h3>{entryData?.title}</h3>
            <div>
                {entryData && entryData.blocks.map(b => {
                    if (b.type === "header") {
                        return <p style={{ fontStyle: "italic" }}>b.data.text</p>
                    } else if (b.type === "paragraph") {
                        return <p>{b.data.text}</p>
                    } else if (b.type === "image") {
                        return <img src={b.data.file.url}></img>
                    }
                })}
            </div>
        </div>
    )

}