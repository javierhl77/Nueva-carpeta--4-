

const express = require("express");
const router = express.Router();
const UserController = require ("../controllers/user.controller.js");
//const { route } = require("./carts.router");
const userController = new UserController();


router.post("/register", userController.register);





module.exports = router;