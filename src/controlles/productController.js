/**Archivo que contendrá la lógica para manejar las solicitudes CRUD de los productos. 
 * Devolverá las respuestas en formato HTML. */

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
        res.status(200).json(product)
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




module.exports = {
    showProducts,
    showProductById,
    createProduct,
    showNewProduct,
    updateProduct,
    showEditProduct,
    deleteProduct
};