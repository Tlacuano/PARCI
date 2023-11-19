"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerificarCodigoInteractor = void 0;
class VerificarCodigoInteractor {
    constructor(autenticacionRepository) {
        this.autenticacionRepository = autenticacionRepository;
    }
    execute(payload) {
        if (!payload.usuario || payload.usuario === '') {
            throw new Error('El usuario es requerido');
        }
        if (!payload.codigo || payload.codigo === '') {
            throw new Error('El codigo es requerido');
        }
        return this.autenticacionRepository.verificarCodigo(payload);
    }
}
exports.VerificarCodigoInteractor = VerificarCodigoInteractor;
