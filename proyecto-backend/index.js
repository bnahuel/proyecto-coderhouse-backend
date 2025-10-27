import express from "express";
import productsRouter from "./routes/product-routes.js";
import cartsRouter from "./routes/carts-router.js";

const servidor = express();
const PORT = 8080;

servidor.use(express.json());

servidor.use("/api/products", productsRouter);
servidor.use("/api/carts", cartsRouter);

servidor.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en puerto ${PORT}`);
});