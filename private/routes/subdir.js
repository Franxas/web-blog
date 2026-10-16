const express = require('express');
const router = express.Router();
const path = require('path');
const cloudinary = require('cloudinary').v2;
const multer  = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });
const Entry = require('../entry');
const mongoose = require('mongoose');

function requireAdmin(req, res, next) {
    if (req.session?.isAdmin !== true) {
        return res.status(401).json({
            success: false,
            message: "Authentication required"
        });
    }

    next();
}

router.get("/auth/me", (req, res) => {
    if (req.session?.isAdmin !== true) {
        return res.status(401).json({
            authenticated: false
        });
    }

    res.json({
        authenticated: true
    });
});

// Log out and invalidate the session.
router.post("/logout", (req, res, next) => {
    req.session.destroy((err) => {
        if (err) return next(err);

        res.clearCookie("admin.sid", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/"
        });

        res.sendStatus(204);
    });
});

router.post('/login', async (req, res) => {

    const { passwordInput } = req.body;
    

    if (passwordInput !== process.env.ADMIN_LOGIN_PASS) {
        return res.json({
            success: 0,
            permission: false
        })
    }

    req.session.regenerate((e) => {
        if (e) {
            return next(e);
        }

        req.session.isAdmin = true;
        req.session.save((e) => {
            if (e) {
                return next(e);
            }
            res.json({
                success: true,
                permission: true
            });
        })
    })
});

router.post('/upload-image', requireAdmin, upload.single('image'), async (request, response) => {

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
router.post('/save-entry', requireAdmin, async (req, res) => {

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
                textContent: entryData.textContent
            });
        } else {
            //updating entrie and sending res to client
            entry = await Entry.findByIdAndUpdate(entryData._id, entryData);
        }
        res.json({
            "success": true,
            "data": entry,
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

router.delete('/delete-entry', requireAdmin, async(req, res) => {
    console.log("request to delete");
    try {

        const entry = await Entry.findByIdAndDelete(req.body.id);

        if (!entry) {
            return res.status(404).json({
                success: false,
                message: "Entry not found"
            });
        }

        res.json({
            success: true,
            message: "Entry deleted successfully"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Entry could not be deleted"
        });
    }
})

router.get('/entries', async (req, res) => {

    console.log("got a request to get all entries from data base");
    try {
        
        const entries = await Entry.find({});

        res.json({
            "success": true,
            "data":  entries,
            "message": "got all entries from DB"
        })
        console.log(entries);
    } catch (error) {
        res.json({
            "success": false,
            "message": "could not get the data from de DB"
        })
        console.log(error);
    }
})

router.get('/entrieTitles', async (req, res) => {

    console.log("got a request to get all entries from DB and list them")

    try {

        const entries = await Entry.find({});
        const entrieTitleList =  entries.map(e => {

            return {
                id: e.id,
                title: e.title,
                date: e.date
            };
        });

        res.json({
            "success": true,
            "data":  entrieTitleList,
            "message": "got all entries from DB and listed them"
        })
        console.log(entrieTitleList);
    } catch (error) {
        res.json({
            "success": false,
            "message": "could not get the data from de DB"
        })
        console.log(error);
    }
    
})

router.get('/entries/:id', async (req, res) => {

    const { id } = req.params;

    console.log("received a request to get an entrie by its ID");
    try {

        const entry = await Entry.findById(id);

        res.json({
            "success": true,
            "data":  entry,
            "message": "got the entry for the requesed ID"
        })
        console.log(entry);
    } catch (error) {

        res.json({
            "success": false,
            "message": "could not get rthe requested entry from the DB"
        })
        console.log(error);
    }
})

module.exports = router;