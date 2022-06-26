const express = require("express")

const router = express.Router();

const mongooseDB = require('../mongooseAlbums')

router.get("/albums", mongooseDB.getAlbums);
router.get("/albums/:id", mongooseDB.getAlbum);

router.post("/albums", mongooseDB.addAlbum);

router.put("/albums/:id", mongooseDB.updateAlbum);
router.put("/albums", mongooseDB.updateAlbum2);

router.delete("/albums/:id", mongooseDB.deleteAlbum);
router.delete("/albums", mongooseDB.deleteAlbums);

module.exports = router;