import fs from "fs/promises";

export default class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async getProducts() {
    try {
      const data = await fs.readFile(this.path, "utf-8");
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  async addProduct(product) {
    const products = await this.getProducts();

    const id = products.length === 0 ? 1 : products[products.length - 1].id + 1;

    const newProduct = { id, ...product };

    products.push(newProduct);

    await fs.writeFile(this.path, JSON.stringify(products, null, 2));

    return newProduct;
  }

  async deleteProduct(id) {
    const products = await this.getProducts();

    const filtered = products.filter((p) => p.id != id);

    await fs.writeFile(this.path, JSON.stringify(filtered, null, 2));

    return filtered.length !== products.length;
  }
}