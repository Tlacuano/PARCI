import { ResponseApi } from "../../../kernel/types";
import { EliminarOpinionInteractor } from "../use-cases/eliminar-opinion.interactor";
import { OpinionRepository } from "../use-cases/ports/opinon.repository";
import { RegistrarOpinionInteractor } from "../use-cases/registrar-opinion.interactor";
import { VotarOpinionInteractor } from "../use-cases/votar-opinion.interactor";
import { RequestEliminarOpinionDto } from "./dto/request-eliminar-opinion.dto";
import { RequestRegistrarOpinionDto } from "./dto/request-registrar-opinion.dto";
import { VotarOpinionDto } from "./dto/request-votar-opinion.dto";
import { OpinionStorageGateway } from "./opinion.storage.gateway";




export class OpinionController {
    private obtenerError(error: any) {
        return {
            status: error.status,
            error: true,
            message: error.message
        } as ResponseApi<any>
    }

    static registrarOpinion = async (payload: RequestRegistrarOpinionDto) => {
        try {
            const repositorio: OpinionRepository = new OpinionStorageGateway();
            const registrarOpinionInteractor = new RegistrarOpinionInteractor(repositorio);

            const respuesta = await registrarOpinionInteractor.execute(payload);
            return respuesta;
        } catch (error) {
            throw error;
        }
    }

    static votarOpinion = async (payload: VotarOpinionDto) => {
        try {
            const repositorio: OpinionRepository = new OpinionStorageGateway();
            const votarOpinionInteractor = new VotarOpinionInteractor(repositorio);

            const respuesta = await votarOpinionInteractor.execute(payload);
            return respuesta;
        } catch (error) {
            throw error;
        }
    }

    static eliminarOpinion = async (payload: RequestEliminarOpinionDto) => {
        try {
            const repositorio: OpinionRepository = new OpinionStorageGateway();
            const eliminarOpinionInteractor = new EliminarOpinionInteractor(repositorio);

            const respuesta = await eliminarOpinionInteractor.execute(payload);
            return respuesta;
        } catch (error) {
            throw error;
        }
    }

}