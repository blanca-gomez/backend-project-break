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
    
router.get('/', (req, res) => {
    res.render('index');
});

router.get('/products', showProducts);//todos los productos sin UPDATE y DELETE

router.get('/products/:id', showProductById);//el producto por ID

router.get('/dashboard/edit/:id', showEditProduct);//actualizar el producto

router.post('/dashboard', createProduct);//ruta POST para crear

router.get('/dashboard/new',showNewProduct);//ruta para crear y mostrar nuevo producto

router.post('/dashboard/:id',updateProduct );//ruta POST para actualizar

router.delete('/dashboard/:id',deleteProduct);//ruta DELETE para borrar

router.get('/products/category/:categoria', showProductsByCategory);

router.get('/dashboard/products', showAllProducts );

router.get('/dashboard/products/:id', showProductDetail);//todos los productos con UPDATE y DELETE

module.exports = router;