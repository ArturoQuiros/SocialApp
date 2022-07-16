const {Schema, model} = require('mongoose');

const userSchema = Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    birthDate: {type: Date, required: true},
    gender: {type: String, required: true},
});

userSchema.method('toJSON', function () {
  const {__v, _id, password, ...object} = this.toObject();
  object.id = _id;
  return object; 
});

module.exports = model('User', userSchema);