import express from "express";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import path from "path";
import __dirname from "./utils.js";

import productsRouter from "./routes/products.router.js";
import viewsRouter from "./routes/views.router.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

app.use("/api/products", productsRouter);
app.use("/", viewsRouter);

const PORT = 8080;
const httpServer = app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);

export const io = new Server(httpServer);

import ProductManager from "./managers/product-manager.js";
const manager = new ProductManager("./data/products.json");

io.on("connection", async socket => {
  console.log("Cliente conectado");

  socket.emit("updateProducts", await manager.getProducts());

  socket.on("newProduct", async data => {
    await manager.addProduct(data);
    io.emit("updateProducts", await manager.getProducts());
  });

  socket.on("deleteProduct", async id => {
    await manager.deleteProduct(id);
    io.emit("updateProducts", await manager.getProducts());
  });
});