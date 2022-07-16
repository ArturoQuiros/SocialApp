const {Schema, model} = require('mongoose');

const albumSchema = Schema({
    userId: {type: Schema.Types.ObjectId, required: true, ref:'User'},
    name: {type: String, required: true},
    description: {type: String, required: true},
    date: {type: Date, required: true},
});

albumSchema.method('toJSON', function () {
    const {__v, _id, ...object} = this.toObject();
    object.id = _id;
    return object; 
});

module.exports = model('Album', albumSchema);