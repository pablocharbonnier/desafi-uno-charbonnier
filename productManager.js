class ProductManager {
    constructor() {
        this.products = [];
        this.nextId = 1;
    }

    addProduct(title, description, price, thumbnail, code, stock) {

        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log("Todos los campos son obligatorios.");
            return;
        }

        const existingProduct = this.products.find(product => product.code === code);
        if (existingProduct) {
            console.log(`El campo 'code' ${code} ya existe para otro producto.`);
            return;
        }


       
        this.products.push({
            id:this.nextId++,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        });
        

        console.log(`Producto agregado: ${title}`);
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find(product => product.id === id);
        if (!product) {
            console.log("not found");
        } else {
            return product;
           
        }
    }

}
const productManager = new ProductManager();
productManager.addProduct("Producto 1", "Descripción del producto 1", 1500, "ruta-imagen-1.jpg", "001", 50);
productManager.addProduct("Producto 2", "Descripción del producto 2", 2300, "ruta-imagen-2.jpg", "002", 30);
productManager.addProduct("Producto 3", "Descripción del producto 3", 3600, "ruta-imagen-3.jpg", "003", 20);

const product = productManager.getProductById(1);
console.log(product);