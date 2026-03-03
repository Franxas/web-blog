const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({

    title: String,
    date: Date,
    blocks: []
})

module.exports = mongoose.model('Entry', entrySchema);

