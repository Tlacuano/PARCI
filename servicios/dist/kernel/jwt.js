"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Autenticador = exports.verificarToken = exports.generarToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generarToken = (parametros) => {
    return jsonwebtoken_1.default.sign(parametros, process.env.SECRET);
};
exports.generarToken = generarToken;
const verificarToken = (token) => {
    return jsonwebtoken_1.default.verify(token, process.env.SECRET);
};
exports.verificarToken = verificarToken;
const Autenticador = (rolRequerido, req, res, next) => {
    var _a;
    // Saca el token del header
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    // No autoriza si no hay token
    if (!token) {
        return res.status(401).json({
            message: 'No autorizado',
            error: true
        });
    }
    // Verifica el token
    try {
        const decoded = (0, exports.verificarToken)(token);
        const rolUsuario = decoded.rol;
        if (rolRequerido.includes(rolUsuario)) {
            next();
        }
        else {
            return res.status(401).json({
                message: 'No autorizado',
                error: true
            });
        }
    }
    catch (error) {
        return res.status(401).json({
            message: 'No autorizado',
            error: true
        });
    }
    return;
};
exports.Autenticador = Autenticador;
