const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
    albumId: {type: mongoose.Types.ObjectId, required: true, ref:'Album'},
    title: {type: String, required: true},
    url: {type: String, required: true},
    thumbnailUrl: {type: String, required: true},
});

const db = mongoose.connection.useDb("socialAppDB")

module.exports = db.model('Photo', photoSchema);