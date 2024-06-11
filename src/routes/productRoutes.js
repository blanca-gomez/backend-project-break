/**Archivo que contendrá la definición de las rutas CRUD para los productos. 
 * Este llama a los métodos del controlador. */

const express = require('express');
const router = express.Router();
const {showProducts, 
    showProductById,
     createProduct,
     updateProduct,
     deleteProduct,
     showNewProduct,
     showEditProduct,
     showProductsByCategory,
     showAllProducts,
     showProductDetail
    } = require ('../controlles/productController.js');

router.get('/products', showProducts);

router.get('/products/:id', showProductById); 

router.get('/dashboard/edit/:id', showEditProduct);

router.post('/dashboard', createProduct);

router.get('/dashboard/new',showNewProduct);

router.post('/dashboard/:id',updateProduct );

router.delete('/dashboard/:id',deleteProduct);

router.get('/products/category/:categoria', showProductsByCategory);

router.get('/dashboard/products', showAllProducts );

router.get('/dashboard/products/:id', showProductDetail);//solicitud desde dashboard

module.exports = router;