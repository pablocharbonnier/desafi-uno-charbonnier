import fs from 'fs';

export default class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
    this.nextId = 1;
  }

  async addProduct(product) {
    if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
      console.log("Todos los campos son obligatorios.");
      return;
    }

    const existingProduct = this.products.find(p => p.code === product.code);
    if (existingProduct) {
      console.log(`El campo 'code' ${product.code} ya existe para otro producto.`);
      return;
    }

    product.id = this.nextId++;
    this.products.push(product);
    await this._saveProducts();
    console.log(`Producto agregado: ${product.title}`);
  }

  async getProducts() {
    await this._loadProducts();
    return this.products;
  }

  async getProductById(id) {
    await this._loadProducts();
    const product = this.products.find(p => p.id === id);
    if (!product) {
      console.log("Producto no encontrado");
      return null;
    }
    return product;
  }

  async updateProduct(id, updatedFields) {
    await this._loadProducts();
    const product = this.products.find(p => p.id === id);
    if (!product) {
      console.log("Producto no encontrado");
      return false;
    }

    Object.assign(product, updatedFields);
    await this._saveProducts();
    console.log(`Producto actualizado: ${product.title}`);
    return true;
  }

  async deleteProduct(id) {
    await this._loadProducts();
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) {
      console.log("Producto no encontrado");
      return false;
    }

    this.products.splice(index, 1);
    await this._saveProducts();
    console.log(`Producto eliminado con ID: ${id}`);
    return true;
  }

  async _loadProducts() {
    try {
      const data = await fs.promises.readFile(this.path, 'utf8');
      this.products = JSON.parse(data);
    } catch (error) {
      console.log("Error al leer el archivo de productos:", error);
      this.products = [];
    }
  }

  async _saveProducts() {
    try {
      await fs.promises.writeFile(this.path, JSON.stringify(this.products));
    } catch (error) {
      console.log("Error al guardar los productos:", error);
    }
  }
}

const productManager = new ProductManager('./files/productos.json');
productManager.addProduct({
  title: "Producto 1",
  description: "Descripción del producto 1",
  price: 1500,
  thumbnail: "ruta-imagen-1.jpg",
  code: "001",
  stock: 50
});

productManager.addProduct({
  title: "Producto 2",
  description: "Descripción del producto 2",
  price: 2300,
  thumbnail: "ruta-imagen-2.jpg",
  code: "002",
  stock: 30
});

productManager.addProduct({
  title: "Producto 3",
  description: "Descripción del producto 3",
  price: 3600,
  thumbnail: "ruta-imagen-3.jpg",
  code: "003",
  stock: 20
});

const product = await productManager.getProductById(1);
console.log(product);