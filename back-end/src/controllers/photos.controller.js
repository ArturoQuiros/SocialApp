const Photo = require("../models/photos.model");
const HttpError = require('../models/http-error')
const { ReasonPhrases, StatusCodes } = require("http-status-codes")

const addPhoto = async (req, res, next) => {//add a photo
    const addedPhoto = new Photo({
        albumId: req.body.albumId, 
        title: req.body.title,
        url: req.body.url, 
        thumbnailUrl: req.body.thumbnailUrl,
    });

    try{
        await addedPhoto.save();
    }catch(err){
        return next(new HttpError(err, 404))
    }

    res.status(StatusCodes.CREATED).json({
        message: ReasonPhrases.CREATED,
        data: addedPhoto.toObject({getters: true})
    })
}

const getPhotos = async (req, res, next) => { //find all photos or photo by id

    const idParam = req.query.id;

    if(idParam){
        let photo;

        try{
            photo = await Photo.findById(idParam).exec();
        }catch(err){
            return next(new HttpError("Not found", 400))
        }

        if(photo){
            res.status(StatusCodes.OK).json({
                message: ReasonPhrases.OK,
                data: photo.toObject({getters: true}),
            });
        }else{
            res.status(StatusCodes.NOT_FOUND).json({
                message: ReasonPhrases.NOT_FOUND
            });
        }
    }else{
        let photos;
        try{
            photos = await Photo.find().exec();
        }catch(err){
            return next(new HttpError(err, 404))
        }
        res.status(StatusCodes.OK).json({
            message: ReasonPhrases.OK,
            data: photos,
        });
    }

}

const getPhoto = async (req, res, next) => { //find a photo by id

    const idParam = req.params.id;
    let photo;

    try{
        photo = await Photo.findById(idParam).exec();
    }catch(err){
        return next(new HttpError("Not found", 400))
    }

    if(photo){
        res.status(StatusCodes.OK).json({
            message: ReasonPhrases.OK,
            data: photo.toObject({getters: true}),
        });
    }else{
        res.status(StatusCodes.NOT_FOUND).json({
            message: ReasonPhrases.NOT_FOUND
        });
    }
}

const updatePhoto = async (req, res, next) => { //update a photo by id

    const idParam = req.params.id;
    await updateAPhoto(req,res,next,idParam);
    
}

const updatePhoto2 = async (req, res, next) => { //update a photo by id

    const idParam = req.query.id;
    await updateAPhoto(req,res,next,idParam);

}

const updateAPhoto = async (req, res, next, idParam) => {
    
    const {albumId, title, url, thumbnailUrl} = req.body;

    let photo;
    try{
        photo = await Photo.findByIdAndUpdate(
            idParam,
            { albumId, title, url, thumbnailUrl },
            {
              new: true,
            }
          ).exec();
    }catch(err){
        return next(new HttpError(err, 400))
    }

    if (photo){
        res.status(StatusCodes.OK).json({
            message: ReasonPhrases.OK,
            data: photo.toObject({getters: true}),
        });
    }else{
        res.status(StatusCodes.NOT_FOUND).json({
            message: ReasonPhrases.NOT_FOUND
        });
    }

}

const deletePhoto = async (req, res, next) => { //delete a photo by id

    const idParam = req.params.id;

    let photo;
    try{
        photo = await Photo.findById(idParam).exec();
    }catch(err){
        return next(new HttpError("Not found", 400))
    }

    if (photo){
        await photo.remove();
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

const deletePhotos = async (req, res, next) => { //delete all photos or photo by id

    let idParam = req.query.id;

    if(idParam){
        let photo;
        try{
            photo = await Photo.findById(idParam).exec();
        }catch(err){
            return next(new HttpError("Not found", 400))
        }

        if (photo){
            await photo.remove();
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
            result = await Photo.deleteMany({}).exec();
        }catch(err){
            return next(new HttpError("Not found", 400))
        }
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