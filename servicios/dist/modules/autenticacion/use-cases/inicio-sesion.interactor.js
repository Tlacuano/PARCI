"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InicioSesionInteractor = void 0;
class InicioSesionInteractor {
    constructor(autenticacionRepository) {
        this.autenticacionRepository = autenticacionRepository;
    }
    execute(payload) {
        if (!payload.usuario || payload.usuario === '') {
            throw new Error('El usuario es requerido');
        }
        if (!payload.contraseña || payload.contraseña === '') {
            throw new Error('La contraseña es requerida');
        }
        return this.autenticacionRepository.inicioSesion(payload);
    }
}
exports.InicioSesionInteractor = InicioSesionInteractor;
