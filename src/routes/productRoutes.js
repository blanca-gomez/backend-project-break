/**Archivo que contendrá la definición de las rutas CRUD para los productos. 
 * Este llama a los métodos del controlador. */

const express = require('express');
const router = express.Router();
const {showProducts, showProductById, createProduct,updateProduct,deleteProduct, showNewProduct,showEditProduct} = require ('../controlles/productController.js');

router.get('/dashboard', showProducts);

router.get('/dashboard/edit/:id', showEditProduct);

router.post('/dashboard', createProduct);

router.get('/dashboard/new',showNewProduct);

router.get('/dashboard/:id', showProductById);

router.put('/dashboard/:id',updateProduct );

router.delete('/dashboard/:id',deleteProduct);


module.exports = router;