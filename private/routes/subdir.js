const express = require('express');
const router = express.Router();
const path = require('path');
const cloudinary = require('cloudinary').v2;
const multer  = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });
const Entry = require('../entry');


router.post('/upload-image', upload.single('image'), async (request, response) => {

    const data = await request.file;
    if(!request.file) {
        return response.status(400).json(
            {
            success: 0,
            error: 'No file uploaded'
            }
        )
    }

    cloudinary.uploader.upload_stream(
        (error, result) => {
            if (error) {
                return response.status(500).json({success: 0, error });
            }
            response.json({ success: 1, file: { url: result.secure_url } });
        }
    ).end(request.file.buffer);
})

// add entries to data base
router.post('/save-entry', async (req, res) => {

    const entryData = req.body;
    console.log('got a request to save Data');

    //creating a new Entry according to defined schema
    const entry = new Entry( {
    title: entryData.title,
    date: Date.now(),
    blocks: entryData.blocks
    })

    //saving entry in db and respose to client accordingly to success
    try {
        await entry.save();
        res.json({
            "success": true,
            "data": req.body,
            "message": "post saved successfully"
        });
        console.log(entry);

    } catch(error) {
        console.log(error);
        res.json({
            "success": false,
            "data": req.body,
            "message": "post could not be saved"
        });
    }
})


module.exports = router;