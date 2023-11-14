"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecuperarContraseñaInteractor = void 0;
class RecuperarContraseñaInteractor {
    constructor(autenticacionRepository) {
        this.autenticacionRepository = autenticacionRepository;
    }
    execute(payload) {
        return this.autenticacionRepository.recuperarContraseña(payload);
    }
}
exports.RecuperarContraseñaInteractor = RecuperarContraseñaInteractor;
