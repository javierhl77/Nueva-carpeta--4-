

const express = require("express");
const router = express.Router();
//const UserController = require ("../controllers/user.controller.js");
//const { route } = require("./carts.router");
//const userController = new UserController();

const UserModel = require("../models/user.model.js");

const CartModel = require("../models/cart.model.js");


const jwt = require("jsonwebtoken");
const { createHash, isValidPassword } = require("../utils/hashbcrypt.js");
const UserDTO = require("../dto/user.dto.js");


//router.post("/register", userController.register);

router.post("/register", async (req, res) => {
      const { first_name,last_name,email,password,age } = req.body;
      const user = await UserModel.findOne({email});
      if(user) return res.status(400).send("usuario ya existe");
      //crear carrito
      const carrito = await CartModel.create();

      const nuevoUsuario = new UserModel({
        first_name,
        last_name,
        email,
        password: createHash(password),
        age,
        cart : carrito._id
      })
       await nuevoUsuario.save()
       res.send("usuario creado")
})
module.exports = router;