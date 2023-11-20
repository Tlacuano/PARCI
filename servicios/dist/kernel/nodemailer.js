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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendEmail = (correo_electronico, asunto, titulo, mensaje, mensajeResalado) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transporter = nodemailer_1.default.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.CORREO_APP,
                pass: process.env.CONTRASENA_APP
            },
            tls: {
                rejectUnauthorized: false
            },
            requireTLS: true
        });
        const mailOptions = {
            from: process.env.CORREO_APP,
            to: correo_electronico,
            subject: asunto,
            html: `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Código de Verificación</title>
                <style>
                /* Estilos generales */
                body {
                    font-family: Arial, sans-serif;
                    line-height: 1.5;
                    margin: 0;
                    padding: 0;
                }
            
                /* Contenedor principal */
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                }
            
                /* Encabezado */
                .header {
                    text-align: center;
                    margin-bottom: 20px;
                }
            
                .header h1 {
                    color: #333;  
                }
            
                /* Código de verificación */
                .verification-code {
                    background-color: #f2f2f2;
                    padding: 10px;
                    text-align: center;
                    margin-bottom: 20px;
                }
            
                .verification-code h2 {
                    color: #333;
                    font-size: 24px;
                    margin: 0;
                }
            
                .verification-code p {
                    color: #666;
                    font-size: 18px;
                    margin: 0;
                }
            
                /* Pie de página */
                .footer {
                    background-color: #f2f2f2;
                    padding: 10px;
                    text-align: center;
                }
            
                .footer p {
                    color: #666;
                    font-size: 14px;
                    margin: 0;
                }
                </style>
            </head>
            <body>
                <div class="container">
                <div class="header">
                    <h1>${titulo}</h1>
                </div>
            
                <div class="verification-code">
                    <p>${mensaje}</p>
                    <p><strong>${mensajeResalado}</strong></p>
                </div>
            
                <div class="footer">
                    <p>Este correo ha sido generado automáticamente. Por favor, no respondas a este correo.</p>
                </div>
                </div>
            </body>
            </html>`
        };
        yield transporter.sendMail(mailOptions);
    }
    catch (error) {
        throw new Error("Server Error");
    }
});
exports.sendEmail = sendEmail;
