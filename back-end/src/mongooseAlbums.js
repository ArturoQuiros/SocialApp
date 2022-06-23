const mongoose = require('mongoose');
const Album = require("./models/albums.model");

const addAlbum = async (req, res) => {//add an album
    const addedAlbum = new Album({
        userId: req.body.userId, 
        title: req.body.title,
    });
    const result = await addedAlbum.save();
    res.json(result);
}

const getAlbums = async (req, res) => { //find all albums
    const albums = await Album.find().exec();
    res.json(albums);
}

const getAlbum = async (req, res) => { //find an album by id

    const idParam = req.params.id;

    const result = await Album.findById(idParam).exec();
    res.json(result);
}

const updateAlbum = async (req, res) => { //update an album by id

    const idParam = req.params.id;

    const result = await Album.updateOne({ _id: idParam}, { $set: { title: req.body.title } }).exec();
    res.json(result);
}

const deleteAlbum = async (req, res) => { //delete an album by id

    const idParam = req.params.id;

    const result = await Album.deleteOne({ _id: idParam }).exec();
    res.json(result);
}

const deleteAlbums = async (req, res) => { //delete all albums

    const result = await Album.deleteMany({}).exec();
    res.json(result);
}

exports.addAlbum = addAlbum;
exports.getAlbums = getAlbums;
exports.getAlbum = getAlbum;
exports.updateAlbum = updateAlbum;
exports.deleteAlbum = deleteAlbum;
exports.deleteAlbums = deleteAlbums;