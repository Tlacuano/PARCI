"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const autenticacion_controller_1 = __importDefault(require("../modules/autenticacion/adapters/autenticacion.controller"));
const entidad_federativa_controller_1 = __importDefault(require("../modules/entidades/adapters/entidad-federativa.controller"));
const municipios_controller_1 = __importDefault(require("../modules/municipios/adapters/municipio.controller"));
const personalizacion_controller_1 = __importDefault(require("../modules/personalizacion/adapters/personalizacion.controller"));
const app = (0, express_1.default)();
app.set('port', process.env.PORT || 3000);
app.use((0, cors_1.default)({ origin: '*' }));
app.use(express_1.default.json());
app.get('/', (_req, res) => {
    res.send('servicios corriendo UwU');
});
app.use('/parci-api/autenticacion', autenticacion_controller_1.default);
app.use('/parci-api/entidades-federativas', entidad_federativa_controller_1.default);
app.use('/parci-api/municipios', municipios_controller_1.default);
app.use('/parci-api/personalizacion', personalizacion_controller_1.default);
exports.default = app;
