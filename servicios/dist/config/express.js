"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const autenticacion_controller_1 = __importDefault(require("../modules/autenticacion/adapters/autenticacion.controller"));
const entidad_federativa_controller_1 = __importDefault(require("../modules/entidades/adapters/entidad-federativa.controller"));
const reporte_controller_1 = __importDefault(require("../modules/reportes/adapters/reporte.controller"));
const app = (0, express_1.default)();
app.set('port', process.env.PORT || 3000);
app.use((0, cors_1.default)({ origin: '*' }));
app.use(express_1.default.json());
app.get('/', (_req, res) => {
    res.send('servicios corriendo UwU');
});
app.use('/parci-api/autenticacion', autenticacion_controller_1.default);
app.use('/parci-api', entidad_federativa_controller_1.default);
app.use('/parci-api/reportes', reporte_controller_1.default);
exports.default = app;
