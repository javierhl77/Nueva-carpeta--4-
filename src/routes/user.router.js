

const express = require("express");
const router = express.Router();
//const UserController = require ("../controllers/user.controller.js");
//const { route } = require("./carts.router");
//const userController = new UserController();

 const UserRepository = require("../repositories/user.repository.js");
const userRepository = new UserRepository(); 

const UserModel = require("../models/user.model.js");
const CartModel = require("../models/cart.model.js");


const jwt = require("jsonwebtoken");
const { createHash, isValidPassword } = require("../utils/hashbcrypt.js");
const UserDTO = require("../dto/user.dto.js");


//router.post("/register", userController.register);

  router.post("/", async (req, res) => {
      const { first_name,last_name,email,password,age } = req.body;

      const user = await UserModel.findOne({email});
      if(user) return res.status(400).send("usuario ya existe");
      //crear carrito
       const nuevoCarrito = new CartModel();
       await nuevoCarrito.save();

      const nuevoUsuario = new UserModel({
        first_name,
        last_name,
        email,
        password: createHash(password),
        age,
        cart : nuevoCarrito._id
      })
       await nuevoUsuario.save()
       res.send("usuario creado")
})  

 /* router.post("/", async(req,res) => {

    const nuevoUsuario = req.body;
    try {
        await userRepository.RegisterUser(nuevoUsuario);
        res.json(nuevoUsuario);
        res.send("usuario creado");
    } catch (error) {
        console.log("error al agregar usuario", error);
        res.status(500).json({error: "error del servidor"});
    } 
}) */
 

module.exports = router;