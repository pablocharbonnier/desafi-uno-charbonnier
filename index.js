import ProductManager from "./managers/productManager.js";

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