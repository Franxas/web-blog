const express = require('express');
const path = require('path');
const cloudinary = require('cloudinary').v2;
const multer  = require('multer')
require('dotenv').config();

const storage = multer.memoryStorage();
const upload = multer({ storage });

cloudinary.config( {
    cloud_name: 'dtmepsgde',
    secure: true,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const app = express();

app.use('/static', express.static(path.resolve(__dirname, 'public', 'static')));

app.get(/.*/, (req, res) => {
    res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

// run server
app.listen(process.env.PORT || 3000, () => {console.log('listening at 3000')}); 


app.use(express.json( {limit: '1mb'} ));


// connect to db
const { MongoClient, ServerApiVersion } = require("mongodb");
const { error } = require('console');

// Replace the placeholder with your Atlas connection string
const uri = process.env.DB_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri,  {

        family: 4,

        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    }
);

// connect to db
async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    
  } catch(error) {

    console.log('there was a problem connecting to the db!');
    console.log(error);
  }

    const testColl = client.db('testDB').collection("testColl");
    testColl.deleteMany();

}
run();


// CRUD Operations

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

app.post('/api/save-entry', (req, res) => {
    console.log('got a request to sabe Data');
    console.log(req.body);
    res.json({
        success: true
    });
})
