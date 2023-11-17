"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuscarUsuarioInteractor = void 0;
class BuscarUsuarioInteractor {
    constructor(autenticacionRepository) {
        this.autenticacionRepository = autenticacionRepository;
    }
    execute(payload) {
        if (!payload.usuario || payload.usuario === '') {
            throw new Error('El usuario es requerido');
        }
        return this.autenticacionRepository.buscarUsuario(payload);
    }
}
exports.BuscarUsuarioInteractor = BuscarUsuarioInteractor;
