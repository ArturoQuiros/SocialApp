const mongoose = require('mongoose');
const Photo = require("./models/photos.model");

const addPhoto = async (req, res) => {//add a photo
    const addedPhoto = new Photo({
        albumId: req.body.albumId, 
        title: req.body.title,
        url: req.body.url, 
        thumbnailUrl: req.body.thumbnailUrl,
    });
    const result = await addedPhoto.save();
    res.json(result);
}

const getPhotos = async (req, res) => { //find all photos or photo by id

    let idParam = req.query.id;

    if(idParam){
        const photos = await Photo.findById(idParam).exec();
        res.json(photos);
    }else{
        const photos = await Photo.find().exec();
        res.json(photos);
    }

}

const getPhoto = async (req, res) => { //find a photo by id

    const idParam = req.params.id;

    const result = await Photo.findById(idParam).exec();
    res.json(result);
}

const updatePhoto = async (req, res) => { //update a photo by id

    const idParam = req.params.id;
    await updateAPhoto(req,res,idParam);
    
}

const updatePhoto2 = async (req, res) => { //update a photo by id

    const idParam = req.query.id;
    await updateAPhoto(req,res,idParam);

}

const updateAPhoto = async (req, res, idParam) => {

    const result = await Photo.updateOne({ _id: idParam}, { $set: { 
        albumId: req.body.albumId,
        title: req.body.title,
        url: req.body.url,
        thumbnailUrl: req.body.thumbnailUrl,
    } }).exec();
    res.json(result);

}

const deletePhoto = async (req, res) => { //delete a photo by id

    const idParam = req.params.id;

    const result = await Photo.deleteOne({ _id: idParam }).exec();
    res.json(result);
}

const deletePhotos = async (req, res) => { //delete all photos or photo by id

    let idParam = req.query.id;

    if(idParam){
        const result = await Photo.deleteOne({ _id: idParam }).exec();
        res.json(result);
    }else{
        const result = await Photo.deleteMany({}).exec();
        res.json(result);
    }

}

exports.addPhoto = addPhoto;
exports.getPhotos = getPhotos;
exports.getPhoto = getPhoto;
exports.updatePhoto = updatePhoto;
exports.updatePhoto2 = updatePhoto2;
exports.deletePhoto = deletePhoto;
exports.deletePhotos = deletePhotos;