"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const api_utils_1 = require("../utils/api.utils");
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
exports.default = (CONFIG) => {
    const apiUtils = api_utils_1.APIUtils(CONFIG);
    return {
        verify: (req, res, next) => {
            const bearerHeader = req.headers['authorization'];
            if (typeof bearerHeader !== 'undefined') {
                const bearer = bearerHeader.split(' ');
                const bearerToken = bearer[1];
                jsonwebtoken_1.default.verify(bearerToken, CONFIG.TOKEN.SECRET_KEY, (err, tokenDecoded) => {
                    if (err) {
                        return res.status(api_utils_1.APIStatusEnum.Forbidden).json(apiUtils.BodyResponse(api_utils_1.APIStatusEnum.Forbidden, 
                        // Descripcion
                        'Acceso Prohibido al verificar el Token', 
                        // Mensaje
                        'El Token proporcionado, no es un Token Válido. Favor de Verificar', 
                        // Result
                        {}, 
                        // Error
                        err));
                    }
                    req.body.authUser = tokenDecoded;
                    next();
                });
            }
            else { // Unautorized
                return res.status(api_utils_1.APIStatusEnum.Unauthorized).json(apiUtils.BodyResponse(api_utils_1.APIStatusEnum.Unauthorized, 
                // Descripcion
                'Acceso NO autorizado', 
                // Mensaje
                'Necesita proporcionar un Token para acceder a la solicitud', 
                // Result
                {}, 
                // Error
                {}));
            }
            app.use((req, res, next) => {
                next();
            });
        }
    };
};
