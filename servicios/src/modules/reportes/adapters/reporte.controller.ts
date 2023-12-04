import { ConsultarInformacionOpinionesInteractor } from './../../usuarios/use-cases/consultar-informacion-opiniones.interactor';
import * as fs from 'fs';
import * as path from 'path';
import { OpinionBoundary } from './../../opiniones/adapters/opinion.boundary';
import { Request, Response, Router } from "express";
import { ReporteRepository } from "../use-cases/ports/reporte.repository";
import { ReporteStorageGateway } from "./reporte.storage.gateway";
import { ResponseApi } from "../../../kernel/types";
import { Reporte } from "../entities/reporte";
import { validarError } from "../../../kernel/error-handler";
import { GetReporteInteractor} from "../use-cases/get-reporte.interactor";
import { insertReporteDTO } from "./dtos/registrar-reporte.dto";
import { ModificarReporteInteractor } from "../use-cases/modify-reporte.interactor";
import { modifyReporteDTO } from "./dtos/modify-reporte.dto";
import { InsertReporteInteractor} from './../use-cases/insert-reporte.interactor';
import { EliminarReporteInteractor } from "../use-cases/delete-reporte.interactor";
import { votarReporteDTO } from "./dtos/votar-reporte.dto";
import { VotarReporteInteractor } from './../use-cases/votar-reporte.interactor';
import { ModificarEstadoReporteInteractor } from "../use-cases/modificar-estado-reporte.interactor";
import { modificarEstadoReporteDTO } from "./dtos/modificar-estado-reporte.dto";
import { ObtenerReporteDTO } from "./dtos/obtener-reporte.dto";
import { ObtenerReportesEnEsperaInteractor } from "../use-cases/obtener-reportes-en-espera.interactor";
import { ObtenerReportesDTO } from "./dtos/reponse-get-reporte";
import { RequestConsultarReporteUsuarioDTO } from "./dtos/request-consultar-reporte-usuario.dto";
import { ConsultarReporteUsuarioInteractor } from "../use-cases/consultarReporteUsuario.interactor";
import { RequestConsultarReportesDto } from '../../../modules/opiniones/adapters/dto/request-consultar-reportes.dto';
import { ResponseConsultarReporteUsuarioDTO } from './dtos/response-consultar-reporte-usuario.dto';
import { ConsultarVotoPorUsuarioInteractor } from '../use-cases/consultar-voto-por-usuario.interactor';
import { ModificarVotoPorUsuario } from '../use-cases/modificar-voto-por-usuario.interactor';


const reporteRouter = Router();

export class ReporteController {

    consultarReporteUsuario = async (req: Request, res: Response) => {
        try {
            const payload = req.body as RequestConsultarReporteUsuarioDTO;

            const repository: ReporteRepository = new ReporteStorageGateway();
            const consultarReporteUsuarioInteractor = new ConsultarReporteUsuarioInteractor(repository);

            const resultado = await consultarReporteUsuarioInteractor.execute(payload);

            //conseguir la imagen del reporte por su ruta del directorio C:/PARCI
            const rutaImagen = resultado.imagen;
            const imagenBuffer = fs.readFileSync(rutaImagen);
            const imagenBase64 = Buffer.from(imagenBuffer).toString('base64');
            resultado.imagen = `data:image/png;base64,${imagenBase64}`;

            //ahora consultamos las opiniones con el id del reporte
            const opinionesDelReporte = await OpinionBoundary.consultarReporteUsuario({ usuario:payload.usuario, fk_idReporte: payload.id_reporte } as RequestConsultarReportesDto);
            
            resultado.opiniones = opinionesDelReporte;

            const body: ResponseApi<ResponseConsultarReporteUsuarioDTO> = {
                data: resultado,
                message: 'El reporte ha sido encontrado satisfactoriamente',
                error: false,
                status: 200,
            };            

            res.status(body.status).json(body);
        } catch (error) {
            console.log(error);
            
            const errorBody = validarError(error as Error);
            res.status(errorBody.status).json(errorBody);
        }
    }


    getReporte = async (_req: Request, res: Response) => {
        try {
            const payload = _req.body as ObtenerReporteDTO;
            
            const repositorio: ReporteRepository = new ReporteStorageGateway();
            const getReporteInteractor = new GetReporteInteractor(repositorio);

            const reportes = await getReporteInteractor.execute(payload);
            
            for(let i = 0; i < reportes.length; i++){
                //conseguir la imagen de cada reporte por su ruta del directorio C:/PARCI
                const rutaImagen = reportes[i].imagen;
                const imagenBuffer = fs.readFileSync(rutaImagen);
                const imagenBase64 = Buffer.from(imagenBuffer).toString('base64');
                reportes[i].imagen = `data:image/png;base64,${imagenBase64}`;
            }
            

            const body: ResponseApi<ObtenerReportesDTO[]> = {
                data: reportes,
                message: 'Los reportes han sido encontradas esplendidamente',
                error: false,
                status: 200,
            }

            res.status(body.status).json(body);
        } catch (error) {
            console.log(error);
            
            const errorBody = validarError(error as Error);
            res.status(errorBody.status).json(errorBody);
        }
    }

    obtenerReportesEnEspera = async (_req: Request, res: Response) => {
        try {
            const repository:ReporteRepository = new ReporteStorageGateway();
            const interactor = new ObtenerReportesEnEsperaInteractor(repository);
            const result = await interactor.execute(null);

            const body: ResponseApi<Reporte[]> = {
                data: result,
                message: 'Los reportes en espera han sido encontrados',
                error: false,
                status: 200,
            };
            
            res.status(body.status).json(body);
        } catch (error) {
            const errorBody = validarError(error as Error);
            res.status(errorBody.status).json(errorBody);
        }
    }

