import { ResponseApi } from "./types";

const errores: { [x: string]: ResponseApi<undefined> } = {
    'Usuario o contraseña incorrectos': { status: 400, error: true, message: 'Usuario o contraseña incorrectos' },
    'Código incorrecto': { status: 400, error: true, message: 'Código incorrecto' },
    'No autorizado': { status: 401, error: true, message: 'No autorizado' },
    'Usuario no encontrado': { status: 404, error: true, message: 'Usuario no encontrado' },
    'Server Error': { status: 500, error: true, message: 'Server Error' },
    'Campos requeridos incompletos': { status: 400, error: true, message: 'Campos requeridos incompletos' },
    'Estado inválido': { status: 400, error: true, message: 'Estado inválido' },
    'No se pudo modificar la personalizacion': { status: 400, error: true, message: 'No se pudo modificar la personalizacion' },
};


export const validarError = (error: Error): ResponseApi<undefined> => {
    return errores[error.message] || errores['Server Error'];
}


