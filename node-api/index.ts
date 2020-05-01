// Express imports
import Express from 'express';
import {Request, Response} from 'express';
// Debug and Colors Imports
import {DEBUG, COLOR} from './utils/debug';
import jwt from 'jsonwebtoken';
// API Utils import
import {APIUtils, APIStatusEnum} from './utils/api.utils';
// Acceder a las variables de entorno
import ENV from './environment/environment.production';
// Json Web Tokens Middleware
import AuthToken from './middlewares/token.middlewares';
import MongoDBClient from 'mongodb';
import MongoDB from './helpers/mongodb.helper';

const token = AuthToken(ENV);



// Environments
// const env = {
//      PORT: process.env.PORT || 5000,
//      NAME: process.env.NAME || 'Micro-Servicio Punto de Venta | NodeJS',
//      ENVIRONMET: process.env.ENVIRONMET || 'Development'
// }

// Variables Declaration
const debug = DEBUG();
const color = COLOR();
const app = Express();
const apiUtils = APIUtils(ENV);
const mongodb = MongoDB.getInstance(ENV);
// const secretKey = 'secretkey-value';

app.use(Express.urlencoded({extended: true}));
app.use(Express.json());

// Routes
app.post('/login', (req : Request, res : Response) => {
    console.log('Body', req.body);
    const {userName, password} = req.body;
    const mockUser = {
        fullName: 'Diana Reyes Servin',
        username: 'diana',
        password: '1234',
        email: 'dia_nolis@hotmail.com'
    }

    const mockRoles = ['Capture_Rol', 'Admon_Catalogs_Rol', 'Print_Rol'];
    // Validar usuario y contraseña
    if (userName == mockUser.username && password == mockUser.password) {
        const payload = {
            fullName: mockUser.fullName,
            userName: mockUser.username,
            email: mockUser.email,
            roles: mockRoles
        }

        // Generar el token para ese usuario
        jwt.sign(payload, ENV.TOKEN.SECRET_KEY, {
            expiresIn: ENV.TOKEN.EXPIRES
        }, (err, token) => { // Existe error
            if (err) {
                return res.status(500).json(apiUtils.BodyResponse(APIStatusEnum.Internal_Server_Error, 'Internal Server Error', 'Error al intentar crear el Token', null, err))
            }
            // OK
            res.status(200).json(apiUtils.BodyResponse(APIStatusEnum.Success, 'OK', 'Token generado de forma correcta', {
                username: mockUser.username,
                token
            }, null))
        });
    } else {
        res.status(403).json(apiUtils.BodyResponse(APIStatusEnum.Forbidden, 'La solicitud fue legal, pero el servidor rehúsa responderla dado que el cliente', 'Credenciales inválidas. El usuario y/o contraseña no son validos', {
            msg: 'Credenciales inválidas'
        }, null))
    }
});

app.get('/products', token.verify,async (req : Request, res : Response) => {

    const productos = await mongodb.db.collection('productos').find({ }).toArray();

    res.status(200).json(apiUtils.BodyResponse(
        APIStatusEnum.Success, 'OK', 'La solicitud ha tenido éxito', 
        {         
            productos,
            authUser: req.body.authUser
    }));

});


///METODO DE OBTENER PRODUCTOS SIN JWT
app.get('/products2',async (req : Request, res : Response) => {
    res.header("Access-Control-Allow-Origin", "*"); //Indicar el dominio a dar acceso
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    const productos = await mongodb.db.collection('productos').find({ }).toArray();

    res.status(200).json(apiUtils.BodyResponse(
        APIStatusEnum.Success, 'OK', 'La solicitud ha tenido éxito', 
        {         
            productos,
            authUser: req.body.authUser
    }));

});


app.get('/productCategoria/:categoria', token.verify,async (req : Request, res : Response) => {
    res.header("Access-Control-Allow-Origin", "*"); //Indicar el dominio a dar acceso
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    const categoria = req.params.categoria;

    const productos = await mongodb.db.collection('productos').find({ "categoria" : { $regex : ".*" + categoria + ".*" }}).toArray();

    res.status(200).json(apiUtils.BodyResponse(
        APIStatusEnum.Success, 'OK', 'La solicitud ha tenido éxito', 
        {         
            productos,
            authUser: req.body.authUser
    }));
});

