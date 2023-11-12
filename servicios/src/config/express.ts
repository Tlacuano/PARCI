import express, {Request, Response} from "express";
import cors from "cors";


const app = express();



app.set('port', process.env.PORT || 3000);
app.use(cors({origin: '*'}));
app.use(express.json());

app.get('/', (_req:Request, res:Response)=>{
    res.send('servicios corriendo UwU')
});


export default app;