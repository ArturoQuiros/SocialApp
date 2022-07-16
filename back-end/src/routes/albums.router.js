const express = require("express")
const {check} = require('express-validator');
const router = express.Router();

const albumsController = require('../controllers/albums.controller')
const { isDate } = require('../helpers/isDate');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

router.use(validarJWT); //Se aplica este middleware a todas las rutas porque esta antes de todas

router.get("/", albumsController.getAlbums);
router.get("/:id", albumsController.getAlbum);
router.get("/search/:s", albumsController.getAlbumsByName);

router.post("/", 
    [
        check('name', 'Name is required').not().isEmpty(),
        check('description', 'Description is required').not().isEmpty(),
        check('date', 'Invalid date').custom(isDate),
        validarCampos
    ], albumsController.addAlbum);

router.put("/:id", 
    [
        check('name', 'Name is required').not().isEmpty(),
        check('description', 'Description is required').not().isEmpty(),
        check('date', 'Invalid date').custom(isDate),
        validarCampos
    ], albumsController.updateAlbum);
router.put("/", 
    [
        check('name', 'Name is required').not().isEmpty(),
        check('description', 'Description is required').not().isEmpty(),
        check('date', 'Invalid date').custom(isDate),
        validarCampos
    ], albumsController.updateAlbum2);

router.delete("/:id", albumsController.deleteAlbum);
router.delete("/", albumsController.deleteAlbum2); 

module.exports = router;