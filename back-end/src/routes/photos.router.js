const express = require("express")

const router = express.Router();

const mongooseDB = require('../mongoosePhotos')

router.get("/photos", mongooseDB.getPhotos);
router.get("/photos/:id", mongooseDB.getPhoto);

router.post("/photos", mongooseDB.addPhoto);

router.put("/photos/:id", mongooseDB.updatePhoto);
router.put("/photos", mongooseDB.updatePhoto2);

router.delete("/photos/:id", mongooseDB.deletePhoto);
router.delete("/photos", mongooseDB.deletePhotos);

module.exports = router;