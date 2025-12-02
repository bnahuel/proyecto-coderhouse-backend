import { Router } from "express";
import { CartModel } from "../models/cart.model.js";

const router = Router();

router.post("/", async (req, res) => {
  const cart = await CartModel.create({ products: [] });
  res.send({ status: "success", cart });
});

router.get("/:cid", async (req, res) => {
  const cart = await CartModel.findById(req.params.cid).populate("products.product");
  if (!cart) return res.status(404).send("Carrito no encontrado");
  res.send(cart);
});

router.post("/:cid/products/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const cart = await CartModel.findById(cid);
  if (!cart) return res.status(404).send("Carrito no encontrado");

  const item = cart.products.find(p => p.product == pid);
  if (item) item.quantity++;
  else cart.products.push({ product: pid });

  await cart.save();
  res.send(cart);
});

router.delete("/:cid/products/:pid", async (req, res) => {
  const cart = await CartModel.findById(req.params.cid);
  if (!cart) return res.status(404).send("Carrito no encontrado");

  cart.products = cart.products.filter(p => p.product != req.params.pid);
  await cart.save();

  res.send(cart);
});

router.put("/:cid", async (req, res) => {
  const cart = await CartModel.findByIdAndUpdate(
    req.params.cid,
    { products: req.body.products },
    { new: true }
  );
  res.send(cart);
});

router.put("/:cid/products/:pid", async (req, res) => {
  const { quantity } = req.body;
  const cart = await CartModel.findById(req.params.cid);

  const item = cart.products.find(p => p.product == req.params.pid);
  item.quantity = quantity;

  await cart.save();
  res.send(cart);
});

router.delete("/:cid", async (req, res) => {
  const cart = await CartModel.findById(req.params.cid);
  cart.products = [];
  await cart.save();
  res.send(cart);
});

export default router;