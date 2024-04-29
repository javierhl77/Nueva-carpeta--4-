

const UserModel = require("../models/user.model.js");
const CartModel = require("../models/cart.model.js");

class mongoUserDao {

  async registrarUsuario(first_name, last_name, email, password, age) {
    try {
      const existeUsuario = await UserModel.findOne(email);
      if (existeUsuario) {
          //return res.status(400).send("El usuario ya existe");
          console.log("el usuario ya existe");
      }

      //Creo un nuevo carrito: 
      const nuevoCarrito = new CartModel();
      await nuevoCarrito.save();
       console.log("carrito creado para el usuario");
      const nuevoUsuario = new UserModel({
          first_name,
          last_name,
          email,
          cart: nuevoCarrito._id, 
          password: createHash(password),
          age
      });

      await nuevoUsuario.save();
      return nuevoUsuario;
        
    } catch (error) {
        throw new  error("error")
    }
  }

  async BuscarPorEmail (email) {
    try {
        const usuario = await UserModel.findOne(email);
        return usuario;
    } catch (error) {
        throw new  error("error")
    }
  }

  

}

module.exports = mongoUserDao;