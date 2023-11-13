"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarError = void 0;
const errores = {
    'Usuario o contraseña incorrectos': { status: 400, error: true, message: 'Usuario o contraseña incorrectos' },
    'No autorizado': { status: 401, error: true, message: 'No autorizado' },
    'Usuario no encontrado': { status: 404, error: true, message: 'Usuario no encontrado' },
    'Server Error': { status: 500, error: true, message: 'Server Error' },
};
const validarError = (error) => {
    return errores[error.message] || errores['Server Error'];
};
exports.validarError = validarError;
