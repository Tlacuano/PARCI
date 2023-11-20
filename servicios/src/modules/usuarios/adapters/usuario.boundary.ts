import { UsuarioController } from '../adapters/usuario.controller';
export const usuariosBoundary = {
    registrarUsuario_Local: UsuarioController.registrarUsuario_Local,
    getInfoOpiniones_Local: UsuarioController.getInfoOpiniones_Local,
    actualizarInfoOpiniones_Local: UsuarioController.actualizarInfoOpiniones_Local
} 

