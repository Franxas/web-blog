import React,{ useState } from "react";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { BlockNoteSchema, defaultBlockSpecs, createHeadingBlockSpec } from "@blocknote/core";

import parse from "html-react-parser";
import DOMPurify from "dompurify";

export default function Editor() {

    const [isAboutOn, setIsAboutOn] = useState(false);

    function About() {

        return (
            <>
                <p>
                    This is a simple WYSIWYG-type text editor. Since I'm in the process of rebuilding this website using React.js, and I was never too happy with the text editor I'm using (at the time of uploading this) for the entries section of it, I decided to get familiar with one that aims to work alongside React. I'm using BlockNote for this one, and I haven't added much more to the getting-started code besides limiting the block types and adding a preview section to show the results of transforming the editor data from JSON back into HTML. When applying this to the entries, blog-like section of the website, the editor data will first be sent to my server, saved in my database, and then loaded only when requested. Image-loading functionality will be added. My server can already receive a file-structured dataset and upload an image to the web, returning its URL so that it can then be loaded as an img element. This weekly challenge therefore extends to my entries preview section, so do check in there for more results.
                </p>
            </>
        )
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

    /* async function uploadFile(file) {
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
    } */

    // Create a new editor instance
    const editor = useCreateBlockNote({schema});

    // preview text state
    const [textContent, setTextContent] = useState("");
    function handleChanges() {
        
        // Converts the editor's contents from Block objects to HTML and store to state.
        const html = editor.blocksToHTMLLossy(editor.document);
        setTextContent(DOMPurify.sanitize(html).replace(/[\uFFFC\uFFFD]/g, ""));
    }

    // Render the editor
    return (
        <>
            <a 
                href=""
                onClick={(e) => {
                    e.preventDefault()
                    setIsAboutOn(!isAboutOn);
                }}
                style={{marginTop: "10px"}}
            >About</a>
            {isAboutOn && About()}
            <h3>Editor</h3>
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
                    {textContent && parse(textContent)}
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