"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarError = void 0;
const errores = {
    //generales
    'Estado inválido': { status: 400, error: true, message: 'Estado inválido' },
    'Campos requeridos incompletos': { status: 400, error: true, message: 'Campos requeridos incompletos' },
    'Server Error': { status: 500, error: true, message: 'Server Error' },
    //autenticacion
    'Usuario o contraseña incorrectos': { status: 400, error: true, message: 'Usuario o contraseña incorrectos' },
    'Código incorrecto': { status: 400, error: true, message: 'Código incorrecto' },
    'No autorizado': { status: 401, error: true, message: 'No autorizado' },
    //usuarios
    'El usuario es requerido': { status: 400, error: true, message: 'El usuario es requerido' },
    'Usuario no encontrado': { status: 404, error: true, message: 'Usuario no encontrado' },
    //personalizacion
    'No se pudo modificar la personalizacion': { status: 400, error: true, message: 'No se pudo modificar la personalizacion' },
    'El tema es requerido': { status: 400, error: true, message: 'El tema es requerido' },
    'El tamaño de letra es requerido': { status: 400, error: true, message: 'El tamaño de letra es requerido' },
};
const validarError = (error) => {
    return errores[error.message] || errores['Server Error'];
};
exports.validarError = validarError;
