import fs from "fs/promises";

export default class CartManager {
  constructor(path) {
    this.path = path;
  }

  async leerArchivo() {
    try {
      const data = await fs.readFile(this.path, "utf-8");
      return JSON.parse(data || "[]");
    } catch {
      return [];
    }
  }

  async guardarArchivo(data) {
    await fs.writeFile(this.path, JSON.stringify(data, null, 2));
  }

  async createCart() {
    const carritos = await this.leerArchivo();
    const nuevo = { id: Date.now().toString(), products: [] };
    carritos.push(nuevo);
    await this.guardarArchivo(carritos);
    return nuevo;
  }

  async getCartById(id) {
    const carritos = await this.leerArchivo();
    return carritos.find(c => c.id === id);
  }

  async addProductToCart(cid, pid) {
    const carritos = await this.leerArchivo();
    const index = carritos.findIndex(c => c.id === cid);
    if (index === -1) return null;

    const cart = carritos[index];
    const producto = cart.products.find(p => p.product === pid);

    if (producto) {
      producto.quantity += 1;
    } else {
      cart.products.push({ product: pid, quantity: 1 });
    }

    await this.guardarArchivo(carritos);
    return cart;
  }
}