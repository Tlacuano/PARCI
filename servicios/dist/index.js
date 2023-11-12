"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("./config/express"));
const main = () => {
    try {
        express_1.default.listen(express_1.default.get('port'), () => {
            console.log(`Server is running in http://localhost:${express_1.default.get('port')}`);
        });
    }
    catch (error) {
        console.log(error);
    }
};
main();
