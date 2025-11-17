import { Router } from "express";
import CartManager from "../managers/cart-manager.js";

const router = Router();
const manager = new CartManager("./data/carts.json");

router.post("/", async (req, res) => {
  try {
    const nuevo = await manager.createCart();
    res.json({ mensaje: "🛒 Carrito creado correctamente", carrito: nuevo });
  } catch (error) {
    res.status(500).send("Error al crear carrito");
  }
});

router.get("/:cid", async (req, res) => {
  try {
    const carrito = await manager.getCartById(req.params.cid);
    carrito
      ? res.json(carrito.products)
      : res.status(404).send("Carrito no encontrado");
  } catch (error) {
    res.status(500).send("Error al obtener carrito");
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const actualizado = await manager.addProductToCart(cid, pid);
    actualizado
      ? res.send(`🛍️ Producto ${pid} agregado al carrito ${cid}`)
      : res.status(404).send("Carrito no encontrado");
  } catch (error) {
    res.status(500).send("Error al agregar producto al carrito");
  }
});

export default router;