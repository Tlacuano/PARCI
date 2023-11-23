import { ResponseApi } from "../../../kernel/types";
import { InicioSesionInteractor } from "../use-cases/inicio-sesion.interactor";
import { AutenticacionRepository } from "../use-cases/ports/autenticacion.repository";
import { AutenticacionStorageGateway } from "./autenticacion.storage.gateway";
import { inicioSesionDto } from "./dtos/inicio-sesion.dto";



export class AutenticacionController {
    private obtenerError(error: any) {
        return {
            status: error.status,
            error: true,
            message: error.message
        } as ResponseApi<any>
    }

    inisioSesion = async (payload:inicioSesionDto) => {
        try {
            const repositorio: AutenticacionRepository = new AutenticacionStorageGateway();
            const inisioSesionInteractor = new InicioSesionInteractor(repositorio);
            const respuesta = await inisioSesionInteractor.execute(payload);

            return respuesta;
        } catch (error) {
            return this.obtenerError(error);
        }
    }

}