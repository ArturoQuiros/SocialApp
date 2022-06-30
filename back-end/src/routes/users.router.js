const express = require("express")

const router = express.Router();

const usersController = require('../controllers/users.controller')

router.get("/", usersController.getUsers);
router.get("/:id", usersController.getUser);

router.post("/signup", usersController.addUser);
router.post("/login", usersController.login);

router.put("/password/:id", usersController.updatePassword);
router.put("/password/", usersController.updatePassword2);
router.put("/:id", usersController.updateUser);
router.put("/", usersController.updateUser2);

router.delete("/:id", usersController.deleteUser);
router.delete("/", usersController.deleteUsers);

module.exports = router;