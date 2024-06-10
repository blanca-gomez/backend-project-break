/**Archivo principal que iniciará el servidor Express. Importa las rutas y las usa. 
 * También tiene que estar configurado para servir archivos estáticos 
 * y para leer el body de las peticiones de formularios. */

const express = require ('express');
const app = express();
const PORT = 3000;
const {dbConnection} = require('./config/db');
const routes = require('./routes/productRoutes');
const path = require('path')

app.use(express.json()); /*formato json() */
app.use(express.urlencoded({extended: true}));/*formato url-encoded */
app.use(express.static('public'));

app.set('views', path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'pug');

app.use('/', routes);

dbConnection();

app.get('/', (req,res) => {
    res.send('pagina de prueba')
})

app.listen(PORT,() => console.log(`server started in port ${PORT}`))