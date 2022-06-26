const express = require("express")

const router = express.Router();

const mongooseDB = require('../mongoose')

router.get("/users", mongooseDB.getUsers);
router.get("/users/:id", mongooseDB.getUser);

router.post("/users", mongooseDB.addUser);
router.post("/users/login", mongooseDB.login);

router.put("/users/:id", mongooseDB.updateUser);
router.put("/users", mongooseDB.updateUser2);
router.put("/usersPassword/:id", mongooseDB.updatePassword);
router.put("/usersPassword", mongooseDB.updatePassword2);

router.delete("/users/:id", mongooseDB.deleteUser);
router.delete("/users", mongooseDB.deleteUsers);

module.exports = router;