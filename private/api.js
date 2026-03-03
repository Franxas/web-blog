const {app} = require('./server.js');
const {Entry} = require('./entry.js');

// CRUD Operations

// store image files to cloud manager
app.post('/api/upload-image', upload.single('image'), async (request, response) => {

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
app.post('/api/save-entry', (req, res) => {
    console.log('got a request to sabe Data');
    console.log(req.body);
    res.json({
        success: true
    });

    testEntry = new Entry( {
    name: 'test',
    date: Date.now,
    data: {
        box1: 'hello1',
        box2: 'hello2',
        box3: 'hello3'
        }
    })

    console.log(testEntry);

})