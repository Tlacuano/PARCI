import { ResponseApi } from "@/kernel/types";
import { EntidadFederativaRepository } from "../use-cases/ports/entidad-federativa.repository";
import { EntidadFederativaStorageGateway } from "./entidad-federativa.storage.gateway";
import { ObtenerEntidadesFederativasInteractor } from "../use-cases/obtener-entidades.interactor";
import { RegistrarEntidadDTO } from "./dtos/registrar-entidad.dto";
import { RegistrarEntidadFederativaInteractor } from "../use-cases/registrar-entidad.interactor";
import { CambiarEstadoEntidadDTO } from "./dtos/cambiar-estado-entidad.dto";
import { CambiarEstadoEntidadFederativaInteractor } from "../use-cases/cambiar-estado-entidad.interactor";
import { ModificarEntidadFederativaInteractor } from "../use-cases/modificar-entidad.interactor";
import { ModificarEntidadDTO } from "./dtos/modificar-entidad.dto";
import { ObtenerEntidadesFederativasActivasInteractor } from "../use-cases/obtener-entidades-activas.interactor";

export class EntidadFederativaController {
  private obtenerError(error: any) {
    return {
      status: error.status,
      error: true,
      message: error.message,
    } as ResponseApi<any>;
  }

  // CONSULTAR ENTIDADES FEDERATIVAS
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

  // CONSULTAR ENTIDADES FEDERATIVAS ACTIVAS
  static obtenerEntidadesFederativasActivas_local = async () => {
    try {
      const repositorio: EntidadFederativaRepository = new EntidadFederativaStorageGateway();
      const obtenerEntidadesFederativasActivasInteractor = new ObtenerEntidadesFederativasActivasInteractor(repositorio);

      const respuesta = await obtenerEntidadesFederativasActivasInteractor.execute();

      return respuesta;
    } catch (error: any) {
      return {
        status: error.status,
        error: true,
        message: error.message,
      } as ResponseApi<any>;
    }
  };

  // REGISTRAR ENTIDAD FEDERATIVA
  registrarEntidadFederativa = async (payload: RegistrarEntidadDTO) => {
    try {
      const repositorio: EntidadFederativaRepository = new EntidadFederativaStorageGateway();
      const registrarEntidadFederativaInteractor = new RegistrarEntidadFederativaInteractor(repositorio);

      const respuesta = await registrarEntidadFederativaInteractor.execute(payload);

      return respuesta;
    } catch (error) {
      return this.obtenerError(error);
    }
  };

  // MODIFICAR ENTIDAD FEDERATIVA
  modificarEntidadFederativa = async (payload: ModificarEntidadDTO) => {
    try {
      const repositorio: EntidadFederativaRepository = new EntidadFederativaStorageGateway();
      const modificarEntidadFederativaInteractor = new ModificarEntidadFederativaInteractor(repositorio);

      const respuesta = await modificarEntidadFederativaInteractor.execute(payload);

      return respuesta;
    } catch (error) {
      return this.obtenerError(error);
    }
  };

  // CAMBIAR ESTADO ENTIDAD FEDERATIVA
  cambiarEstadoEntidadFederativa = async (payload: CambiarEstadoEntidadDTO) => {
    try {
      const repositorio: EntidadFederativaRepository = new EntidadFederativaStorageGateway();
      const cambiarEstadoEntidadFederativaInteractor = new CambiarEstadoEntidadFederativaInteractor(repositorio);

      const respuesta = await cambiarEstadoEntidadFederativaInteractor.execute(payload);

      return respuesta;
    } catch (error) {
      return this.obtenerError(error);
    }
  };
}
