const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
    albumId: {type: String, required: true},
    title: {type: String, required: true},
    url: {type: String, required: true},
    thumbnailUrl: {type: String, required: true},
});

const db = mongoose.connection.useDb("socialAppDB")

module.exports = db.model('Photo', photoSchema);