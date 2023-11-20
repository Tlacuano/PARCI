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
import { RequestVotarOpinionDto } from "./dto/request-votar-opinion.dto";
import { AumentarVotoPositivoInteractor } from "../use-cases/aumentar-voto-positivo.interactor";
import { AumentarVotoNegativoInteractor } from "../use-cases/aumentar-voto-negativo.interactor";

const opinionRouter = Router();

export class OpinonController {
    consultarOpinionesByReporteId = async (req: Request, res: Response) => {
        try {
            const payload = req.body as RequestConsultarReportesDto;

            const repositorio: OpinionesRepository = new OpinionStorageGateway;
            const consultarOpinionesByReporteIdInteractor = new ConsultarOpinionesByReporteIdInteractor(repositorio);

            const resultado = await consultarOpinionesByReporteIdInteractor.execute(payload.fk_idReporte);

            const body: ResponseApi<Opinion[]> = {
                data: resultado,
                message: 'Opiniones consultadas correctamente',
                status: 200,
                error: false
            }

            res.status(body.status).json(body);
        } catch (error) {
            const errorBody = validarError(error as Error);
            res.status(errorBody.status).json(errorBody);
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

            const body: ResponseApi<boolean> = {
                data: resultado,
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

            const body: ResponseApi<boolean> = {
                data: resultado,
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
            const payload = req.body as RequestVotarOpinionDto;

            const repositorio: OpinionesRepository = new OpinionStorageGateway;

            switch (payload.voto) {
                case 'positivo':
                    let aumentarVotoPositivoInteractor = new AumentarVotoPositivoInteractor(repositorio);
                    await aumentarVotoPositivoInteractor.execute(payload.id_opinion);
                    break;
                case 'negativo':
                    let aumentarVotoNegativoInteractor = new AumentarVotoNegativoInteractor(repositorio);
                    await aumentarVotoNegativoInteractor.execute(payload.id_opinion);

                    break;
                default:
                    throw new Error('El voto debe ser positivo o negativo');
            }

            const body: ResponseApi<boolean> = {
                data: true,
                message: 'Voto registrado correctamente',
                status: 200,
                error: false
            }

            res.status(body.status).json(body);
        } catch (error) {
            const errorBody = validarError(error as Error);
            res.status(errorBody.status).json(errorBody);
        }
    }


}

const opinionController = new OpinonController();

opinionRouter.post('/consultar-opiniones', opinionController.consultarOpinionesByReporteId);
opinionRouter.post('/registrar-opinion', opinionController.registrarOpinion);
opinionRouter.post('/eliminar-opinion', opinionController.eliminarOpinon);
opinionRouter.post('/modificar-opinion', opinionController.modificarOpinion);

export default opinionRouter;