import { Router } from "express";
import ProductManager from "../managers/product-manager.js";
import { io } from "../app.js";

const router = Router();
const manager = new ProductManager("./data/products.json");

router.post("/", async (req, res) => {
  await manager.addProduct(req.body);
  io.emit("updateProducts", await manager.getProducts());
  res.send("Producto agregado");
});

router.delete("/:pid", async (req, res) => {
  await manager.deleteProduct(req.params.pid);
  io.emit("updateProducts", await manager.getProducts());
  res.send("Producto eliminado");
});

export default router;