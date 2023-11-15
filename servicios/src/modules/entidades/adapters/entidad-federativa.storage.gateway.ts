import { ConexionBD } from "../../../utils/dbconfig";
import { EntidadFederativa } from "../entities/entidad-federativa";
import { EntidadFederativaRepository } from "../use-cases/ports/entidad-federativa.repository";
import { RegistrarEntidadFederativaDTO } from "./dtos/registrar-entidad-federativa.dto";

export class EntidadFederativaStorageGateway
  implements EntidadFederativaRepository {
  async getEntidadesFederativas(): Promise<EntidadFederativa[]> {
    try {
      const resultado = await ConexionBD<EntidadFederativa[]>("SELECT id_entidad, nombre_entidad FROM entidades_federativas WHERE estado = 1", []);
      return resultado;
    } catch (error) {
      throw error;
    }
  }

  async registrarEntidadFederativa(
    payload: RegistrarEntidadFederativaDTO
  ): Promise<boolean> {
    try {

      await ConexionBD<boolean>("INSERT INTO entidades_federativas (nombre_entidad, estado) VALUES (?, 1)", [payload.nombre_entidad]);
      return true;
    } catch (error) {
      throw error;
    }
  }
}
