/**Archivo que contendrá la lógica para manejar las solicitudes CRUD de los productos. 
 * Devolverá las respuestas en formato HTML. */

const Product = require ('../models/Product.js');

const showProducts = async (req,res) => {
    try{
        const products = await Product.find({});
        res.render('products', {products : products})
    }catch (error){
        res.status(500).render('error', { message: error.message });
    }
}

const showProductById = async (req,res) => {
    try{
        const {id} = req.params;
        const product = await Product.findById(id);
        if(!product){
            return res.status(404).render('productDetails' , {product : null, isDashboard : false})
        }
        res.render('productDetails', {product, isDashboard : false})
    }catch (error){
         res.status(500).render('error', { message: error.message });
    }
}

const createProduct = async (req,res) => {
    try{
        const product = await Product.create(req.body);
        res.redirect(`/dashboard/products/${product._id}`)

    }catch (error){
        res.status(500).render('error', { message: error.message });
    }
}

const showNewProduct = (req, res) => {
    res.render('createProduct')
};

const updateProduct = async (req,res) => {
    try{
        const {id} = req.body;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if(!product){
            return res.status(404).render('error', { message: 'Producto no encontrado' });
        }
        res.redirect(`/dashboard/edit/${product._id}`)
    }
    catch(error){
        res.status(500).render('error', { message: error.message });
    }
}

const showEditProduct = async (req,res) => {
    try{
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).render('error', { message: 'Producto no encontrado' });
        }
        res.render('updateProduct', {product})
        
    }catch (error){
        res.status(500).render('error', { message: error.message });
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
            return res.status(404).render('productDetails' , {product : null, isDashboard : true})
        }
        res.render('productDetails', {product, isDashboard : true})
    }catch (error){
        res.status(500).json({ message: error.message });
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