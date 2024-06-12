/**Archivo principal que iniciará el servidor Express. Importa las rutas y las usa. 
 * También tiene que estar configurado para servir archivos estáticos 
 * y para leer el body de las peticiones de formularios. */

const express = require ('express');
const app = express();
const PORT = process.env.PORT || 3000;
const {dbConnection} = require('./config/db');
const routes = require('./routes/productRoutes');
const path = require('path');
const methodOverride = require('method-override');//soportar métodos PUT y DELETE
const errors = require('./middlewares/error')

app.use(express.json()); /*formato json() */
app.use(express.urlencoded({extended: true}));/*formato url-encoded */
app.use(express.static('public'));
app.use(methodOverride('_method'))//middleware method override

app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'pug');

app.use('/', routes);
app.use(errors);

dbConnection();


app.listen(PORT,() => console.log(`server started in port ${PORT}`))