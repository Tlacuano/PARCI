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
exports.AutenticacionController = void 0;
const registrar_codigo_rc_interactor_1 = require("./../use-cases/registrar-codigo-rc.interactor");
const buscar_usuario_para_registrar_codigo_rp_1 = require("./../use-cases/buscar-usuario-para-registrar-codigo-rp");
const inicio_sesion_interactor_1 = require("./../use-cases/inicio-sesion.interactor");
const express_1 = require("express");
const autenticacion_storage_gateway_1 = require("./autenticacion.storage.gateway");
const error_handler_1 = require("../../../kernel/error-handler");
const codigo_aleatorio_1 = require("../utils/codigo-aleatorio");
const jwt_1 = require("../../../kernel/jwt");
const nodemailer_1 = require("../../../kernel/nodemailer");
const autenticacionRouter = (0, express_1.Router)();
class AutenticacionController {
    constructor() {
        this.inicioSesion = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const payload = req.body;
                const repositorio = new autenticacion_storage_gateway_1.AutenticacionStorageGateway;
                const inicioSesionInteractor = new inicio_sesion_interactor_1.InicioSesionInteractor(repositorio);
                const autenticado = yield inicioSesionInteractor.execute(payload);
                const token = (0, jwt_1.generarToken)(autenticado);
                autenticado.token = token;
                const body = {
                    data: autenticado,
                    message: 'Inicio de sesión exitoso',
                    status: 200,
                    error: false
                };
                res.status(body.status).json(body);
            }
            catch (error) {
                console.log(error);
                const errorBody = (0, error_handler_1.validarError)(error);
                res.status(errorBody.status).json(errorBody);
            }
        });
        //RECUPERACION DE CONTRASEÑA = RC
        this.registrarCodigoRC = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const payload = req.body;
                //buscar usuario
                const repositorio = new autenticacion_storage_gateway_1.AutenticacionStorageGateway;
                const buscarUsuarioInteractor = new buscar_usuario_para_registrar_codigo_rp_1.BuscarUsuarioInteractor(repositorio);
                //generar codigo
                const usuario = yield buscarUsuarioInteractor.execute(payload);
                usuario.codigo = (0, codigo_aleatorio_1.codigoRandom)();
                //guardar codigo en la bd
                const registrarCodigoInteractor = new registrar_codigo_rc_interactor_1.RegistrarCodigoInteractor(repositorio);
                const resultado = yield registrarCodigoInteractor.execute(usuario);
                yield (0, nodemailer_1.sendEmail)(usuario.correo_electronico, 'Recuperación de contraseña', 'Recuperación de contraseña', 'Su código de recuperación es:', usuario.codigo);
                const body = {
                    data: resultado,
                    message: 'Código enviado',
                    status: 200,
                    error: false
                };
                res.status(body.status).json(body);
            }
            catch (error) {
                const errorBody = (0, error_handler_1.validarError)(error);
                res.status(errorBody.status).json(errorBody);
            }
        });
    }
}
exports.AutenticacionController = AutenticacionController;
const autenticacionController = new AutenticacionController();
autenticacionRouter.post('/inicio-sesion', autenticacionController.inicioSesion);
autenticacionRouter.post('/registrar-codigo', autenticacionController.registrarCodigoRC);
exports.default = autenticacionRouter;
