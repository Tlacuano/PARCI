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
exports.AutenticacionStorageGateway = void 0;
const dbconfig_1 = require("../../../utils/dbconfig");
const bcrypt_1 = require("../utils/bcrypt");
class AutenticacionStorageGateway {
    inicioSesion(parametros) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resultado = yield (0, dbconfig_1.ConexionBD)('select usuario, contraseña as salt, rol, nombre_municipio as municipio from usuarios join personas on fk_idPersona = id_persona join municipios on fk_idMunicipio = id_municipio where usuario = ?', [parametros.usuario]);
                if (resultado.length === 0) {
                    throw new Error('Usuario o contraseña incorrectos');
                }
                const usuario = resultado[0];
                if (!(yield (0, bcrypt_1.compararEncriptado)(parametros.contraseña, usuario.salt))) {
                    throw new Error('Usuario o contraseña incorrectos');
                }
                usuario.salt = undefined;
                return resultado[0];
            }
            catch (error) {
                throw error;
            }
        });
    }
    buscarUsuario(parametros) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resultado = yield (0, dbconfig_1.ConexionBD)('select id_usuario, usuario, correo_electronico from usuarios join personas on fk_idPersona = id_persona where usuario = ?', [parametros.usuario]);
                if (resultado.length === 0) {
                    throw new Error('Usuario no encontrado');
                }
                return resultado[0];
            }
            catch (error) {
                throw error;
            }
        });
    }
    registrarCodigo(parametros) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resultado = yield (0, dbconfig_1.ConexionBD)('update usuarios set codigo = ? where id_usuario = ?', [parametros.codigo, parametros.id_usuario]);
                return true;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.AutenticacionStorageGateway = AutenticacionStorageGateway;
