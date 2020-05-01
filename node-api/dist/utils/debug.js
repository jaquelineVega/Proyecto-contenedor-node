"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
exports.DEBUG = () => {
    return {
        express: require('debug')('api:[Express]'),
        mongoDB: require('debug')('api:[MongoDB]')
    };
};
exports.COLOR = () => {
    return {
        express: chalk_1.default.bgHex('#333333').whiteBright.bold,
        mongoDB: chalk_1.default.bgHex('#412F20').hex('#589636').bold,
        success: chalk_1.default.greenBright,
        danger: chalk_1.default.redBright.bold,
        warning: chalk_1.default.yellowBright,
        info: chalk_1.default.white.bold
    };
};
