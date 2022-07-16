const {Schema, model} = require('mongoose');

const photoSchema = Schema({
    albumId: {type: Schema.Types.ObjectId, required: true, ref:'Album'},
    name: {type: String, required: true},
    description: {type: String},
    url: {type: String, required: true},
});

photoSchema.method('toJSON', function () {
    const {__v, _id, ...object} = this.toObject();
    object.id = _id;
    return object; 
});

module.exports = model('Photo', photoSchema);