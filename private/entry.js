const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({

    title: String,
    date: Date,
    textContent: String
})

module.exports = mongoose.model('Entry', entrySchema);

