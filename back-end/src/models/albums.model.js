const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
    userId: {type: mongoose.Types.ObjectId, required: true, ref:'User'},
    title: {type: String, required: true},
});

const db = mongoose.connection.useDb("socialAppDB")

module.exports = db.model('Album', albumSchema);