"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InicioSesionInteractor = void 0;
class InicioSesionInteractor {
    constructor(autenticacionRepository) {
        this.autenticacionRepository = autenticacionRepository;
    }
    execute(payload) {
        return this.autenticacionRepository.inicioSesion(payload);
    }
}
exports.InicioSesionInteractor = InicioSesionInteractor;
