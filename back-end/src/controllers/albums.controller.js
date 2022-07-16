const {response} = require('express');
const Album = require("../models/albums.model");
const HttpError = require('../models/http-error')
const { ReasonPhrases, StatusCodes } = require("http-status-codes")

const addAlbum = async (req, res = response, next) => {//add an album

    const addedAlbum = new Album(req.body);

    try{
        
        addedAlbum.userId = req.uid;

        const album = await addedAlbum.save();

        res.status(StatusCodes.CREATED).json({
            message: ReasonPhrases.CREATED,
            data: album
        })

    }catch(err){
        return next(new HttpError(err, 500))
    }

}

const getAlbums = async (req, res = response, next) => { //find all albums, albums by userId, album by id, albums by name (search case insensitive)

    const idParam = req.query.id;
    const searchName = req.query.s;
    const userId = req.query.userId;

    if(userId){

        let albums;

        try{
            albums = await Album.find({userId}); 
        }catch(err){
            return next(new HttpError("Not found", 400))
        }

        if(albums[0]){
            res.status(StatusCodes.OK).json({
                message: ReasonPhrases.OK,
                data: albums
            });
        }else{
            res.status(StatusCodes.NOT_FOUND).json({
                message: ReasonPhrases.NOT_FOUND
            });
        }

    }else if(searchName){

        const uid = req.uid;

        let albums;

        try{
            albums = await Album.find({ userId: uid, name: { $regex: searchName, $options: "i" } }); //Case insensitive
        }catch(err){
            return next(new HttpError("Not found", 400))
        }

        if(albums[0]){
            res.status(StatusCodes.OK).json({
                message: ReasonPhrases.OK,
                data: albums
            });
        }else{
            res.status(StatusCodes.NOT_FOUND).json({
                message: ReasonPhrases.NOT_FOUND
            });
        }

    }else if(idParam){

        let album;

        try{
            album = await Album.findById(idParam).exec();
        }catch(err){
            return next(new HttpError("Not found", 400))
        }

        if(album){
            res.status(StatusCodes.OK).json({
                message: ReasonPhrases.OK,
                data: album
            });
        }else{
            res.status(StatusCodes.NOT_FOUND).json({
                message: ReasonPhrases.NOT_FOUND
            });
        }

    }else{

        let albums;
        try{
            albums = await Album.find().exec();
        }catch(err){
            return next(new HttpError(err, 404))
        }
        res.status(StatusCodes.OK).json({
            message: ReasonPhrases.OK,
            data: albums,
        });

    }

}

const getAlbum = async (req, res = response, next) => { //find an album by id

    const idParam = req.params.id;
    let album;

    try{
        album = await Album.findById(idParam).exec();
    }catch(err){
        return next(new HttpError("Not found", 400))
    }

    if(album){
        res.status(StatusCodes.OK).json({
            message: ReasonPhrases.OK,
            data: album
        });
    }else{
        res.status(StatusCodes.NOT_FOUND).json({
            message: ReasonPhrases.NOT_FOUND
        });
    }
}

const getAlbumsByName = async (req, res = response, next) => { //find albums by name (search case insensitive)

    const uid = req.uid;
    const searchName = req.params.s;
    let albums;

    try{
        albums = await Album.find({ userId: uid, name: { $regex: searchName, $options: "i" } }); //Case insensitive
    }catch(err){
        return next(new HttpError("Not found", 400))
    }

    if(albums[0]){
        res.status(StatusCodes.OK).json({
            message: ReasonPhrases.OK,
            data: albums
        });
    }else{
        res.status(StatusCodes.NOT_FOUND).json({
            message: ReasonPhrases.NOT_FOUND
        });
    }
}

const updateAlbum = async (req, res = response, next) => { //update an album by id

    const idParam = req.params.id;
    await updateAnAlbum(req,res,next,idParam);

}

const updateAlbum2 = async (req, res = response, next) => { //update an album by id

    const idParam = req.query.id;
    await updateAnAlbum(req,res,next,idParam);

}

const updateAnAlbum = async (req, res = response, next, idParam) => {
    
    const uid = req.uid;

    let album;
    try{

        const alb = await Album.findById(idParam);

        if(!alb){
            return res.status(StatusCodes.NOT_FOUND).json({
                message: ReasonPhrases.NOT_FOUND
            });
        }

        if(alb.userId.toString() !== uid){
            return res.status(401).json({
                ok: false,
                msg: "You don't have permission to modify this album",
            });
        }

        const newAlbum = {
            ...req.body,
            userId: uid
        }

        album = await Album.findByIdAndUpdate(idParam, newAlbum, {new: true}).exec();

        res.status(StatusCodes.OK).json({
            message: ReasonPhrases.OK,
            data: album
        });

    }catch(err){
        return next(new HttpError(err, 400))
    }

}

const deleteAlbum = async (req, res = response, next) => { //delete an album by id

    const idParam = req.params.id;
    await deleteAnAlbum(req,res,next,idParam);

}

const deleteAlbum2 = async (req, res = response, next) => { //delete an album by id

    const idParam = req.query.id;
    await deleteAnAlbum(req,res,next,idParam);

}

const deleteAnAlbum = async (req, res = response, next, idParam) => { 

    const uid = req.uid;

    try{

        const alb = await Album.findById(idParam);

        if(!alb){
            return res.status(StatusCodes.NOT_FOUND).json({
                message: ReasonPhrases.NOT_FOUND
            });
        }

        if(alb.userId.toString() !== uid){
            return res.status(401).json({
                ok: false,
                msg: "You don't have permission to delete this album",
            });
        }

        await Album.findByIdAndDelete(idParam);

        res.status(StatusCodes.OK).json({
            message: ReasonPhrases.OK,
            data: "Album deleted",
        });

    }catch(err){
        return next(new HttpError("Not found", 400))
    }
    
}

exports.addAlbum = addAlbum;
exports.getAlbums = getAlbums;
exports.getAlbumsByName = getAlbumsByName;
exports.getAlbum = getAlbum;
exports.updateAlbum = updateAlbum;
exports.updateAlbum2 = updateAlbum2;
exports.deleteAlbum = deleteAlbum;
exports.deleteAlbum2 = deleteAlbum2;