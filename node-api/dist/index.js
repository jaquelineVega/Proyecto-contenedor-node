"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Express imports
const express_1 = __importDefault(require("express"));
// Debug and Colors Imports
const debug_1 = require("./utils/debug");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// API Utils import
const api_utils_1 = require("./utils/api.utils");
// Acceder a las variables de entorno
const environment_production_1 = __importDefault(require("./environment/environment.production"));
// Json Web Tokens Middleware
const token_middlewares_1 = __importDefault(require("./middlewares/token.middlewares"));
const mongodb_helper_1 = __importDefault(require("./helpers/mongodb.helper"));
const token = token_middlewares_1.default(environment_production_1.default);
// Environments
// const env = {
//      PORT: process.env.PORT || 5000,
//      NAME: process.env.NAME || 'Micro-Servicio Punto de Venta | NodeJS',
//      ENVIRONMET: process.env.ENVIRONMET || 'Development'
// }
// Variables Declaration
const debug = debug_1.DEBUG();
const color = debug_1.COLOR();
const app = express_1.default();
const apiUtils = api_utils_1.APIUtils(environment_production_1.default);
const mongodb = mongodb_helper_1.default.getInstance(environment_production_1.default);
// const secretKey = 'secretkey-value';
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
// Routes
app.post('/login', (req, res) => {
    console.log('Body', req.body);
    const { userName, password } = req.body;
    const mockUser = {
        fullName: 'Diana Reyes Servin',
        username: 'diana',
        password: '1234',
        email: 'dia_nolis@hotmail.com'
    };
    const mockRoles = ['Capture_Rol', 'Admon_Catalogs_Rol', 'Print_Rol'];
    // Validar usuario y contraseña
    if (userName == mockUser.username && password == mockUser.password) {
        const payload = {
            fullName: mockUser.fullName,
            userName: mockUser.username,
            email: mockUser.email,
            roles: mockRoles
        };
        // Generar el token para ese usuario
        jsonwebtoken_1.default.sign(payload, environment_production_1.default.TOKEN.SECRET_KEY, {
            expiresIn: environment_production_1.default.TOKEN.EXPIRES
        }, (err, token) => {
            if (err) {
                return res.status(500).json(apiUtils.BodyResponse(api_utils_1.APIStatusEnum.Internal_Server_Error, 'Internal Server Error', 'Error al intentar crear el Token', null, err));
            }
            // OK
            res.status(200).json(apiUtils.BodyResponse(api_utils_1.APIStatusEnum.Success, 'OK', 'Token generado de forma correcta', {
                username: mockUser.username,
                token
            }, null));
        });
    }
    else {
        res.status(403).json(apiUtils.BodyResponse(api_utils_1.APIStatusEnum.Forbidden, 'La solicitud fue legal, pero el servidor rehúsa responderla dado que el cliente', 'Credenciales inválidas. El usuario y/o contraseña no son validos', {
            msg: 'Credenciales inválidas'
        }, null));
    }
});
app.get('/products', token.verify, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productos = yield mongodb.db.collection('productos').find({}).toArray();
    res.status(200).json(apiUtils.BodyResponse(api_utils_1.APIStatusEnum.Success, 'OK', 'La solicitud ha tenido éxito', {
        productos,
        authUser: req.body.authUser
    }));
}));
///METODO DE OBTENER PRODUCTOS SIN JWT
app.get('/products2', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.header("Access-Control-Allow-Origin", "*"); //Indicar el dominio a dar acceso
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    const productos = yield mongodb.db.collection('productos').find({}).toArray();
    res.status(200).json(apiUtils.BodyResponse(api_utils_1.APIStatusEnum.Success, 'OK', 'La solicitud ha tenido éxito', {
        productos,
        authUser: req.body.authUser
    }));
}));
app.get('/productCategoria/:categoria', token.verify, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.header("Access-Control-Allow-Origin", "*"); //Indicar el dominio a dar acceso
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    const categoria = req.params.categoria;
    const productos = yield mongodb.db.collection('productos').find({ "categoria": { $regex: ".*" + categoria + ".*" } }).toArray();
    res.status(200).json(apiUtils.BodyResponse(api_utils_1.APIStatusEnum.Success, 'OK', 'La solicitud ha tenido éxito', {
        productos,
        authUser: req.body.authUser
    }));
}));
///METODO DE OBTENER POR CATEGORIA SIN JWT
app.get('/productCategoria2/:categoria', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "*");
    const categoria = req.params.categoria;
    const productos = yield mongodb.db.collection('productos').find({ "categoria": { $regex: ".*" + categoria + ".*" } }).toArray();
    res.status(200).json(apiUtils.BodyResponse(api_utils_1.APIStatusEnum.Success, 'OK', 'La solicitud ha tenido éxito', {
        productos,
        authUser: req.body.authUser
    }));
}));
app.get('/search/:criterio/:parametro', token.verify, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const busqueda = req.params.criterio;
    const parametro = req.params.parametro;
    var productos;
    switch (busqueda) {
        case "descripcion":
            productos = yield mongodb.db.collection('productos').find({ "descripcion": { $regex: ".*" + parametro + ".*" } }).toArray();
            break;
        case "codigo":
            productos = yield mongodb.db.collection('productos').find({ "codigo": { $regex: ".*" + parametro + ".*" } }).toArray();
            break;
        case "precio":
            productos = yield mongodb.db.collection('productos').find({ "precio": { $regex: ".*" + parametro + ".*" } }).toArray();
            break;
        case "proveedor":
            productos = yield mongodb.db.collection('productos').find({ "proveedor": { $regex: ".*" + parametro + ".*" } }).toArray();
            break;
        case "provDescr":
            productos = yield mongodb.db.collection('productos').find({ "provDescr": { $regex: ".*" + parametro + ".*" } }).toArray();
            break;
    }
    res.status(200).json(apiUtils.BodyResponse(api_utils_1.APIStatusEnum.Success, 'OK', 'La solicitud ha tenido éxito', {
        productos,
        authUser: req.body.authUser
    }));
}));
///METODO DE OBTENER POR CRITERIO SIN JWT
app.get('/search2/:criterio/:parametro', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "*");
    const busqueda = req.params.criterio;
    const parametro = req.params.parametro;
    var productos;
    switch (busqueda) {
        case "descripcion":
            productos = yield mongodb.db.collection('productos').find({ "descripcion": { $regex: ".*" + parametro + ".*" } }).toArray();
            break;
        case "codigo":
            productos = yield mongodb.db.collection('productos').find({ "codigo": { $regex: ".*" + parametro + ".*" } }).toArray();
            break;
        case "precio":
            productos = yield mongodb.db.collection('productos').find({ "precio": { $regex: ".*" + parametro + ".*" } }).toArray();
            break;
        case "proveedor":
            productos = yield mongodb.db.collection('productos').find({ "proveedor": { $regex: ".*" + parametro + ".*" } }).toArray();
            break;
        case "provDescr":
            productos = yield mongodb.db.collection('productos').find({ "provDescr": { $regex: ".*" + parametro + ".*" } }).toArray();
            break;
    }
    res.status(200).json(apiUtils.BodyResponse(api_utils_1.APIStatusEnum.Success, 'OK', 'La solicitud ha tenido éxito', {
        productos,
        authUser: req.body.authUser
    }));
}));
///METODO DE OBTENER POR CODIGO SIN JWT
app.get('/productId/:codigo', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "*");
    const codigo = req.params.codigo;
    const productos = yield mongodb.db.collection('productos').find({ "codigo": { $regex: ".*" + codigo + ".*" } }).toArray();
    res.status(200).json(apiUtils.BodyResponse(api_utils_1.APIStatusEnum.Success, 'OK', 'La solicitud ha tenido éxito', {
        productos,
        authUser: req.body.authUser
    }));
}));
// Iniciar el servidor
app.listen(environment_production_1.default.API.PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    //Conetando con MongoDB
    try {
        yield mongodb.connect();
    }
    catch (error) {
        process.exit();
    }
    debug.express(`El servidor de ${color.express('Express')} se inicio ${color.success('correctamente')} en el puerto ${color.info(environment_production_1.default.API.PORT)}`);
}));
