import { ResponseApi } from "../../../kernel/types";
import { OpinionRepository } from "../use-cases/ports/opinon.repository";
import { RegistrarOpinionInteractor } from "../use-cases/registrar-opinion.interactor";
import { RequestRegistrarOpinionDto } from "./dto/request-registrar-opinion.dto";
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

}