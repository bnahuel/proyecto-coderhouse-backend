import fs from "fs";

export default class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async getProducts() {
    if (!fs.existsSync(this.path)) return [];
    const data = await fs.promises.readFile(this.path, "utf-8");
    return JSON.parse(data);
  }

  async saveProducts(products) {
    await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
  }

  async addProduct(product) {
    const products = await this.getProducts();
    product.id = products.length ? products[products.length - 1].id + 1 : 1;
    products.push(product);
    await this.saveProducts(products);
  }

  async deleteProduct(id) {
    const products = await this.getProducts();
    const filtered = products.filter(p => p.id != id);
    await this.saveProducts(filtered);
    return products.length !== filtered.length;
  }
}