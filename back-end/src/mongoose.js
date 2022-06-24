const mongoose = require('mongoose');
const User = require("./models/users.model");

const url = 'mongodb+srv://panda:1234@cluster0.t8gjx.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(url).then(()=>{
    console.log("Connected to DB");
}).catch(() =>{
    console.log("Connection failed!");
});

const addUser = async (req, res) => {//add a user
    const addedUser = new User({
        name: req.body.name, 
        username: req.body.username,
        email: req.body.email,
        phone: req.body.phone,
        website: req.body.website,
        address: {
            street: req.body.address.street,
            suite: req.body.address.suite,
            city: req.body.address.city,
            zipcode: req.body.address.zipcode,
            geo: {
                lat: req.body.address.geo.lat,
                lng: req.body.address.geo.lng,
            },
        },
        company: {
            name: req.body.company.name,
            catchPhrase: req.body.company.catchPhrase,
            bs: req.body.company.bs,
        },
    });
    const result = await addedUser.save();
    res.json(result);
}

const login = async (req, res) => {//login

    const result = await User.find({ $or: [{username: req.body.email}, {email: req.body.email}], 'address.zipcode': req.body.password }).exec();
    res.json(result);
}

const getUsers = async (req, res) => { //find all users
    const users = await User.find().exec();
    res.json(users);
}

const getUser = async (req, res) => { //find a user by id

    const idParam = req.params.id;

    const result = await User.findById(idParam).exec();
    res.json(result);
}

const updateUser = async (req, res) => { //update a user by id

    const idParam = req.params.id;

    const r = await User.findById(idParam).exec();

    const result = await User.updateOne({ _id: idParam}, { $set: { 
        name: req.body.name, 
        username: req.body.username,
        email: req.body.email,
        phone: req.body.phone,
        website: req.body.website,
        address: {
            street: req.body.address.street,
            suite: req.body.address.suite,
            city: req.body.address.city,
            zipcode: r.address.zipcode, //Dont change the "password" here
            geo: {
                lat: req.body.address.geo.lat,
                lng: req.body.address.geo.lng,
            },
        },
        company: {
            name: req.body.company.name,
            catchPhrase: req.body.company.catchPhrase,
            bs: req.body.company.bs,
        },
    } }).exec();
    res.json(result);
}

const updatePassword = async (req, res) => { //update a user password by id

    const idParam = req.params.id;

    const r = await User.findById(idParam).exec();

    const result = await User.updateOne({ _id: idParam}, { $set: { 
        address: {
            street: r.address.street,
            suite: r.address.suite,
            city: r.address.city,
            zipcode: req.body.zipcode, //Change only the "password" here
            geo: {
                lat: r.address.geo.lat,
                lng: r.address.geo.lng,
            },
        },
    } }).exec();
    res.json(result);
}

const deleteUser = async (req, res) => { //delete a user by id

    const idParam = req.params.id;

    const result = await User.deleteOne({ _id: idParam }).exec();
    res.json(result);
}

const deleteUsers = async (req, res) => { //delete all users

    const result = await User.deleteMany({}).exec();
    res.json(result);
}

exports.addUser = addUser;
exports.getUsers = getUsers;
exports.login = login;
exports.getUser = getUser;
exports.updateUser = updateUser;
exports.updatePassword = updatePassword;
exports.deleteUser = deleteUser;
exports.deleteUsers = deleteUsers;