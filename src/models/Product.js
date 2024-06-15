const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    nombre : {
        type: String,
        required: true
    },
    descripcion : {
        type: String,
        required: true
    },
    imagen : {
        type: String,
        required : false
    },
    categoria : {
        type: String,
        enum: ["Camisetas", "Pantalones", "Zapatos", "Accesorios"],
        required : true
    },
    talla : {
        type: String,
        enum : ["XS", "S", "M", "L", "XL"],
        required: true
    },
    precio : {
        type : String,
        required: true,
    }
}, { timestamps: true });

const Product = mongoose.model('product', ProductSchema);
module.exports = Product;


