import { ResponseApi } from "./types";

const errores: { [x: string]: ResponseApi<undefined> } = {
    'Usuario o contraseña incorrectos': { status: 400, error: true, message: 'Usuario o contraseña incorrectos' },
    'Código incorrecto': { status: 400, error: true, message: 'Código incorrecto' },
    'No autorizado': { status: 401, error: true, message: 'No autorizado' },
    'Usuario no encontrado' : { status: 404, error: true, message: 'Usuario no encontrado' },
    'Server Error': { status: 500, error: true, message: 'Server Error' },
};


export const validarError = (error: Error): ResponseApi<undefined> => {
    return errores[error.message] || errores['Server Error'];
}


