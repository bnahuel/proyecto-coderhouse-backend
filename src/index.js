import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import mongoose from "mongoose";

import productsRouter from "./routes/product-routes.js";
import cartsRouter from "./routes/cart-routes.js";
import viewsRouter from "./routes/views-routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(join(__dirname, "public")));

app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", join(__dirname, "views"));

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);

mongoose
  .connect("mongodb://localhost:27017/coderbackend")
  .then(() => console.log("🟢 Mongo conectado"))
  .catch((err) => console.log("❌ Error Mongo:", err));

const httpServer = app.listen(PORT, () =>
  console.log(`Servidor activo en http://localhost:${PORT}`)
);

export const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log("🟢 Cliente conectado por WebSocket");

  socket.on("newProduct", async (data) => {
    console.log("Nuevo producto recibido:", data);
  });
});