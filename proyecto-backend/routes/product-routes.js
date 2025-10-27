import { Router } from "express";
import ProductManager from "../managers/ProductManager.js";

const router = Router();
const manager = new ProductManager("./data/products.json");

router.get("/", (res) => {
  const productos = manager.getProducts();
  res.json(productos);
});

router.get("/:pid", (req, res) => {
  const producto = manager.getProductById(req.params.pid);
  producto ? res.json(producto) : res.status(404).send("Producto no encontrado");
});

router.post("/", (req, res) => {
  try {
    manager.addProduct(req.body);
    res.send("✅ Producto agregado correctamente");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.put("/:pid", (req, res) => {
  const actualizado = manager.updateProduct(req.params.pid, req.body);
  actualizado
    ? res.send("✅ Producto actualizado correctamente")
    : res.status(404).send("Producto no encontrado");
});

router.delete("/:pid", (req, res) => {
  const eliminado = manager.deleteProduct(req.params.pid);
  eliminado
    ? res.send("🗑️ Producto eliminado correctamente")
    : res.status(404).send("Producto no encontrado");
});

export default router;