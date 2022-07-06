const express = require("express")

const router = express.Router();

const photosController = require('../controllers/photos.controller')

router.get("/", photosController.getPhotos);
router.get("/:id", photosController.getPhoto);
router.get("/search/:s", photosController.getPhotosByTitle);

router.post("/", photosController.addPhoto);

router.put("/:id", photosController.updatePhoto);
router.put("/", photosController.updatePhoto2);

router.delete("/:id", photosController.deletePhoto);
router.delete("/", photosController.deletePhotos);

module.exports = router;