const express = require("express")

const router = express.Router();

const mongooseDB = require('../mongoose')

router.get("/users", mongooseDB.getUsers);

router.post("/users", mongooseDB.addUser);

router.post("/users/login", mongooseDB.login);

router.get("/users/:id", mongooseDB.getUser);

router.put("/users/:id", mongooseDB.updateUser);

router.put("/usersPassword/:id", mongooseDB.updatePassword);

router.delete("/users/:id", mongooseDB.deleteUser);

router.delete("/users/", mongooseDB.deleteUsers);

module.exports = router;