    registrarReporte = async (_req: Request, res: Response) => {
        try {
            const payload = _req.body as insertReporteDTO;            

            //sacar los datos base64 de la imagen
            const datosBase64 = payload.imagen.split(';base64,').pop() as string;
            //sacar el tipo de imagen
            const tipoImagen = payload.imagen.substring(11, payload.imagen.indexOf(';'));
            //convertir los datos base64 a un buffer
            const imagenBuffer = Buffer.from(datosBase64, 'base64');
            
            // Generar un nombre único para el archivo (puedes usar algo como un timestamp)
            const nombreArchivo = `imagen_${payload.usuario}_${new Date().toLocaleDateString().replace(/[/:]/g, '-')}.${tipoImagen}`;

            // Ruta donde se guardará la imagen
            const rutaDirectorio = 'C:/PARCI';
            const rutaImagen = path.join(rutaDirectorio, nombreArchivo);
            // Verificar que el directorio existe, si no, crearlo
            if (fs.existsSync(rutaDirectorio)) {               
                fs.writeFileSync(rutaImagen, imagenBuffer, 'binary');
            }
            //guardar la ruta de la imagen en la base de datos
            payload.imagen = rutaImagen.replace(/\\/g, '/');
            //convertir la fecha a un formato valido para mysql
            const splitFecha = payload.fecha.split('/');
            payload.fecha = `${splitFecha[2]}-${splitFecha[1]}-${splitFecha[0]}`;
            
            
            
            const repository: ReporteRepository = new ReporteStorageGateway();
            const interactor = new InsertReporteInteractor(repository);
            
            const result = await interactor.execute(payload);

            //const result =2 as any;
            const body: ResponseApi<boolean> = {
                data: result,
                message: 'El reporte ha sido registrado correctamente',
                error: false,
                status: 200,
            };

            res.status(body.status).json(body);

        } catch (error) {
            console.log(error);
            
            const errorBody = validarError(error as Error);
            res.status(errorBody.status).json(errorBody);
        }
    }

    modificarReporte = async (req: Request, res: Response) => {
        try {
            const payload = req.body as modifyReporteDTO;

            const repository: ReporteRepository = new ReporteStorageGateway();
            const modificarReporteInteractor = new ModificarReporteInteractor(repository);

            await modificarReporteInteractor.execute(payload);

            const body: ResponseApi<boolean> = {
                data: true,
                message: "Reporte modificado correctamente",
                status: 200,
                error: false,
            };

            res.status(body.status).json(body);
        } catch (error) {
            const errorBody = validarError(error as Error);
            res.status(errorBody.status).json(errorBody);
        }
    }

    eliminarReporte = async (req: Request, res: Response) => {
        try {
            const { id_reporte } = req.body;
            const repository: ReporteRepository = new ReporteStorageGateway();
            const eliminarReporteInteractor = new EliminarReporteInteractor(repository);
    
            await eliminarReporteInteractor.execute(id_reporte);
            
            const body: ResponseApi<boolean> = {
                data: true,
                message: "Reporte eliminado correctamente",
                status: 200,
                error: false,
            };
    
            res.status(body.status).json(body);
        } catch (error) {
            const errorBody = validarError(error as Error);
            res.status(errorBody.status).json(errorBody);
        }
    };

    votarReporte = async (_req: Request, _res: Response) => {
        try{
            const payload = _req.body as votarReporteDTO;

            const repository:ReporteRepository = new ReporteStorageGateway();
            
            const consultarVotoPorUsuarioInteractor = new ConsultarVotoPorUsuarioInteractor(repository);
            const resultado = await consultarVotoPorUsuarioInteractor.execute(payload);

            if(resultado === undefined){
                //registrar voto
                const interactor = new VotarReporteInteractor(repository);
                const respuestaRegistroVoto = await interactor.execute(payload);
            }else{
                //modificar voto
                const interactor = new ModificarVotoPorUsuario(repository);
                const respuestaModificacionVoto = await interactor.execute(payload);
            }

            const body: ResponseApi<boolean> = {
                data: true,
                message: 'Se a votado satisfactoriamente en el reporte',
                error: false,
                status: 200, 
            };

            _res.status(body.status).json(body);
        
        } catch (error){
            const errorBody = validarError(error as Error);
            _res.status(errorBody.status).json(errorBody);
        }
    }

    //moderador
    modificarEstadoReporte = async (_req: Request, _res: Response) => {
        try{
            const payload = _req.body as modificarEstadoReporteDTO;

            const repository:ReporteRepository = new ReporteStorageGateway();
            const interactor = new ModificarEstadoReporteInteractor(repository);

            await interactor.execute(payload);

            const body: ResponseApi<boolean> = {
                data: true,
                message: 'Se a modificado el estado del reporte',
                error: false,
                status: 200, 
            };

            _res.status(body.status).json(body);
        
        } catch (error){
            const errorBody = validarError(error as Error);
            _res.status(errorBody.status).json(errorBody);
        }
    }

}

const reporteController = new ReporteController();

reporteRouter.post('/consultar-usuario', reporteController.consultarReporteUsuario);
reporteRouter.post('/consultar', reporteController.getReporte);
reporteRouter.get('/consultar-en-espera', reporteController.obtenerReportesEnEspera);
reporteRouter.put('/modificar', reporteController.modificarReporte);
reporteRouter.post('/registrar', reporteController.registrarReporte);
reporteRouter.delete('/eliminar', reporteController.eliminarReporte);
reporteRouter.post('/votar', reporteController.votarReporte);
reporteRouter.put('/modificar-estado', reporteController.modificarEstadoReporte);

export default reporteRouter;
