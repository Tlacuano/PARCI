import express, {Request, Response} from "express";
import cors from "cors";

import autenticacionRouter from "../modules/autenticacion/adapters/autenticacion.controller";
import entidadesFederativasRouter from "../modules/entidades/adapters/entidad-federativa.controller";
import municipiosRouter from "../modules/municipios/adapters/municipios-controller";
import personalizacionRouter from "../modules/personalizacion/adapters/personalizacion.controller";
import opinionRouter from "../modules/opiniones/adapters/opinion.controller";
import usuarioRouter from "../modules/usuarios/adapters/usuario.controller";

const app = express();



app.set('port', process.env.PORT || 3000);
app.use(cors({origin: '*'}));
app.use(express.json());

app.get('/', (_req:Request, res:Response)=>{
    res.send('servicios corriendo UwU')
});

app.use('/parci-api/autenticacion', autenticacionRouter);
app.use('/parci-api/entidades-federativas', entidadesFederativasRouter);
app.use('/parci-api/municipios', municipiosRouter);
app.use('/parci-api/personalizacion', personalizacionRouter);
app.use('/parci-api/opiniones', opinionRouter);
app.use('/parci-api/usuarios', usuarioRouter);

export default app;