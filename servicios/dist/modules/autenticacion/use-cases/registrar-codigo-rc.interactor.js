"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegistrarCodigoInteractor = void 0;
class RegistrarCodigoInteractor {
    constructor(autenticacionRepository) {
        this.autenticacionRepository = autenticacionRepository;
    }
    execute(payload) {
        if (!payload.usuario || payload.usuario === '') {
            throw new Error('El usuario es requerido');
        }
        if (!payload.codigo || payload.codigo === '') {
            throw new Error('Error al generar el codigo');
        }
        return this.autenticacionRepository.registrarCodigo(payload);
    }
}
exports.RegistrarCodigoInteractor = RegistrarCodigoInteractor;
