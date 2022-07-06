const Album = require("../models/albums.model");
const HttpError = require('../models/http-error')
const { ReasonPhrases, StatusCodes } = require("http-status-codes")

const addAlbum = async (req, res, next) => {//add an album
    const addedAlbum = new Album({
        userId: req.body.userId, 
        title: req.body.title,
    });

    try{
        await addedAlbum.save();
    }catch(err){
        return next(new HttpError(err, 404))
    }

    res.status(StatusCodes.CREATED).json({
        message: ReasonPhrases.CREATED,
        data: addedAlbum.toObject({getters: true})
    })
}

const getAlbums = async (req, res, next) => { //find all albums or album by id or albums by title (search case insensitive)

    const idParam = req.query.id;
    const searchTitle = req.query.s;

    if(idParam){
        let album;

        try{
            album = await Album.findById(idParam).exec();
        }catch(err){
            return next(new HttpError("Not found", 400))
        }

        if(album){
            res.status(StatusCodes.OK).json({
                message: ReasonPhrases.OK,
                data: album.toObject({getters: true}),
            });
        }else{
            res.status(StatusCodes.NOT_FOUND).json({
                message: ReasonPhrases.NOT_FOUND
            });
        }
    }else if(searchTitle){
        let albums;

        try{
            albums = await Album.find({ title: { $regex: searchTitle, $options: "i" } }); //Case insensitive
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

const getAlbum = async (req, res, next) => { //find an album by id

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
            data: album.toObject({getters: true}),
        });
    }else{
        res.status(StatusCodes.NOT_FOUND).json({
            message: ReasonPhrases.NOT_FOUND
        });
    }
}

const getAlbumsByTitle = async (req, res, next) => { //find albums by title (search case insensitive)

    const searchTitle = req.params.s;
    let albums;

    try{
        albums = await Album.find({ title: { $regex: searchTitle, $options: "i" } }); //Case insensitive
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

const updateAlbum = async (req, res, next) => { //update an album by id

    const idParam = req.params.id;
    await updateAnAlbum(req,res,next,idParam);

}

const updateAlbum2 = async (req, res, next) => { //update an album by id

    const idParam = req.query.id;
    await updateAnAlbum(req,res,next,idParam);

}

const updateAnAlbum = async (req, res, next, idParam) => {
    
    // const result = await Album.updateOne({ _id: idParam}, { $set: { title: req.body.title } }).exec();
    // res.json(result);

    const {title} = req.body;

    let album;
    try{
        album = await Album.findByIdAndUpdate(
            idParam,
            { title },
            {
              new: true,
            }
          ).exec();
    }catch(err){
        return next(new HttpError(err, 400))
    }

    if (album){
        res.status(StatusCodes.OK).json({
            message: ReasonPhrases.OK,
            data: album.toObject({getters: true}),
        });
    }else{
        res.status(StatusCodes.NOT_FOUND).json({
            message: ReasonPhrases.NOT_FOUND
        });
    }

}

const deleteAlbum = async (req, res, next) => { //delete an album by id

    const idParam = req.params.id;

    let album;
    try{
        album = await Album.findById(idParam).exec();
    }catch(err){
        return next(new HttpError("Not found", 400))
    }

    if (album){
        await album.remove();
        res.status(StatusCodes.OK).json({
            message: ReasonPhrases.OK,
            data: "Deleted!!",
        });
    }else{
        res.status(StatusCodes.NOT_FOUND).json({
            message: ReasonPhrases.NOT_FOUND
        });
    }
}

const deleteAlbums = async (req, res, next) => { //delete all albums or album by id

    let idParam = req.query.id;

    if(idParam){
        let album;
        try{
            album = await Album.findById(idParam).exec();
        }catch(err){
            return next(new HttpError("Not found", 400))
        }

        if (album){
            await album.remove();
            res.status(StatusCodes.OK).json({
                message: ReasonPhrases.OK,
                data: "Deleted!!",
            });
        }else{
            res.status(StatusCodes.NOT_FOUND).json({
                message: ReasonPhrases.NOT_FOUND
            });
        }
    }else{
        let result;
        try{
            result = await Album.deleteMany({}).exec();
        }catch(err){
            return next(new HttpError("Not found", 400))
        }
        res.json(result);
    }
    
}

exports.addAlbum = addAlbum;
exports.getAlbums = getAlbums;
exports.getAlbumsByTitle = getAlbumsByTitle;
exports.getAlbum = getAlbum;
exports.updateAlbum = updateAlbum;
exports.updateAlbum2 = updateAlbum2;
exports.deleteAlbum = deleteAlbum;
exports.deleteAlbums = deleteAlbums;