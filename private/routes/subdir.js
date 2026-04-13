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
    console.log(entryData);
    let entry;
    try {
        if (!entryData._id) {
            //creating a new Entry according to defined schema
            entry = await Entry.create({
                title: entryData.title,
                date: Date.now(),
                blocks: entryData.blocks
            });
        } else {
            //updating entrie and sending res to client
            entry = await Entry.findByIdAndUpdate(entryData._id, entryData);
        }
        res.json({
            "success": true,
            "data": req.body,
            "message": "post saved successfully"
        });

    } catch(error) {
        console.log(error);
        res.json({
            "success": false,
            "data": req.body,
            "message": "post could not be saved"
        });
    }
    console.log(entry);
})





router.get('/entries', async (req, res) => {

    console.log('received a request to get all entries');
    const entries = await Entry.find({});
    console.log(entries);

    try {
        res.json({
            "success": true,
            "data":  entries,
            "message": "got all entries from DB"
        })
    } catch (error) {
        res.json({
            "success": false,
            "message": "could not get the data from de DB"
        })
        console.log(error);
    }
})


module.exports = router;