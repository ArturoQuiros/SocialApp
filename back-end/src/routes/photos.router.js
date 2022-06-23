const express = require("express")

const router = express.Router();

const mongooseDB = require('../mongoosePhotos')

router.get("/photos", mongooseDB.getPhotos);

router.post("/photos", mongooseDB.addPhoto);

router.get("/photos/:id", mongooseDB.getPhoto);

router.put("/photos/:id", mongooseDB.updatePhoto);

router.delete("/photos/:id", mongooseDB.deletePhoto);

router.delete("/photos/", mongooseDB.deletePhotos);

module.exports = router;