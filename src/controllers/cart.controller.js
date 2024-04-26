const CartRepository = require("../repositories/cart.repository.js");
const cartRepository = new CartRepository();

class CartController {
  async nuevoCarrito(req, res) {
    try {
        const nuevoCarrito = await cartRepository.CreateCart();
        res.json(nuevoCarrito);
    } catch (error) {
        res.status(500).send("Error");
    }
  }

  async obtenerProductoDeCarrito(req, res) {
    const carritoId = req.params.cid;
    try {
        const productos = await cartRepository.GetProductsCart(carritoId);
        console.log(productos);
        res.json(productos);

    } catch (error) {
        res.status(500).send("error")
    }
  }


  async agregarProductoEnCarrito(req, res){
    const cartId = req.params.cid;
    const productoId = req.params.pid;
    const quantity = req.body.quantity || 1;

    try {
        await cartRepository.AddProductsCart(cartId, productoId, quantity);
        res.send("producto Agregado");
        
    } catch (error) {
      res.status(500).send("error")
    }
  }

  async eliminarProductoDeCarrito(req, res) {
    const cartId = req.params.cid;
    const productoId = req.params.pid;

    try {
      const carrito = await cartRepository.DeleteProductCart(cartId, productoId)
      res.json({
        status: "succes",
        message: "producto eliminado correctamente",
        carrito
      })
    } catch (error) {
      res.status(500).send("error")
    }

  }

  async actualizarProductoDeCarrito(req, res) {
    const cartId = req.params.cid;
    const updateProducts = req.body;
    try {
      const carrito = await cartRepository.UpdateProductCart(cartId, updateProducts);
      res.json({
        status: "succes",
        message: "producto actualizado correctamnete",
        carrito
      })
    } catch (error) {
      res.status(500).send("error")
    }
  }
  async actualizarCantidades(req, res) {
    const cartId = req.params.cid;
    const productoId = req.params.pid;
    const newQuantity = req.body.quantity;
    try {
      const carrito = await cartRepository.UpdateQuantityProductCart(cartId, productoId, newQuantity);
      res.json({
        status: "succes",
        message: "carrito actualizado en sus cantidades",
        carrito 
      })
    } catch (error) {
      res.status(500).send("error")
    }
  }

  async vaciarCarrito(req,res) {
    const cartId = req.params.cid;
    try {
      const carrito = await cartRepository.EmptyCart(cartId);

      res.json({
        status: "succes",
        message: "productos eliminados del carrito",
        carrito 
      })
    } catch (error) {
      
    }
  }
}

module.exports = CartController;