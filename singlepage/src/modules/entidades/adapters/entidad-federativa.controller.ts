import { ResponseApi } from "@/kernel/types";
import { EntidadFederativaRepository } from "../use-cases/ports/entidad-federativa.repository";
import { EntidadFederativaStorageGateway } from "./entidad-federativa.storage.gateway";
import { ObtenerEntidadesFederativasInteractor } from "../use-cases/obtener-entidades.interactor";
import { RegistrarEntidadDTO } from "./dtos/registrar-entidad.dto";
import { RegistrarEntidadFederativaInteractor } from "../use-cases/registrar-entidad.interactor";

export class EntidadFederativaController {
  private obtenerError(error: any) {
    return {
      status: error.status,
      error: true,
      message: error.message,
    } as ResponseApi<any>;
  }

  registrarEntidadFederativa = async (payload: RegistrarEntidadDTO) => {
    try {
      const repositorio: EntidadFederativaRepository = new EntidadFederativaStorageGateway();
      const registrarEntidadFederativaInteractor = new RegistrarEntidadFederativaInteractor(repositorio);
      console.log("payload", payload);

      const respuesta = await registrarEntidadFederativaInteractor.execute(payload);

      return respuesta;
    } catch (error) {
      return this.obtenerError(error);
    }
  };

  obtenerEntidadesFederativas = async () => {
    try {
      const repositorio: EntidadFederativaRepository = new EntidadFederativaStorageGateway();
      const obtenerEntidadesFederativasInteractor = new ObtenerEntidadesFederativasInteractor(repositorio);

      const respuesta = await obtenerEntidadesFederativasInteractor.execute();

      return respuesta;
    } catch (error) {
      return this.obtenerError(error);
    }
  };
}
