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

const { verifyToken } = require ('../middlewares/authJwt.js')


router.get('/', (req, res) => {
    res.render('index');
});

router.get('/products', showProducts);

router.get('/products/:id', showProductById);

router.get('/dashboard/edit/:id', showEditProduct);

router.post('/dashboard', verifyToken, createProduct);

router.get('/dashboard/new',verifyToken,showNewProduct);

router.post('/dashboard/:id', verifyToken, updateProduct );

router.delete('/dashboard/:id',verifyToken, deleteProduct);

router.get('/products/category/:categoria', showProductsByCategory);

router.get('/dashboard/products', verifyToken, showAllProducts );

router.get('/dashboard/products/:id', showProductDetail);

module.exports = router;