const express = require("express")

const router = express.Router();

const albumsController = require('../controllers/albums.controller')

router.get("/", albumsController.getAlbums);
router.get("/:id", albumsController.getAlbum);
router.get("/search/:s", albumsController.getAlbumsByTitle);

router.post("/", albumsController.addAlbum);

router.put("/:id", albumsController.updateAlbum);
router.put("/", albumsController.updateAlbum2);

router.delete("/:id", albumsController.deleteAlbum);
router.delete("/", albumsController.deleteAlbums);

module.exports = router;