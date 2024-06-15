const express = require ('express');
const app = express();
const PORT = process.env.PORT || 3000;
const {dbConnection} = require('./config/db');
const routes = require('./routes/productRoutes');
const path = require('path');
const methodOverride = require('method-override');
const errors = require('./middlewares/error');
const authRoutes = require ('./routes/authRoutes.js');
const cookieParser = require('cookie-parser');

app.use(express.json()); 
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(cookieParser());

app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'pug');

app.use('/', routes);
app.use('/auth', authRoutes);
app.use(errors);

dbConnection();


app.listen(PORT,() => console.log(`server started in port ${PORT}`))