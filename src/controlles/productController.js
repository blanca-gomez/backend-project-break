/**Archivo que contendrá la lógica para manejar las solicitudes CRUD de los productos. 
 * Devolverá las respuestas en formato HTML. */

const Product = require ('../models/Product.js');

const showProducts = async (req,res,next) => {
    try{
        const products = await Product.find({});
        res.render('products', {products : products})
    }catch(error){
        next(error)
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
        next(error)
    }
}

const createProduct = async (req,res) => {
    try{
        const product = await Product.create(req.body);
        res.redirect(`/dashboard/products/${product._id}`)
    }catch (error){
        next(error)
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
        res.redirect(`/dashboard/products/${id}?success=update`);
    }
    catch(error){
        next(error)
    }
}

const showEditProduct = async (req,res) => {
    try{
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) { 
            return res.status(404).render('error', { message: 'Producto no encontrado' });
        }
        res.render('updateProduct', { product, success: false });
        
    }catch (error){
        next(error)
    }
}

const deleteProduct = async (req,res) => {
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).render('error', { message: 'Producto no encontrado' });
        }
        res.redirect(`/dashboard/products/${id}?success=delete`);
    }
    catch(error){
        next(error)
    }
}

const showProductsByCategory = async (req,res) => {
    try{
        const {categoria} = req.params;
        const products = await Product.find({categoria});
        if(products.length === 0){
            return res.status(404).render('error', { message: 'Producto no encontrado' });
        }
        res.render('productsByCategory', {products, categoria})

    }catch (error){
        next(error)
    }
}

const showAllProducts = async (req,res) => {
    try{
        const products = await Product.find({})
        res.render('showAllProducts', {products})
    }catch (error){
        next(error)
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
        next(error)
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