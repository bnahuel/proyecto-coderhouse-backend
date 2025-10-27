import { Router } from "express";
import CartManager from "../managers/CartManager.js";

const router = Router();
const manager = new CartManager("./data/carts.json");

router.post("/", (res) => {
  manager.createCart();
  res.send("🛒 Carrito creado correctamente");
});

router.get("/:cid", (req, res) => {
  const carrito = manager.getCartById(req.params.cid);
  carrito ? res.json(carrito.products) : res.status(404).send("Carrito no encontrado");
});

router.post("/:cid/product/:pid", (req, res) => {
  const { cid, pid } = req.params;
  const actualizado = manager.addProductToCart(cid, pid);
  actualizado
    ? res.send(`🛍️ Producto ${pid} agregado al carrito ${cid}`)
    : res.status(404).send("Carrito no encontrado");
});

export default router;