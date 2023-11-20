import express, {Request, Response} from "express";
import cors from "cors";

import autenticacionRouter from "../modules/autenticacion/adapters/autenticacion.controller";
import entidadesFederativasRouter from "../modules/entidades/adapters/entidad-federativa.controller";
import reporteRouter from "../modules/reportes/adapters/reporte.controller";

const app = express();



app.set('port', process.env.PORT || 3000);
app.use(cors({origin: '*'}));
app.use(express.json());

app.get('/', (_req:Request, res:Response)=>{
    res.send('servicios corriendo UwU')
});

app.use('/parci-api/autenticacion', autenticacionRouter);
app.use('/parci-api', entidadesFederativasRouter);
app.use('/parci-api/reportes', reporteRouter);

export default app;