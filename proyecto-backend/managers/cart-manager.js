import fs from "fs";

export default class CartManager {
  constructor(path) {
    this.path = path;
  }

  leerArchivo() {
    if (!fs.existsSync(this.path)) return [];
    const data = fs.readFileSync(this.path, "utf-8");
    return data ? JSON.parse(data) : [];
  }

  guardarArchivo(data) {
    fs.writeFileSync(this.path, JSON.stringify(data, null, 2));
  }

  createCart() {
    const carritos = this.leerArchivo();
    const nuevo = { id: Date.now().toString(), products: [] };
    carritos.push(nuevo);
    this.guardarArchivo(carritos);
    return nuevo;
  }

  getCartById(id) {
    const carritos = this.leerArchivo();
    return carritos.find(c => c.id === id);
  }

  addProductToCart(cid, pid) {
    const carritos = this.leerArchivo();
    const index = carritos.findIndex(c => c.id === cid);
    if (index === -1) return null;

    const cart = carritos[index];
    const producto = cart.products.find(p => p.product === pid);

    if (producto) {
      producto.quantity += 1;
    } else {
      cart.products.push({ product: pid, quantity: 1 });
    }

    this.guardarArchivo(carritos);
    return cart;
  }
}