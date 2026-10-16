import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { BlockNoteSchema, defaultBlockSpecs, createHeadingBlockSpec } from "@blocknote/core";
import parse from "html-react-parser";
import DOMPurify from "dompurify";

export default function EntryEditor() {

    const { id } = useParams();
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

    // defining the featured block types
    const schema = BlockNoteSchema.create({
        blockSpecs: {
            paragraph: defaultBlockSpecs.paragraph,
            heading: createHeadingBlockSpec({
                levels: [1, 2, 3],
                allowToggleHeadings: false,
            }),
            bulletListItem: defaultBlockSpecs.bulletListItem,
            numberedListItem: defaultBlockSpecs.numberedListItem,
            image: defaultBlockSpecs.image,
        },
    });

    async function loadEntry() {
        
        try {
            const response = await fetch(`/api/entries/${id}`);
            const data = await response.json();

            const html = new DOMParser().parseFromString(
                data.data.textContent,
                "text/html"
            );

            const blocks = await editor.tryParseHTMLToBlocks(
                html.body.innerHTML
            );

            editor.replaceBlocks(editor.document, blocks);
            //setTextContent(data.data.textContent);
            //setTitle(data.data.title);

            setEntryData({
                title: data.data.title,
                date: data.data.date,
                textContent: data.data.textContent,
                _id: data.data._id
            })


        } catch(error) {
            console.log("couldnt load entry");
            console.log(error);
        }
    }

    async function uploadFile(file) {
        try {
            const formData = new FormData();
            formData.append("image", file);

            const response = await fetch("/api/upload-image", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Image upload failed");
            }

            const data = await response.json();
            console.log(data);

            if (!data.success || !data.file?.url) {
                throw new Error(data.error || "Image upload failed");
            }

            console.log("Image URL:", data.file.url);

            return data.file.url;

        } catch (error) {
            console.error("Image upload error:", error);
            throw error;
        }
    }

    async function saveEntry() {
      
        if (entryData.title == null || 
            entryData.title.trim() === "" ||
            entryData.textContent == null || 
            entryData.textContent.trim() === "" ) {

                console.log("no title or text content has been inputed")
                return;
        }

        try {
            const response = await fetch("/api/save-entry", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(entryData)
            });

            const result = await response.json();

            return result.data;

        } catch (error) {
            console.error("Error saving entry:", error);
        }                
    }

    const [entryData, setEntryData] = useState({
        title: "",
        date: null,
        textContent: "",
        _id: null
    });

    // Create a new editor instance
    const editor = useCreateBlockNote({schema, uploadFile});

    // preview text state
    const [textContent, setTextContent] = useState("");
    function handleChanges() {
        
        const html = editor.blocksToHTMLLossy(editor.document);
        setEntryData(prev => ({
            ...prev,
            textContent: DOMPurify.sanitize(html).replace(/[\uFFFC\uFFFD]/g, "")
        }));
    }

    useEffect(() => {

        checkAuth();
        if (!id) return;
        loadEntry();
    }, [id, editor]);

    // Render the editor
    return (
        <>
            <h3>Editor</h3>
            <form className="entryeditor-title-form">
                <label>
                    Title:
                    <input 
                        className="entryeditor-title-
                        input" type="text" 
                        name="name"
                        value={entryData?.title ?? ""}
                        onChange={(e) => {
                            //setTitle(e.target.value)
                            setEntryData(prev => ({
                                ...prev,
                                title: e.target.value
                            }))
                        }} 
                    />
                </label>
                <input 
                    type="submit"
                    onClick={async (e) => {
                        e.preventDefault();
                        const res = await  await saveEntry();
                        const newEntryID = res._id;
                        if (newEntryID) {
                           navigate(`/entries/${newEntryID}`);
                        }
                    }} 
                />
            </form>
            <BlockNoteView
                editor={editor} 
                onChange={handleChanges}
            />
            <h3
                style={{marginBottom:"0px"}}
            >Preview</h3>
            <div 
                className="editor-preview"
                style={{marginBottom:"8px", marginTop:"2px"}}
                >
                    {entryData && parse(entryData.textContent)}
            </div>
            <hr style={{
                border: 0,
                borderTop: "1px solid black",
                opacity: 1,
                width: "100%"
            }} />
        </>

    )
}