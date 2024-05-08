

const express = require("express");
const router = express.Router();
const UserController = require ("../controllers/user.controller.js");
//const { route } = require("./carts.router");
const userController = new UserController();






const jwt = require("jsonwebtoken");
const { createHash, isValidPassword } = require("../utils/hashbcrypt.js");
const UserDTO = require("../dto/user.dto.js");


router.post("/", userController.register);


 

  

module.exports = router;