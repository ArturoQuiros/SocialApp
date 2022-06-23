const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
    userId: {type: String, required: true},
    title: {type: String, required: true},
});

const db = mongoose.connection.useDb("socialAppDB")

module.exports = db.model('Album', albumSchema);