"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.set('port', process.env.PORT || 3000);
app.use((0, cors_1.default)({ origin: '*' }));
app.use(express_1.default.json());
app.get('/', (_req, res) => {
    res.send('servicios corriendo UwU');
});
exports.default = app;
