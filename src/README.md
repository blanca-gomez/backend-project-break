# EXPLICACIÓN:
## CONTROLADORES:
-Accedes a '/dashboard/new' que llama al controlador 'showNewProduct'. Que se encarga de obtener todos los productos de la BBDD y los envia a la vista 'products.pug'

-Una vez completado el formulario se envía solicitud POST a '/dashboard' que llama al controlador 'createProduct'. Una vez creado el nuevo producto redirige la vista a showProductsById, para que muestre los detalles de ese producto.

-Una vez creado el producto redirige a  '/dashboard/products/:id' que llama al controlador 'showProductDetail', que se encarga de obtener un producto por su ID y lo envia a la vista productDetails.

-Si se hace desde dashboard hya dos opciones, editar o eliminar el producto.

-Si se decide editar el producto, al clicar en el botón de editar redirige a  '/dashboard/edit/:id', que se encarga de llamar al controlador 'showEditProduct'. Este controlador obtiene un producto por su ID y lo envia a la vista uptadeProduct.

-Con el producto ya actualizado redirige a  '/dashboard/products/:id', para volver a llamar al controlador 'showProductDetail', que nos muestre los datos especificos de ese producto.

-Si se decide eliminar ese producto se manda un solicitud DELETE a '/dashboard/:id' que llama al controlador deteleProduct que se encarga de eliminar el producto según el ID introducido. Una vez eliminado el producto redirige a '/dashboard/products' y llama al controlador showAllProducts, que obtiene todos los productos de la BBDD y los envia a la vista showAll products. Con opciones de actualizar y eliminar.

-'showProductsByCategory', obtiene todos los productos de una categoria especifica y los envía a la vista productsByCategory


## MANEJO DE ERRORES:
middleware-erros.js
En este archivo hay un middleware para manejar los errores
Cuando un producto no se encuentra manda un mensaje al usuario con un error tipo 404.
Si ocurre otro tipo de error durante la ejecución del bloque try llama al middleware de manejo de errores mediante next(error)
Cuando ocurre un error inesperado, el middleware captura el error, lo imprime en consola y llama a la vista error.pug, que pasa un mensaje de error.

## VIEWS
En este archivo contiene las vistas de mi aplicación renderizadas con motor de plantillas PUG.
-layouts: es la plantilla que contiene la estructura común del resto de plantillas. 
-createProduct: hereda de layouts la estuctura principal. Formulario para que el usuario cree un nuevo producto. Envía solicitud POST a '/dashboard'.
-productDetails: muestra los detalles del producto, con opciones de editar o eliminar. Si la petición viene de dashboard nos muestra dos formularios.
                    .editar: que redirige a `/dashboard/edit/${product._id}` empleando método GET
                    .Eliminar: que redirige a `/dashboard/${product._id}?_method=DELETE` mediante método POST.
                    Usa el parámetro _method=DELETE de app.use(methodOverride('_method')
                    para poder emplear método PUT o DELETE. Mediante _method indico que método http va a ser utilizado
-products: .products y .products-card son clases que devuelven todos los productos y los datos de cada producto respectivamente. 
-productsByCategory: define una lista con los datos de cada product del array product.
-showAllProducts: muestra un enlace que conduce a '/dashboard/new' para agregar un nuevo producto. recorre el array products y muestra los datos de cada producto.
-updateProduct: vista para actualizar un producto. Este formulario va a enviar los datos mediante método POST a `/dashboard/:id`.

##  CONFIGURACIONES PARA EL USO DE PUG EN MI APLICACIÓN EXPRESS
**const path = require('path');
**app.set('views', path.join(__dirname,'views')); ubicación de las plantillas. Mediante path contruye la ruta absoluta hasta el archivo views donde se encuntran las plantillas.
**app.set('view engine', 'pug'); Indicamos el motor de plantilla que vamos a emplear
**app.use(express.static('public')); configura express para que se puedan servir archivos estáticos desde carpeta public