///METODO DE OBTENER POR CATEGORIA SIN JWT
app.get('/productCategoria2/:categoria', async (req : Request, res : Response) => {
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "*");

    const categoria = req.params.categoria;

    const productos = await mongodb.db.collection('productos').find({ "categoria" : { $regex : ".*" + categoria + ".*" }}).toArray();

    res.status(200).json(apiUtils.BodyResponse(
        APIStatusEnum.Success, 'OK', 'La solicitud ha tenido éxito', 
        {         
            productos,
            authUser: req.body.authUser
    }));
});

app.get('/search/:criterio/:parametro', token.verify,async (req : Request, res : Response) => {

    const busqueda = req.params.criterio;
    const parametro = req.params.parametro;
    var productos;

    switch(busqueda)
    {
        case "descripcion":
            productos = await mongodb.db.collection('productos').find({ "descripcion" : { $regex : ".*" + parametro + ".*" }}).toArray();
        break;
        case "codigo":
            productos = await mongodb.db.collection('productos').find({ "codigo" : { $regex : ".*" + parametro + ".*" }}).toArray();
        break;
        case "precio":
            productos = await mongodb.db.collection('productos').find({ "precio" : { $regex : ".*" + parametro + ".*" }}).toArray();
        break;
        case "proveedor":
            productos = await mongodb.db.collection('productos').find({ "proveedor" : { $regex : ".*" + parametro + ".*" }}).toArray();
        break;
        case "provDescr":
            productos = await mongodb.db.collection('productos').find({ "provDescr" : { $regex : ".*" + parametro + ".*" }}).toArray();
        break;
    }

    res.status(200).json(apiUtils.BodyResponse(
        APIStatusEnum.Success, 'OK', 'La solicitud ha tenido éxito', 
        {         
            productos,
            authUser: req.body.authUser
    }));
});


///METODO DE OBTENER POR CRITERIO SIN JWT
app.get('/search2/:criterio/:parametro', async (req : Request, res : Response) => {
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "*");
    
    const busqueda = req.params.criterio;
    const parametro = req.params.parametro;
    var productos;

    switch(busqueda)
    {
        case "descripcion":
            productos = await mongodb.db.collection('productos').find({ "descripcion" : { $regex : ".*" + parametro + ".*" }}).toArray();
        break;
        case "codigo":
            productos = await mongodb.db.collection('productos').find({ "codigo" : { $regex : ".*" + parametro + ".*" }}).toArray();
        break;
        case "precio":
            productos = await mongodb.db.collection('productos').find({ "precio" : { $regex : ".*" + parametro + ".*" }}).toArray();
        break;
        case "proveedor":
            productos = await mongodb.db.collection('productos').find({ "proveedor" : { $regex : ".*" + parametro + ".*" }}).toArray();
        break;
        case "provDescr":
            productos = await mongodb.db.collection('productos').find({ "provDescr" : { $regex : ".*" + parametro + ".*" }}).toArray();
        break;
    }

    res.status(200).json(apiUtils.BodyResponse(
        APIStatusEnum.Success, 'OK', 'La solicitud ha tenido éxito', 
        {         
            productos,
            authUser: req.body.authUser
    }));
});

///METODO DE OBTENER POR CODIGO SIN JWT
app.get('/productId/:codigo', async (req: Request, res: Response) => {
    
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "*");

    const codigo = req.params.codigo;

    const productos = await mongodb.db.collection('productos').find({ "codigo" : { $regex : ".*" + codigo + ".*" }}).toArray();

    res.status(200).json(apiUtils.BodyResponse(
        APIStatusEnum.Success, 'OK', 'La solicitud ha tenido éxito', 
        {         
            productos,
            authUser: req.body.authUser
    }));
});

// Iniciar el servidor
app.listen(ENV.API.PORT, async() => {
    //Conetando con MongoDB
    try{
        await mongodb.connect();
    }
    catch(error)
    {
        process.exit();
    }
    debug.express(`El servidor de ${
        color.express('Express')
    } se inicio ${
        color.success('correctamente')
    } en el puerto ${
        color.info(ENV.API.PORT)
    }`);
});

