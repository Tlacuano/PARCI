import { Request, Response, Router } from "express";
import { RequestConsultarReportesDto } from "./dto/request-consultar-reportes.dto";
import { OpinionStorageGateway } from "./opinion.storage.gateway";
import { ConsultarOpinionesByReporteIdInteractor } from "../use-cases/consultar-opiniones-by-reporte-id.interactor";
import { ResponseApi } from "../../../kernel/types";
import { Opinion } from "../entities/opinion";
import { validarError } from "../../../kernel/error-handler";
import { RegistrarOpinonInteractor } from "../use-cases/registrar-opinion.interactor";
import { RequestRegistrarOpinionDto } from "./dto/request-registrar-opinion.dto";
import { OpinionesRepository } from "../use-cases/ports/opiniones.Repository";
import { usuariosBoundary } from "../../../modules/usuarios/adapters/usuario.boundary";
import { InformacionOpinionesDto } from "../../../modules/usuarios/adapters/dtos/informacion-opiniones.dto";
import { ModificarInformacionOpinionesDTO } from "../../../modules/usuarios/adapters/dtos/modificar-informacion-opiniones.dto";
import { RequestEliminarOpinionDto } from "./dto/request-eliminar-opinion.dto";
import { EliminarOpinionInteractor } from "../use-cases/eliminar-opinion.interactor";
import { RequestModificarOpinionDto } from "./dto/request-modificar-opinion.dto";
import { ModificarOpinionInteractor } from "../use-cases/modificar-opinion.interactor";
import { ConsultarVotoPorUsuarioOpinionInteractor } from "../use-cases/consultar-voto-opinion.interactor";
import { VotarOpinionDto } from "./dto/request-votar-opinion.dto";
import { ModificarVotoOpinionInteractor } from "../use-cases/modificar-voto-opinion.interactor";
import { RegistrarVotoOpinionInteractor } from "../use-cases/registrar-voto-opinion.interactor";
import { EliminarVotoOpinionInteractor } from "../use-cases/eliminar-voto-opinon.interactor";


const opinionRouter = Router();

export class OpinonController {

    static consultarOpinionesByReporteId = async (payload: RequestConsultarReportesDto) => {
        try {
            const repositorio: OpinionesRepository = new OpinionStorageGateway;
            const consultarOpinionesByReporteIdInteractor = new ConsultarOpinionesByReporteIdInteractor(repositorio);

            const resultado = await consultarOpinionesByReporteIdInteractor.execute(payload);

            return resultado;

        } catch (error) {
            throw error;
        }
    }

    registrarOpinion = async (req: Request, res: Response) => {
        try {
            const payload = req.body as RequestRegistrarOpinionDto;
            
            const usuario = await usuariosBoundary.getInfoOpiniones_Local(payload.usuario) as InformacionOpinionesDto;
            
            if (usuario.fecha_opinion) { 
                const fechaUsuario = new Date(usuario.fecha_opinion);
                const fechaHoy = new Date();

                if(
                    fechaUsuario.getDate() === (fechaHoy.getDate()) &&
                    fechaUsuario.getMonth() === fechaHoy.getMonth() &&
                    fechaUsuario.getFullYear() === fechaHoy.getFullYear()
                ){
                    if(usuario.contador_opinion === 3){
                        throw new Error('Ya no puedes dar mas opiniones por el dia de hoy');
                    }
                }else{
                    //reiniciar el contador de opiniones
                    await usuariosBoundary.reiniciarContadorOpiniones_Local(payload.usuario);
                }
            }

            const repositorio: OpinionesRepository = new OpinionStorageGateway;
            const registrarOpinionInteractor = new RegistrarOpinonInteractor(repositorio);

            const resultado = await registrarOpinionInteractor.execute(payload);

            //una ves registrada la opinion, se debe actualizar la informacion de opiniones del usuario
            const modificarInformacionOpiniones = {
                usuario: payload.usuario,
                fecha_opinion: new Date(),
            } as ModificarInformacionOpinionesDTO;            

            await usuariosBoundary.actualizarInfoOpiniones_Local(modificarInformacionOpiniones);

            const opiniones = await OpinonController.consultarOpinionesByReporteId({fk_idReporte: payload.fk_idReporte, usuario: payload.usuario} as RequestConsultarReportesDto)
            
            const body: ResponseApi<Opinion[]> = {
                data: opiniones,
                message: 'Opinion registrada correctamente',
                status: 200,
                error: false
            }

            res.status(body.status).json(body);
        } catch (error) {
            
            const errorBody = validarError(error as Error);
            res.status(errorBody.status).json(errorBody);
        }
    }

