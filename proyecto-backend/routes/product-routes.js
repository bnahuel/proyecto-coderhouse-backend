import { Router } from "express";
import ProductManager from "../managers/product-manager.js";

const router = Router();
const manager = new ProductManager("./data/products.json");

router.get("/", async (req, res) => {
  try {
    const productos = await manager.getProducts();
    res.json(productos);
  } catch (error) {
    res.status(500).send("Error al obtener productos");
  }
});

router.get("/:pid", async (req, res) => {
  try {
    const producto = await manager.getProductById(req.params.pid);
    producto
      ? res.json(producto)
      : res.status(404).send("Producto no encontrado");
  } catch (error) {
    res.status(500).send("Error al obtener el producto");
  }
});

router.post("/", async (req, res) => {
  try {
    await manager.addProduct(req.body);
    res.send("✅ Producto agregado correctamente");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.put("/:pid", async (req, res) => {
  try {
    const actualizado = await manager.updateProduct(req.params.pid, req.body);
    actualizado
      ? res.send("✅ Producto actualizado correctamente")
      : res.status(404).send("Producto no encontrado");
  } catch (error) {
    res.status(500).send("Error al actualizar producto");
  }
});

router.delete("/:pid", async (req, res) => {
  try {
    const eliminado = await manager.deleteProduct(req.params.pid);
    eliminado
      ? res.send("🗑️ Producto eliminado correctamente")
      : res.status(404).send("Producto no encontrado");
  } catch (error) {
    res.status(500).send("Error al eliminar producto");
  }
});

export default router;