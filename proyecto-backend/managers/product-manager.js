import fs from "fs";

export default class ProductManager {
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

  getProducts() {
    return this.leerArchivo();
  }

  getProductById(id) {
    const productos = this.leerArchivo();
    return productos.find(p => p.id === id);
  }

  addProduct(product) {
    const productos = this.leerArchivo();

    if (!product.title || !product.price || !product.code) {
      throw new Error("Faltan campos obligatorios (title, price, code)");
    }

    const id = Date.now().toString();
    const nuevo = {
      id,
      title: product.title,
      description: product.description || "",
      code: product.code,
      price: product.price,
      status: product.status ?? true,
      stock: product.stock || 0,
      category: product.category || "general",
      thumbnails: product.thumbnails || []
    };

    productos.push(nuevo);
    this.guardarArchivo(productos);
    return nuevo;
  }

  updateProduct(id, cambios) {
    const productos = this.leerArchivo();
    const index = productos.findIndex(p => p.id === id);
    if (index === -1) return null;

    productos[index] = { ...productos[index], ...cambios, id };
    this.guardarArchivo(productos);
    return productos[index];
  }

  deleteProduct(id) {
    let productos = this.leerArchivo();
    const antes = productos.length;
    productos = productos.filter(p => p.id !== id);
    this.guardarArchivo(productos);
    return productos.length < antes;
  }
}