    eliminarOpinon = async (req: Request, res: Response) => {
        try {
            const payload = req.body as RequestEliminarOpinionDto;

            const repositorio: OpinionesRepository = new OpinionStorageGateway;
            const eliminarOpinionInteractor = new EliminarOpinionInteractor(repositorio);

            const resultado = await eliminarOpinionInteractor.execute(payload);

            //se debe obtener las opiniones actualizadas
           const opiniones = await OpinonController.consultarOpinionesByReporteId({fk_idReporte: payload.fk_idReporte, usuario: payload.usuario} as RequestConsultarReportesDto)

            const body: ResponseApi<Opinion[]> = {
                data: opiniones,
                message: 'Opinion eliminada correctamente',
                status: 200,
                error: false
            }

            res.status(body.status).json(body);
        } catch (error) {
            const errorBody = validarError(error as Error);
            res.status(errorBody.status).json(errorBody);
        }
    }

    modificarOpinion = async (req: Request, res: Response) => {
        try {
            const payload = req.body as RequestModificarOpinionDto;

            const repositorio: OpinionesRepository = new OpinionStorageGateway;
            const modificarOpinionInteractor = new ModificarOpinionInteractor(repositorio);

            const resultado = await modificarOpinionInteractor.execute(payload);

            const body: ResponseApi<boolean> = {
                data: resultado,
                message: 'Opinion modificada correctamente',
                status: 200,
                error: false
            }

            res.status(body.status).json(body);
        } catch (error) {
            const errorBody = validarError(error as Error);
            res.status(errorBody.status).json(errorBody);
        }
    }


    votarOpinion = async (req: Request, res: Response) => {
        try {
            //consultar votos
            const payload = req.body as VotarOpinionDto;

            const repositorio: OpinionesRepository = new OpinionStorageGateway;

            const consultarVotoUsuarioOpinionInteractor = new ConsultarVotoPorUsuarioOpinionInteractor(repositorio);
            const resultado = await consultarVotoUsuarioOpinionInteractor.execute(payload);

            //si el usuario ya voto, actualizar el voto sino crearlo, si los votos son iguales, eliminar el voto
            if(resultado === undefined){
                const registrarVotoOpinionInteractor = new RegistrarVotoOpinionInteractor(repositorio);
                const resultado = await registrarVotoOpinionInteractor.execute(payload);
            }else if(resultado.voto_usuario === payload.voto){
                const eliminarVotoOpinionInteractor = new EliminarVotoOpinionInteractor(repositorio);
                const resultado = await eliminarVotoOpinionInteractor.execute(payload);
            }else{
                const modificarVotoOpinionInteractor = new ModificarVotoOpinionInteractor(repositorio);
                const resultado = await modificarVotoOpinionInteractor.execute(payload);
            }

            //retornar las opiniones
            const opiniones = await OpinonController.consultarOpinionesByReporteId({fk_idReporte: payload.fk_idReporte, usuario: payload.usuario} as RequestConsultarReportesDto)

            const body: ResponseApi<Opinion[]> = {
                data: opiniones,
                message: 'Voto registrado correctamente',
                status: 200,
                error: false
            }

            res.status(body.status).json(body);

        } catch (error) {
            console.log(error);
            
            const errorBody = validarError(error as Error);
            res.status(errorBody.status).json(errorBody);
        }
    }


}

const opinionController = new OpinonController();

opinionRouter.post('/registrar-opinion', opinionController.registrarOpinion);
opinionRouter.post('/eliminar-opinion', opinionController.eliminarOpinon);
opinionRouter.post('/modificar-opinion', opinionController.modificarOpinion);
opinionRouter.post('/votar-opinion', opinionController.votarOpinion);

export default opinionRouter;