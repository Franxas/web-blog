const { initWebSocket } = require("./websocket");
const express = require('express');
const path = require('path');
const http = require('http');

const cloudinary = require('cloudinary').v2;
require('dotenv').config();
const mongoose = require('mongoose');

const app = express();
app.use(express.json( {limit: '1mb'} ))
app.use('/static', express.static(path.resolve(__dirname, '../public/static')));
app.use('/api', require('./routes/subdir'));

// run server
const server = http.createServer(app);
server.listen(process.env.PORT || 3000, '0.0.0.0', () => {
    console.log('listening at 3000*');
});
//=========================

initWebSocket(server, path);

// config cloud manager
cloudinary.config( {
    cloud_name: 'dtmepsgde',
    secure: true,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

// connect to db
const { MongoClient, ServerApiVersion } = require("mongodb");
const { error } = require('console');

// Create a MongoClient
const client = new MongoClient(process.env.DB_URI,  {

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
    
    await client.connect();

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    
  } catch(error) {

    console.log('there was a problem connecting to the db!');
    console.log(error);
    return;
  }

    //using a test collection in my DB and erasing all data previously stored so to test my program
    const testColl = client.db('testDB').collection("testColl");
    testColl.deleteMany();

    await mongoose.connect(process.env.DB_URI);
}
run();

app.get(/.*/, (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "index.html"));
});

module.exports = {app, mongoose};