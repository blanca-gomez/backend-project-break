/*

const Product = require ('../models/Product.js');

const showProducts = async (req,res) => {
    try{
        const products = await Product.find({});
        res.render('products', {products : products})
    }catch (error){
        res.status(500).json({message : error.message})
    }
}

const showProductById = async (req,res) => {
    try{
        const {id} = req.params;
        const product = await Product.findById(id);
        const isDashboard = req.query.isDashboard === 'true'//comprobar si la solicitud viene del dashboard
        if(!product){
            return res.status(404).render('productDetails' , {products : null, isDashboard})
        }
        const htmlResponse = `
            <h1>${product.nombre}</h1>
            <img src="${product.imagen}" alt="${product.nombre}">
            <p>${product.descripcion}</p>
            <p>Precio: ${product.precio}</p>
        `;
        res.status(200).send(htmlResponse)
    }catch (error){
         res.status(500).json({message : error.message})
    }
}

const createProduct = async (req,res) => {
    try{
        const product = await Product.create(req.body);
        res.status(200).json(product)

    }catch (error){
        res.status(500).json({message : error.message})
    }
}

const showNewProduct = (req, res) => {
    res.status(200).send(`
        <form action="/products" method="POST">
            <div>
                <label for="nombre">Nombre:</label>
                <input type="nombre" id="nombre" name="nombre" required>
            </div>
            <div>
                <label for="descripcion">Descripcion:</label>
                <textarea id="descripcion" name="descripcion" required></textarea>
            </div>
            <div>
                <label for="categoria">Categoria:</label>
                <textarea id="categoria" name="categoria" required></textarea>
            </div>
            <div>
                <label for="talla">Talla:</label>
                <textarea id="talla" name="talla" required></textarea>
            </div>
            <div>
                <label for="precio">Precio:</label>
                <input type="precio" id="precio" name="precio" required>
            </div>
            <div>
                <label for="imagen">Imagen:</label>
                <input type="text" id="imagen" name="imagen" required>
            </div>
            <button type="submit">Create Product</button>
        </form>
    `);
};

const updateProduct = async (req,res) => {
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if(!product){
            return res.status(404).json({message : "Product not found"})
        }
        const updateProduct = await Product.findById(id);
        res.status(200).json(updateProduct)
    }
    catch(error){
        res.status(500).json({message : error.message})
    }
}

const showEditProduct = async (req,res) => {
    try{
        const { id } = req.params;
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).send (`<form action="/products/${product._id}" method="GET">
        <div>
            <label for="name">Nombre:</label>
            <input type="text" id="name" name="name" value="${product.nombre}" required>
        </div>
        <div>
            <label for="description">Descripción:</label>
            <textarea id="descripcion" name="descripcion" required>${product.descripcion}</textarea>
        </div>
        <div>
            <label for="categoria">Categoria:</label>
            <textarea id="Categoria" name="Categoria" required>${product.categoria}</textarea>
        </div>
        <div>
            <label for="talla">Talla:</label>
            <textarea id="talla" name="talla" required>${product.talla}</textarea>
        </div>
        <div>
            <label for="price">Precio:</label>
            <input type="number" id="precio" name="precio" value="${product.precio}" required>
        </div>
        <div>
            <label for="image">Imagen:</label>
            <input type="text" id="imagen" name="imagen" value="${product.imagen}" required>
        </div>
        <button type="submit">Update Product</button>
    </form>`);

    }catch (error){
        res.status(500).json({message : error.message})
    }
}

const deleteProduct = async (req,res) => {
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message : "Product not found"})
        }
        res.status(200).json({message : "Product delete successfully"})
    }
    catch(error){
        res.status(500).json({message : error.message})
    }
}

const showProductsByCategory = async (req,res) => {
    try{
        const {categoria} = req.params;
        const products = await Product.find({categoria});
        if(products.length === 0){
            return res.status(404).send('<h1>Producto no encontrado</h1>')
        }
        let productListHTML = "<h1>Productos en la categoría " + categoria + "</h1>";
        productListHTML += "<ul>";
        products.forEach(product => {
            productListHTML += "<li>" + product.nombre + " - " + product.descripcion + " - " + product.precio + "</li>";
        });
        productListHTML += "</ul>";
        res.status(200).send(productListHTML)

    }catch (error){
        res.status(500).send("<h1>Error al obtener los productos</h1>");
    }
}

const showAllProducts = async (req,res) => {
    try{
        const products = await Product.find({})
        let productListHTML = "<h1>Catálogo de Productos</h1><ul>";
        products.forEach(product => {
            productListHTML += "<li><strong>Nombre:</strong> " + product.nombre + "<br><strong>Descripción:</strong> " + product.descripcion + "<br><strong>Precio:</strong> " + product.precio + "</li>";
        });
        productListHTML += "</ul>";
        res.status(200).send(productListHTML)

    }catch (error){
        res.status(500).send("<h1>Error al obtener los productos</h1>");
    }
}

const showProductDetail = async (req,res) => {
    try{
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).send("<h1>Producto no encontrado</h1>");
        }
        const htmlResponse = `
            <h1>${product.nombre}</h1>
            <img src="${product.imagen}" alt="${product.nombre}">
            <p>${product.descripcion}</p>
            <p>Precio: ${product.precio}</p>
        `;
        res.status(200).send(htmlResponse)
    }catch (error){
        res.status(500).send("<h1>Error al obtener el producto</h1>");
    }

}


module.exports = {
    showProducts,
    showProductById,
    createProduct,
    showNewProduct,
    updateProduct,
    showEditProduct,
    deleteProduct,
    showProductsByCategory,
    showAllProducts,
    showProductDetail
};

*/