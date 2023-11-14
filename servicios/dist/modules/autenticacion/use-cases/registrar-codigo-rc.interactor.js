"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegistrarCodigoInteractor = void 0;
class RegistrarCodigoInteractor {
    constructor(autenticacionRepository) {
        this.autenticacionRepository = autenticacionRepository;
    }
    execute(payload) {
        return this.autenticacionRepository.registrarCodigo(payload);
    }
}
exports.RegistrarCodigoInteractor = RegistrarCodigoInteractor;
