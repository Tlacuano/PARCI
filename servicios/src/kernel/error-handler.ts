import { ResponseApi } from "./types";

const errores: { [x: string]: ResponseApi<undefined> } = {
    'Usuario o contraseña incorrectos': { status: 400, error: true, message: 'Usuario o contraseña incorrectos' },
    'No autorizado': { status: 401, error: true, message: 'No autorizado' },
    'Server Error': { status: 500, error: true, message: 'Server Error' },
};


export const validarError = (error: Error): ResponseApi<undefined> => {
    return errores[error.message] || errores['Server Error'];
}


