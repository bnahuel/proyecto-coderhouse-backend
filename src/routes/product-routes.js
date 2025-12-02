import { Router } from "express";
import { ProductModel } from "../models/product.model.js";
import { io } from "../index.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const sort = req.query.sort === "asc" ? 1 : req.query.sort === "desc" ? -1 : null;
    const query = req.query.query ? { category: req.query.query } : {};

    const options = {
      limit,
      page,
      sort: sort ? { price: sort } : undefined
    };

    const result = await ProductModel.paginate(query, options);

    res.send({
      status: "success",
      payload: result.docs,
      totalPages: result.totalPages,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
      page: result.page,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevLink: result.hasPrevPage ? `/api/products?page=${result.prevPage}` : null,
      nextLink: result.hasNextPage ? `/api/products?page=${result.nextPage}` : null
    });

  } catch (err) {
    res.status(500).send({ status: "error", error: err.message });
  }
});

router.post("/", async (req, res) => {
  const prod = await ProductModel.create(req.body);
  io.emit("updateProducts");
  res.send({ status: "success", prod });
});

router.delete("/:pid", async (req, res) => {
  const r = await ProductModel.findByIdAndDelete(req.params.pid);
  io.emit("updateProducts");
  res.send({ status: r ? "deleted" : "not_found" });
});

export default router;