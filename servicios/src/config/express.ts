import express, {Request, Response} from "express";
import cors from "cors";

import autenticacionRouter from "../modules/autenticacion/adapters/autenticacion.controller";
import entidadesFederativasRouter from "../modules/entidades/adapters/entidad-federativa.controller";

const app = express();



app.set('port', process.env.PORT || 3000);
app.use(cors({origin: '*'}));
app.use(express.json());

app.get('/', (_req:Request, res:Response)=>{
    res.send('servicios corriendo UwU')
});

app.use('/parci-api', autenticacionRouter);
app.use('/parci-api', entidadesFederativasRouter);

export default app;