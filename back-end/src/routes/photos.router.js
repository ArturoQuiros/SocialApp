const express = require("express")
const {check} = require('express-validator');
const router = express.Router();

const photosController = require('../controllers/photos.controller')
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

router.use(validarJWT); //Se aplica este middleware a todas las rutas porque esta antes de todas

router.get("/signature", photosController.getSignature);
router.get("/", photosController.getPhotos);
router.get("/:id", photosController.getPhoto);
router.get("/search/:albumId/:s", photosController.getPhotosByName);

router.post("/", 
    [
        check('albumId', 'AlbumID is required').not().isEmpty(),
        check('name', 'Name is required').not().isEmpty(),
        check('url', 'URL is required').not().isEmpty(),
        validarCampos
    ], photosController.addPhoto);

router.put("/:id", 
    [
        check('albumId', 'AlbumID is required').not().isEmpty(),
        check('name', 'Name is required').not().isEmpty(),
        check('url', 'URL is required').not().isEmpty(),
        validarCampos
    ], photosController.updatePhoto);
router.put("/", 
    [
        check('albumId', 'AlbumID is required').not().isEmpty(),
        check('name', 'Name is required').not().isEmpty(),
        check('url', 'URL is required').not().isEmpty(),
        validarCampos
    ], photosController.updatePhoto2);

router.delete("/:id/:cid", photosController.deletePhoto);
router.delete("/", photosController.deletePhoto2); 
router.delete("/deleteMultiple", photosController.deletePhotos); 

module.exports = router;