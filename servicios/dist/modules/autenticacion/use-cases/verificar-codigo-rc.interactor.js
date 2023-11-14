"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerificarCodigoInteractor = void 0;
class VerificarCodigoInteractor {
    constructor(autenticacionRepository) {
        this.autenticacionRepository = autenticacionRepository;
    }
    execute(payload) {
        return this.autenticacionRepository.verificarCodigo(payload);
    }
}
exports.VerificarCodigoInteractor = VerificarCodigoInteractor;
