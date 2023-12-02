import { ConexionBD } from "../../../utils/dbconfig";
import { EntidadFederativa } from "../entities/entidad-federativa";
import { EntidadFederativaRepository } from "../use-cases/ports/entidad-federativa.repository";
import { CambiarEstadoEntidadFederativaDTO } from "./dtos/cambiar-estado-entidad-federativa.dto";
import { ModificarEntidadFederativaDTO } from "./dtos/modificar-entidad-federativa.dto";
import { RegistrarEntidadFederativaDTO } from "./dtos/registrar-entidad-federativa.dto";

export class EntidadFederativaStorageGateway implements EntidadFederativaRepository {
  async getEntidadesFederativas(): Promise<EntidadFederativa[]> {
    try {
      const resultado = await ConexionBD<EntidadFederativa[]>("SELECT id_entidad, nombre_entidad, estado FROM entidades_federativas", []);
      return resultado;
    } catch (error) {
      throw error;
    }
  }

  async registrarEntidadFederativa(payload: RegistrarEntidadFederativaDTO): Promise<boolean> {
    try {
      await ConexionBD<boolean>("INSERT INTO entidades_federativas (nombre_entidad, estado) VALUES (?, 1)", [payload.nombre_entidad]);
      return true;
    } catch (error) {
      throw error;
    }
  }

  async modificarEntidadFederativa(payload: ModificarEntidadFederativaDTO): Promise<boolean> {
    try {
      const result = await ConexionBD<any>("UPDATE entidades_federativas SET nombre_entidad = ? WHERE id_entidad = ?", [
        payload.nombre_entidad,
        payload.id_entidad,
      ]);

      if (result.affectedRows === 0) {
        throw new Error("No se pudo modificar la entidad federativa");
      }

      return true;
    } catch (error) {
      throw error;
    }
  }

  async cambiarEstadoEntidadFederativa(payload: CambiarEstadoEntidadFederativaDTO): Promise<boolean> {
    try {
      await ConexionBD<boolean>("UPDATE entidades_federativas SET estado = ? WHERE id_entidad = ?", [payload.estado, payload.id_entidad]);
      return true;
    } catch (error) {
      throw error;
    }
  }

  async buscarEntidadPorNombre(payload: RegistrarEntidadFederativaDTO): Promise<EntidadFederativa[] | null> {
    try {
      const resultado = await ConexionBD<EntidadFederativa[]>("SELECT id_entidad, nombre_entidad FROM entidades_federativas WHERE nombre_entidad LIKE ?", [
        `%${payload.nombre_entidad}%`,
      ]);
      return resultado;
    } catch (error) {
      throw error;
    }
  }
}
