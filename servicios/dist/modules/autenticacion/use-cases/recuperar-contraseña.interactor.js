"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecuperarContraseñaInteractor = void 0;
const validation_1 = require("../../../kernel/validation");
const bcrypt_1 = require("../utils/bcrypt");
class RecuperarContraseñaInteractor {
    constructor(autenticacionRepository) {
        this.autenticacionRepository = autenticacionRepository;
    }
    execute(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            if (payload.nueva_contraseña === '') {
                throw new Error('Campos requeridos incompletos');
            }
            if (payload.confirmar_contraseña === '') {
                throw new Error('Campos requeridos incompletos');
            }
            if (payload.nueva_contraseña !== payload.confirmar_contraseña) {
                throw new Error('Las contraseñas no coinciden');
            }
            if (payload.nueva_contraseña.length < 8) {
                throw new Error('La contraseña debe tener al menos 8 caracteres');
            }
            //al menos una letra mayuscula
            if (!(0, validation_1.validateRegex)(validation_1.regexValidationAlMenosUnaMayuscula, payload.nueva_contraseña)) {
                throw new Error('La contraseña debe tener al menos una letra mayúscula');
            }
            //al menos una letra minuscula
            if (!(0, validation_1.validateRegex)(validation_1.regexValidationUnaAlMenosMinuscula, payload.nueva_contraseña)) {
                throw new Error('La contraseña debe tener al menos una letra minúscula');
            }
            //al menos un numero
            if (!(0, validation_1.validateRegex)(validation_1.regexValidationUnAlMenosNumero, payload.nueva_contraseña)) {
                throw new Error('La contraseña debe tener al menos un número');
            }
            //sin espacion al inicio y al final
            if (!(0, validation_1.validateRegex)(validation_1.regexValidationNoEspaciosInicioFin, payload.nueva_contraseña)) {
                throw new Error('Ningún campo puede empezar o terminar con espacios');
            }
            payload.nueva_contraseña = yield (0, bcrypt_1.encriptar)(payload.nueva_contraseña);
            return this.autenticacionRepository.recuperarContraseña(payload);
        });
    }
}
exports.RecuperarContraseñaInteractor = RecuperarContraseñaInteractor;
